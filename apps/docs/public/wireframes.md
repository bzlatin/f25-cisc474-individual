# Wireframes (Major Screens)

> Low-fidelity wireframes using Mermaid. Boxes represent major UI regions/components.

---

## 1) Dashboard

```mermaid
flowchart LR
  subgraph DASHBOARD
    A[Top Bar: logo, nav, profile]
    B[Left Grid: My Courses]
    C[Right Panel: To-Do,
    Announcements, Feedback]
  end
  A --> B
  A --> C
```

---

## 2) Course Home

```mermaid
flowchart LR
  subgraph COURSE_HOME
    A[Tabs: Overview, Modules,
    Assignments, Grades,
    People]
    B[Hero: Syllabus card,
    announcements]
    C[Resources list]
  end
  A --> B
  A --> C
```

---

## 3) Assignment Detail

```mermaid
flowchart LR
  subgraph ASSIGNMENT_DETAIL
    A[Header: Title, points,
    due/late info]
    B[Tabs: Description, Submissions,
    Discussion]
    C[Actions: Download starter code,
    View rubric]
    D[Primary CTA: Submit Work]
  end
  A --> B
  B --> C
  C --> D
```

---

## 4) Submission (Simple)

```mermaid
flowchart TB
  subgraph SUBMISSION
    A[Choose Type File or URL]
    B[If File: upload dialog]
    C[If URL: paste link]
    D[Submit -> Confirmation:
    Received]
  end
  A --> B
  A --> C
  B --> D
  C --> D
```

---

## 5) Gradebook (Instructor)

```mermaid
flowchart TB
  subgraph GRADEBOOK
    A[Filters: section, assignment]
    B[Grid: students x assignments]
    C[Cell: score + comment icon]
    D[Export CSV which
    is optional]
  end
  A --> B
  B --> C
  B --> D

```
