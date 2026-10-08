# BaoliGuard Frontend & Digital Twin Client

**Owner:** Anika Jain (Frontend / PWA / Digital Twin)  
**Primary Directory:** `/frontend` & `/digital_twin`

---

## 1. Overview
The frontend is a Progressive Web Application (PWA) built with **React**, **Vite**, **TypeScript**, and **Tailwind CSS**. It serves as the primary user interface for:
- Image capture and batch upload workflows for heritage structures.
- Displaying computer vision defect overlays (cracks, spalling, vegetation) via relative coordinate annotations.
- Visualizing deterministic engineering condition scores and water functionality indexes.
- Exploring Indian Knowledge Systems (IKS) contextual wisdom and material compatibility matrices.
- Interactive 3D spatial exploration via the Digital Twin viewer (`/digital_twin` with Three.js).

---

## 2. Phase 0 Status
- **Current State:** Scaffold initialized.
- **Implemented:**
  - Base Vite + React + TypeScript configuration.
  - Tailwind CSS foundation.
  - App shell component.
  - API service placeholder (`services/api.ts`).
  - Shared type definitions (`types/index.ts`) matching `/contracts`.
- **Intentionally Unimplemented:** Full UI screens, inspection dashboard, 3D model loaders, and mock data injection.

---

## 3. Directory Structure
```
frontend/
├── README.md
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── index.html
├── public/
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── index.css
    ├── components/    # Reusable UI components
    ├── pages/         # High-level screens
    ├── layouts/       # Application shells
    ├── hooks/         # Custom React hooks
    ├── services/      # Backend API integration
    ├── types/         # TypeScript contracts
    ├── utils/         # Frontend utilities
    └── assets/        # Icons and static media
```

---

## 4. Setup & Running Locally
```bash
cd frontend
npm install
npm run dev
```
The application will launch on `http://localhost:5173`.
