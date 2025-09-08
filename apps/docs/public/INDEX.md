# LMS Project Docs Index

Vision: To create a flexible, user-friendly, and scalable Learning Management System that empowers learners, instructors, and administrators by providing a structured yet adaptable environment for managing programming problems structured around courses, assignments, submissions, and feedback. The LMS will support diverse learning needs, streamline administrative processes, and foster meaningful engagement between all roles in the system.

> **Unique submission type**: **Executable Notebook Submission (ENS)** — Students submit a Jupyter/Quarto notebook that the LMS runs in a sandbox with course-provided parameters and tests. The system captures outputs (plots/tables), verifies results, and attaches structured feedback.

---

## Required Pieces

1. **Requirements (User Stories)** — [/apps/docs/public/requirements.md](./requirements.md)
2. **Site Map (Frontend pages)** — [/apps/docs/public/sitemap.md](./sitemap.md)
3. **Wireframes (Major screens)** — [/apps/docs/public/wireframes.md](./wireframes.md)
4. **Basic Data Model Diagram** — [/apps/docs/public/data-model.md](./data-model.md)

---

## Scope Notes

- Supported submission types: **File** and **URL**.
- **Notebook files (`.ipynb`)** are accepted as **File** uploads and are **not executed**; the UI displays a small “Notebook” badge for visibility.
- Advanced features (execution, auto-grading, audit logs, full WCAG conformance) are future work.

## Note

- Portions of this project were developed with the assistance of AI tools to accelerate coding and design.
