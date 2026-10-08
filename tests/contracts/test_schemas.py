"""Contract validation tests ensuring all JSON schemas are well-formed and valid."""

import json
from pathlib import Path
from jsonschema import Draft202012Validator


def test_contracts_schema_validity() -> None:
    """Validate all schemas in /contracts directory."""
    contracts_dir = Path(__file__).resolve().parent.parent.parent / "contracts"
    schema_files = list(contracts_dir.glob("*.schema.json"))

    assert len(schema_files) >= 5, f"Expected at least 5 schema files, found {len(schema_files)}"

    for schema_file in schema_files:
        with open(schema_file, "r", encoding="utf-8") as f:
            schema_data = json.load(f)

        # Validate that the schema itself is a valid JSON schema definition
        Draft202012Validator.check_schema(schema_data)
        assert "$id" in schema_data, f"Schema {schema_file.name} missing $id property"
        assert "title" in schema_data, f"Schema {schema_file.name} missing title property"


def test_knowledge_sources_schema_validity() -> None:
    """Validate the research traceability schema."""
    sources_schema = (
        Path(__file__).resolve().parent.parent.parent
        / "knowledge"
        / "sources"
        / "sources.schema.json"
    )
    assert sources_schema.exists(), "knowledge/sources/sources.schema.json must exist"

    with open(sources_schema, "r", encoding="utf-8") as f:
        schema_data = json.load(f)

    Draft202012Validator.check_schema(schema_data)
