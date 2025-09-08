# Site Map (Frontend Pages)

```mermaid
flowchart TD
  Landing[Landing / Sign In] --> Dashboard[Dashboard];

  Dashboard --> Courses[Courses];
  Dashboard --> Assignments[Assignments];
  Dashboard --> Gradebook[Gradebook];
  Dashboard --> About[About];

  Courses --> CourseHome[Course Home];
  CourseHome --> CourseAssignments[Assignments by course];
  CourseHome --> CourseGrades[Grades];
  CourseHome --> Resources[Modules / Resources];

  Assignments --> AssignmentDetail[Assignment Detail];
  AssignmentDetail --> SubmitWork[Submit Work - File or URL];
  AssignmentDetail --> SubmissionHistory[Submission History];

  CourseHome --> CourseSettings[Course Settings]:::instructor;

  classDef instructor fill:#dfd,stroke:#9aca9a,color:#0b4210;
```
