# Basic Data Model (Major Nouns)

```mermaid
erDiagram
  USER ||--o{ ENROLLMENT : has
  COURSE ||--o{ ENROLLMENT : includes
  COURSE ||--o{ ASSIGNMENT : contains
  ASSIGNMENT ||--o{ SUBMISSION : receives
  SUBMISSION ||--o{ SCORE : yields

  USER {
    uuid id
    string name
    string email
    enum role "learner|instructor|admin"
  }

  COURSE {
    uuid id
    string code
    string title
    string description
  }

  ENROLLMENT {
    uuid id
    uuid user_id
    uuid course_id
    enum role "learner|ta|instructor"
    string section
  }

  ASSIGNMENT {
    uuid id
    uuid course_id
    string title
    string description
    int points
    datetime due_at
  }

  SUBMISSION {
    uuid id
    uuid assignment_id
    uuid author_user_id
    enum type "file|url"
    string filename
    string content_type
    datetime created_at
    string status "received"
    bool late
  }

  SCORE {
    uuid id
    uuid submission_id
    int points
    string comment
  }
```

## Notes

- **Notebook files (`.ipynb`)** are accepted as **File** uploads and are **not executed** in this prototype.
- The UI surfaces notebooks with a small “Notebook” badge (based on file extension).
- Future (out of scope): executing notebooks, auto-grading, richer feedback artifacts.
