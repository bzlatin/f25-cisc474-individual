# Wireframes (Major Screens)

> Low-fidelity wireframes using Mermaid. Boxes represent major UI regions/components.

---

## 1) Dashboard

```mermaid
flowchart LR
  subgraph DASHBOARD
    A[Top Nav: logo, Courses,
    Notifications, Profile]
    B[Left Rail: My Courses list]
    C[Main Panel:<br/>What's due soon<br/>Recent feedback<br/>Alerts]
  end
  A --> C
  B --> C
```

---

## 2) Course Home

```mermaid
flowchart LR
  subgraph COURSE_HOME
    A[Top Nav]
    B[Tabs: Overview, Modules,
    Assignments,
    Grades, People]
    C[Hero: Syllabus card,
    announcements]
    D[Resources list]
  end
  A --> B
  B --> C
  B --> D
```

---

## 3) Assignment Detail

```mermaid
flowchart LR
  subgraph ASSIGNMENT_DETAIL
    A[Header: Title, points,
    due/late info]
    B[Tabs: Description, Rubric,
    Submissions, Discussion]
    C[Actions: Download starter code,
    View rubric]
    D[Submit Call-to-Action]
  end
  A --> B
  B --> C
  C --> D
```

---

## 4) Submission Modal (with ENS)

```mermaid
flowchart TB
  subgraph SUBMISSION_MODAL
    A[Choose Type: File, URL, Repo, ENS]
    B[If ENS: upload .ipynb/.qmd
     or select template]
    C[Params: dataset, seed,
     runtime limits]
    D[Queue job and
    show live logs]
    E[Results: tests passed,
    artifacts, score, feedback]
  end
  A --> B
  B --> C
  C --> D
  D --> E
```

---

## 5) Web Grader (Instructor)

```mermaid
flowchart LR
  subgraph WEB_GRADER
    A[Submission list / queue]
    B[Viewer: code/notebook
    with inline comments]
    C[Rubric panel: criteria sliders,
    comments]
    D[Auto-grader results: tests,
    logs, artifacts]
    E[Publish grade]
  end
  A --> B
  B --> C
  B --> D
  C --> E
  D --> E
```

---

## 6) Gradebook

```mermaid
flowchart TB
  subgraph GRADEBOOK
    A[Filters: section, assignment, status]
    B[Grid: students × assignments]
    C[Cell: score, late flag, comment icon]
    D[Export CSV]
  end
  A --> B
  B --> C
  B --> D
```
