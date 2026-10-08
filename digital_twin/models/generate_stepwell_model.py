"""Procedural GLTF 2.0 generator for BaoliGuard Stepwell 3D Model.

Generates a standalone, self-contained GLTF 2.0 model with embedded base64 buffers
representing an authentic Indian Stepwell (Baoli) with stepped tiers, subterranean basin,
colonnaded arcade, water surface, and defect regions for Phase 4 Digital Twin demo.

Owner: Anika Jain (Frontend / PWA / Digital Twin)
"""

import base64
import json
import math
import struct
from pathlib import Path


def create_stepwell_gltf(output_path: Path) -> None:
    vertices = []
    normals = []
    indices = []
    materials = []
    meshes = []
    nodes = []

    # Buffer byte array
    buffer_bytes = bytearray()

    def add_quad(p1, p2, p3, p4, normal, color_idx):
        start_idx = len(vertices) // 3
        # 4 vertices
        for p in [p1, p2, p3, p4]:
            vertices.extend(p)
            normals.extend(normal)
        # 2 triangles
        indices.extend([
            start_idx, start_idx + 1, start_idx + 2,
            start_idx, start_idx + 2, start_idx + 3
        ])

    def add_box(center, size, color_idx, name="box"):
        cx, cy, cz = center
        sx, sy, sz = size[0] / 2, size[1] / 2, size[2] / 2

        # 6 faces
        # Front (+Z)
        add_quad([cx - sx, cy - sy, cz + sz], [cx + sx, cy - sy, cz + sz], [cx + sx, cy + sy, cz + sz], [cx - sx, cy + sy, cz + sz], [0, 0, 1], color_idx)
        # Back (-Z)
        add_quad([cx + sx, cy - sy, cz - sz], [cx - sx, cy - sy, cz - sz], [cx - sx, cy + sy, cz - sz], [cx + sx, cy + sy, cz - sz], [0, 0, -1], color_idx)
        # Top (+Y)
        add_quad([cx - sx, cy + sy, cz + sz], [cx + sx, cy + sy, cz + sz], [cx + sx, cy + sy, cz - sz], [cx - sx, cy + sy, cz - sz], [0, 1, 0], color_idx)
        # Bottom (-Y)
        add_quad([cx - sx, cy - sy, cz - sz], [cx + sx, cy - sy, cz - sz], [cx + sx, cy - sy, cz + sz], [cx - sx, cy - sy, cz + sz], [0, -1, 0], color_idx)
        # Right (+X)
        add_quad([cx + sx, cy - sy, cz + sz], [cx + sx, cy - sy, cz - sz], [cx + sx, cy + sy, cz - sz], [cx + sx, cy + sy, cz + sz], [1, 0, 0], color_idx)
        # Left (-X)
        add_quad([cx - sx, cy - sy, cz - sz], [cx - sx, cy - sy, cz + sz], [cx - sx, cy + sy, cz + sz], [cx - sx, cy + sy, cz - sz], [-1, 0, 0], color_idx)

    # 1. Build Stepped Terraces (8 concentric descending tiers)
    num_tiers = 8
    base_width = 24.0
    base_depth = 32.0
    tier_height = 0.8
    step_inset = 1.1

    for t in range(num_tiers):
        y_level = 3.0 - (t * tier_height)
        cur_w = base_width - (t * step_inset * 1.8)
        cur_d = base_depth - (t * step_inset * 2.0)

        # Left Terrace Wall
        add_box([-cur_w / 2 - 0.5, y_level, 0], [1.0, tier_height, cur_d], 0, f"tier_l_{t}")
        # Right Terrace Wall
        add_box([cur_w / 2 + 0.5, y_level, 0], [1.0, tier_height, cur_d], 0, f"tier_r_{t}")
        # South Stepped Wall
        add_box([0, y_level, cur_d / 2 + 0.5], [cur_w + 2.0, tier_height, 1.0], 0, f"tier_s_{t}")

        # Inverted triangular steps (left and right stairs)
        num_steps_per_tier = 4
        for s in range(num_steps_per_tier):
            st_y = y_level - (s * (tier_height / num_steps_per_tier))
            st_z = -cur_d / 4 + (s * 1.5)
            add_box([-cur_w / 2 + 1.2, st_y, st_z], [1.2, 0.2, 0.8], 1, "step")
            add_box([cur_w / 2 - 1.2, st_y, st_z], [1.2, 0.2, 0.8], 1, "step")

    # 2. North Pavilion & Column Arcade
    north_wall_z = -base_depth / 2 + 4.0
    # Rear solid sandstone back wall
    add_box([0, 1.5, north_wall_z - 1.5], [base_width + 4.0, 7.0, 1.5], 0, "pavilion_back_wall")

    # 4 Carved Pillars
    for px in [-6.0, -2.0, 2.0, 6.0]:
        add_box([px, 1.5, north_wall_z + 1.0], [0.8, 5.0, 0.8], 0, "pillar")
        # Pillar capital
        add_box([px, 4.2, north_wall_z + 1.0], [1.4, 0.4, 1.4], 1, "capital")

    # Overhead arch beam
    add_box([0, 4.5, north_wall_z + 1.0], [14.0, 0.6, 1.2], 0, "arch_beam")

    # 3. Bottom Basin Floor
    basin_y = -3.8
    add_box([0, basin_y - 0.5, 2.0], [10.0, 0.8, 12.0], 0, "basin_floor")

    # 4. Water Table Plane
    water_y = -3.0
    add_quad(
        [-4.5, water_y, -3.5],
        [4.5, water_y, -3.5],
        [4.5, water_y, 7.5],
        [-4.5, water_y, 7.5],
        [0, 1, 0],
        2 # Water material index
    )

    # 5. Silt Deposit Mound (Bottom Basin)
    add_box([1.0, basin_y + 0.3, 3.0], [4.0, 0.6, 5.0], 3, "silt_mound")

    # 6. Stormwater Intake Inlet Conduit
    add_box([-base_width / 2 + 1.5, 0.5, 6.0], [2.5, 1.8, 1.8], 4, "inlet_conduit")

    # 7. Vegetation Mesh Clustered on Parapet
    add_box([cur_w / 2 + 0.8, 3.5, 2.0], [1.5, 1.2, 3.0], 5, "vegetation_cluster")

    # Pack buffer
    # Vertex position buffer: Float32 (3 * 4 = 12 bytes per vertex)
    # Normal buffer: Float32 (3 * 4 = 12 bytes per vertex)
    # Index buffer: Uint16 (2 bytes per index)
    v_bytes = struct.pack(f'{len(vertices)}f', *vertices)
    n_bytes = struct.pack(f'{len(normals)}f', *normals)
    i_bytes = struct.pack(f'{len(indices)}H', *indices)

    # Alignment padding
    def pad(b):
        while len(b) % 4 != 0:
            b.append(0)
        return b

    pos_offset = 0
    pos_len = len(v_bytes)

    norm_offset = pos_len
    norm_len = len(n_bytes)

    ind_offset = norm_offset + norm_len
    ind_len = len(i_bytes)

    full_buffer = pad(bytearray(v_bytes + n_bytes + i_bytes))

    # Min/max bounds for positions
    xs = vertices[0::3]
    ys = vertices[1::3]
    zs = vertices[2::3]
    min_x, max_x = min(xs), max(xs)
    min_y, max_y = min(ys), max(ys)
    min_z, max_z = min(zs), max(zs)

    b64_buffer = base64.b64encode(full_buffer).decode('ascii')
    uri = f"data:application/octet-stream;base64,{b64_buffer}"

    gltf = {
        "asset": {
            "version": "2.0",
            "generator": "BaoliGuard Digital Twin Procedural Architect"
        },
        "scene": 0,
        "scenes": [
            {
                "name": "BaoliStepwellScene",
                "nodes": [0]
            }
        ],
        "nodes": [
            {
                "name": "BaoliStepwell_Root",
                "mesh": 0
            }
        ],
        "materials": [
            {
                "name": "SandstoneAshlar",
                "pbrMetallicRoughness": {
                    "baseColorFactor": [0.75, 0.56, 0.40, 1.0],
                    "metallicFactor": 0.05,
                    "roughnessFactor": 0.85
                }
            },
            {
                "name": "StepLimestone",
                "pbrMetallicRoughness": {
                    "baseColorFactor": [0.65, 0.48, 0.35, 1.0],
                    "metallicFactor": 0.05,
                    "roughnessFactor": 0.90
                }
            },
            {
                "name": "AquiferWater",
                "pbrMetallicRoughness": {
                    "baseColorFactor": [0.03, 0.55, 0.70, 0.85],
                    "metallicFactor": 0.1,
                    "roughnessFactor": 0.1
                },
                "alphaMode": "BLEND"
            },
            {
                "name": "SiltDeposit",
                "pbrMetallicRoughness": {
                    "baseColorFactor": [0.28, 0.20, 0.15, 1.0],
                    "metallicFactor": 0.0,
                    "roughnessFactor": 0.95
                }
            },
            {
                "name": "IntakeConduit",
                "pbrMetallicRoughness": {
                    "baseColorFactor": [0.45, 0.35, 0.28, 1.0],
                    "metallicFactor": 0.05,
                    "roughnessFactor": 0.85
                }
            },
            {
                "name": "VegetationCluster",
                "pbrMetallicRoughness": {
                    "baseColorFactor": [0.15, 0.55, 0.20, 1.0],
                    "metallicFactor": 0.0,
                    "roughnessFactor": 0.9
                }
            }
        ],
        "meshes": [
            {
                "name": "BaoliStepwell_Geometry",
                "primitives": [
                    {
                        "attributes": {
                            "POSITION": 0,
                            "NORMAL": 1
                        },
                        "indices": 2,
                        "material": 0
                    }
                ]
            }
        ],
        "accessors": [
            {
                "bufferView": 0,
                "byteOffset": 0,
                "componentType": 5126, # FLOAT
                "count": len(vertices) // 3,
                "type": "VEC3",
                "max": [max_x, max_y, max_z],
                "min": [min_x, min_y, min_z]
            },
            {
                "bufferView": 1,
                "byteOffset": 0,
                "componentType": 5126, # FLOAT
                "count": len(normals) // 3,
                "type": "VEC3"
            },
            {
                "bufferView": 2,
                "byteOffset": 0,
                "componentType": 5123, # UNSIGNED_SHORT
                "count": len(indices),
                "type": "SCALAR"
            }
        ],
        "bufferViews": [
            {
                "buffer": 0,
                "byteOffset": pos_offset,
                "byteLength": pos_len,
                "target": 34962 # ARRAY_BUFFER
            },
            {
                "buffer": 0,
                "byteOffset": norm_offset,
                "byteLength": norm_len,
                "target": 34962 # ARRAY_BUFFER
            },
            {
                "buffer": 0,
                "byteOffset": ind_offset,
                "byteLength": ind_len,
                "target": 34963 # ELEMENT_ARRAY_BUFFER
            }
        ],
        "buffers": [
            {
                "byteLength": len(full_buffer),
                "uri": uri
            }
        ]
    }

    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(gltf, f, indent=2)

    print(f"Created GLTF model: {output_path} ({len(vertices)//3} vertices, {len(indices)//3} triangles)")


if __name__ == "__main__":
    model_dir = Path(__file__).resolve().parent
    target_file = model_dir / "baoli_stepwell.gltf"
    create_stepwell_gltf(target_file)
