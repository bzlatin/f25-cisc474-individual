# Requirements & User Stories

## Roles

- **Learner (Student)**
- **Instructor (TA/Professor)**
- **Administrator**

## Core Capabilities by Role (User Stories)

### Learners

- _As a learner, I can browse my enrolled courses and see upcoming work so that I know what to do next._
- _As a learner, I can submit work in two formats (File upload — including `.ipynb` — or URL) so I can demonstrate knowledge in different ways._
- _As a learner, I can view grades and brief instructor feedback so I understand how to improve._
- _As a learner, I receive notifications for new assignments, due dates, and returned grades so I don’t miss deadlines._
- _As a learner, I can resubmit until the deadline so I can iterate on my work._

### Instructors

- _As an instructor, I can create courses and assignments so students know what to work on._
- _As an instructor, I can attach starter files or links to resources for programming assignments._
- _As an instructor, I can review submissions and enter grades with short feedback._
- _As an instructor, I can view a simple gradebook and export grades to CSV if needed._

### Administrators

- _As an admin, I can manage users and enrollments to keep the system organized._
- _As an admin, I can configure lightweight settings like course availability and assignment visibility._

## Functional Requirements

### Courses

- Create/read/update/archive courses and rosters.
- Content: syllabus, modules, readings, resources.

### Assignments

- Settings: title, description, points, due date, late policy, allowed submission types (**File**, **URL**).
- Attachments: starter code or resource links.

### Submissions

- Versioned submissions; timestamp, author, **file or URL**.
- **File uploads may include `.ipynb` notebook files**, which are stored as files and **not executed**.
- UI shows a small **“Notebook”** badge when the uploaded file has the `.ipynb` extension.
- Status tracked (received, late).

### Grading & Feedback

- Manual grading with score and optional comment.
- Simple gradebook by assignment and by student.
- Export grades to CSV.

### Notifications

- Basic notifications for new assignments and returned grades.
