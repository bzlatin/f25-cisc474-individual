# Basic Data Model (Major Nouns)

```mermaid
erDiagram
    USER ||--o{ ENROLLMENT : has
    COURSE ||--o{ ENROLLMENT : includes
    COURSE ||--o{ ASSIGNMENT : contains
    ASSIGNMENT ||--o{ SUBMISSION : receives
    SUBMISSION ||--o{ ARTIFACT : "produces (files, logs)"
    ASSIGNMENT ||--o{ RUBRIC_CRITERION : scored_by
    SUBMISSION ||--o{ SCORE : "rubric scores"
    GROUP ||--o{ MEMBERSHIP : has
    GROUP ||--o{ SUBMISSION : "team submission"

    USER {
      uuid id PK
      string name
      string email
      enum role  "learner|instructor|admin"
    }

    COURSE {
      uuid id PK
      string code
      string title
      text description
      bool archived
    }

    ENROLLMENT {
      uuid id PK
      uuid user_id FK
      uuid course_id FK
      enum role "learner|ta|instructor"
      string section
    }

    ASSIGNMENT {
      uuid id PK
      uuid course_id FK
      string title
      text description
      int points
      datetime due_at
      datetime late_until
      json submission_types "['file','url','repo','ens']"
      json autograder_cfg
      bool group_work
    }

    SUBMISSION {
      uuid id PK
      uuid assignment_id FK
      uuid author_user_id FK  "or group_id if team"
      datetime created_at
      enum status "queued|running|completed|failed"
      string type "file|url|repo|ens"
      float score
      bool late
    }

    ARTIFACT {
      uuid id PK
      uuid submission_id FK
      string kind "file|log|plot|html"
      string path
    }

    RUBRIC_CRITERION {
      uuid id PK
      uuid assignment_id FK
      string name
      int max_points
      text description
      float weight
    }

    SCORE {
      uuid id PK
      uuid submission_id FK
      uuid criterion_id FK
      float points
      text comment
    }

    GROUP {
      uuid id PK
      uuid course_id FK
      string name
    }

    MEMBERSHIP {
      uuid id PK
      uuid group_id FK
      uuid user_id FK
      string role "member|leader"
    }
```

## ENS (Executable Notebook Submission) Additions

- `ASSIGNMENT.autograder_cfg`: container image, dependencies, public/hidden tests, time/memory limits, parameters.
- `ARTIFACT.kind`: include `notebook_html`, `stdout`, `stderr`, `plots`.
- Optional `SUBMISSION.runtime_metrics`: exec time, memory peak.
