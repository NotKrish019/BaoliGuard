# BaoliGuard Indian Knowledge Systems (IKS) & Material Knowledge

**Owner:** Kirti Antil (IKS / Material Compatibility / Conservation Engineering)  
**Primary Ownership:**
- `/knowledge`
- `/engineering`
- `/tests/engineering`

---

## 1. Overview
The Knowledge subsystem establishes the **UNDERSTAND** domain of BaoliGuard:
- Capturing indigenous Indian water wisdom across regional typologies (Baolis, Kunds, Bawaris, Stepwells/Vavs).
- Cataloging historical construction traditions, traditional hydraulic lime mortar recipes, and organic additives (surkhi, jaggery, urad pulse, bael fruit extract).
- Documenting scientific sources and archaeological conservation principles (ASI, INTACH, UNESCO guidelines).
- Providing verified reference material so that conservation recommendations are traceable to credible scholarship.

---

## 2. Directory Layout
```
knowledge/
├── README.md
├── iks/           # Indigenous hydrological principles & traditional management
├── materials/     # Historical material specifications & lime DNA
├── restoration/   # Authentic conservation techniques & curing practices
├── sources/       # Research traceability catalog (sources_index.json)
└── structures/    # Typological knowledge bases (Baoli, Kund, Vav, Tank)
```

---

## 3. Research Traceability Standard
Every piece of knowledge in this subsystem must trace back to a verifiable entry in `knowledge/sources/sources_index.json`:
- `source_id`: Unique identifier
- `title`: Publication or paper title
- `publisher`: Institutional authority (e.g., ASI, INTACH, CPWD Heritage, peer-reviewed journals)
- `year`: Publication year
- `url`: Direct canonical URL or DOI
- `topic`: Domain area
- `claim_supported`: Specific empirical or historical claim substantiated

---

## 4. Phase 0 Rule
No arbitrary external datasets or raw web dumps should be stored here. Structured JSON definitions are populated during Phase 1.
