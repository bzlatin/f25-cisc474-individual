
# Requirements & User Stories

## Vision
Create a flexible, user‑friendly, and scalable LMS that supports courses, assignments, submissions, feedback, and a **unique Executable Notebook Submission (ENS)** flow.

## Roles
- **Learner (Student)**
- **Instructor (TA/Professor)**
- **Administrator**

## Core Capabilities by Role (User Stories)

### Learners
- *As a learner, I can browse my enrolled courses and see upcoming work so that I know what to do next.*
- *As a learner, I can submit work in multiple formats (files, links, code, **Executable Notebook Submission**) so I can demonstrate knowledge in different ways.*
- *As a learner, I can view rubric‑based grades and inline feedback so I understand how to improve.*
- *As a learner, I receive notifications for new assignments, due dates, and returned grades so I don’t miss deadlines.*
- *As a learner, I can resubmit until the deadline (or with late penalties if allowed) so I can iterate.*
- *As a learner, I can see auto‑grader results (test cases passed/failed) for applicable assignments so I can debug quickly.*
- *As a learner, I can collaborate on team assignments with clearly defined group membership and roles.*
- *As a learner, I can access accessibility features (keyboard navigation, captions for videos, color‑contrast compliant UI).*

### Instructors
- *As an instructor, I can create courses, sections, and rosters (via CSV upload or SIS sync) so students can enroll.*
- *As an instructor, I can create assignments with settings (points, due/late window, allowed submission types, rubric, auto‑grader config) so expectations are clear.*
- *As an instructor, I can attach starter code, datasets, or notebook templates for programming assignments.*
- *As an instructor, I can run auto‑grading jobs and view results analytics (pass rates, common errors).* 
- *As an instructor, I can grade via a web grader with inline comments, annotations, and rubric sliders, optionally in blind mode.*
- *As an instructor, I can return grades with individualized or batch feedback and allow regrade requests.*
- *As an instructor, I can view class progress dashboards and export grades to CSV/LMS (Canvas/Blackboard) integrations.*
- *As an instructor, I can create ENS templates that specify parameters, hidden tests, and time/memory limits.*

### Administrators
- *As an admin, I can manage users, roles, and permissions to keep data secure.*
- *As an admin, I can configure org‑wide policies (SSO, FERPA/GDPR data retention, backup, plagiarism threshold).* 
- *As an admin, I can monitor system health, job queues, and storage usage.*
- *As an admin, I can configure third‑party integrations (GitHub, GitLab, JupyterHub, container registry).*

## Functional Requirements

### Courses
- Create/read/update/archive courses; sections; rosters (manual, CSV, or SIS integration).
- Content: syllabus, modules, readings, resources.

### Assignments
- Settings: title, description, points, rubric, visibility, due date, late policy, **allowed submission types** (file upload, URL, text, Git repo, **ENS**), group/individual, auto‑grader enabled.
- Attachments: starter code, datasets, templates.

### Submissions
- Versioned submissions; timestamp, author(s), files/links; ENS runs captured.
- Auto‑grader pipeline: build → run tests → score → artifacts (logs, plots).
- Plagiarism detection (configurable threshold, similarity reports).

### Grading & Feedback
- Rubric‑based grading; inline annotations; batch actions.
- Regrade request workflow with discussion thread.
- Gradebook: per‑assignment, per‑student, export CSV.

### Notifications
- Web + email notifications for new items, due soon, returned grades, regrade outcomes.

### Analytics
- Course dashboards: submission on‑time rate, average score, test pass rates, common failures.

### Access & Security
- RBAC: learner/instructor/admin; per‑course TA permissions.
- SSO (OAuth2/OIDC), optional 2FA, audit logs, GDPR/FERPA compliance.

## Non‑Functional Requirements
- **Scalability:** containerized workers for auto‑grading; queue‑based jobs; horizontal scaling.
- **Performance:** p95 < 300ms for typical page loads; auto‑grader job SLA configurable.
- **Reliability:** retries for jobs; idempotent grading; nightly backups.
- **Usability & Accessibility:** WCAG 2.1 AA, keyboard navigation, captions.
- **Observability:** structured logs, metrics, traces; admin dashboard.
- **Extensibility:** plugin architecture for new submission types and graders.

## Unique Submission Type — Executable Notebook Submission (ENS)
- Accepts `.ipynb` or `.qmd` notebooks.
- Runs in sandbox (container) with limits; injects parameters; runs hidden/public tests.
- Captures outputs (figures/tables), notebook HTML, and execution logs.
- Produces structured feedback: test results, diff against expected outputs, performance metrics.
- Supports partial credit via rubric + test weights.
- Instructor supplies environment (requirements.txt/conda) and seed template.
