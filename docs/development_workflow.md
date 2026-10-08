# BaoliGuard Git & Development Workflow

**Objective:** Zero merge conflicts, modular development, and verifiable quality across all 4 teammates.

---

## 1. Branch Strategy

The primary stable branch is `main`. Direct commits to `main` are prohibited after Phase 0 initialization.

### Designated Feature Branches:
| Teammate | Focus Area | Branch Name |
| :--- | :--- | :--- |
| **Krish** | Computer Vision / AI | `feat/krish-vision` |
| **Kirti Antil** | IKS / Conservation Engineering | `feat/kirti-iks-engineering` |
| **Anika Jain** | Frontend / PWA / Digital Twin | `feat/anika-frontend-twin` |
| **Swastik Parmar** | Backend / System Integration | `feat/swastik-backend-integration` |

---

## 2. Standard 10-Step Development Cycle

Every teammate must follow this workflow for every development task:

1. **Pull Latest Main:**
   ```bash
   git checkout main
   git pull origin main
   ```
2. **Switch / Create Feature Branch:**
   ```bash
   git checkout -b feat/krish-vision
   ```
3. **Work Strictly Within Owned Directories:**
   - Krish: `vision/`, `scripts/vision/`, `vision/tests`
   - Kirti: `knowledge/`, `engineering/`, `tests/engineering`
   - Anika: `frontend/`, `digital_twin/`, `tests/frontend`
   - Swastik: `backend/`, `integration/`, `tests/backend/`, `tests/integration`
4. **Make Small, Focused Commits:**
   Write descriptive commit messages following Conventional Commits (e.g., `feat(vision): implement skeletonization metrics`).
5. **Run Local Verification & Tests:**
   ```bash
   python -m pytest
   ```
6. **Review Git Diff for Cleanliness:**
   ```bash
   git status
   git diff
   ```
   *Verify that no datasets, models, or node_modules are tracked.*
7. **Push Feature Branch:**
   ```bash
   git push -u origin feat/<your-branch-name>
   ```
8. **Open a Pull Request:**
   Fill in the PR template located at [`.github/pull_request_template.md`](file:///.github/pull_request_template.md).
9. **Integration Owner Review:**
   Swastik Parmar (Backend & Integration Lead) conducts peer review and verifies contract conformance.
10. **Merge Only After Checks Pass:**
    PR is merged into `main` using squash or rebase merge.
