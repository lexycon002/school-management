export const ITEM_PER_PAGE = 10;

type RouteAccessMap = {
  [key: string]: string[];
};

export const routeAccessMap: RouteAccessMap = {
  // Role-specific dashboards
  "/admin(.*)": ["admin"],
  "/student(.*)": ["student"],
  "/teacher(.*)": ["teacher"],
  "/parent(.*)": ["parent"],

  // Students
  "/list/students$": ["admin", "teacher"],             // list view
  "/list/students/[0-9a-zA-Z_-]+$": ["admin", "teacher"], // detail page
  "/list/students/[0-9a-zA-Z_-]+/edit$": ["admin"],    // only admin can edit

  // Teachers
  "/list/teachers$": ["admin", "teacher"],
  "/list/teachers/[0-9a-zA-Z_-]+$": ["admin"],         // only admin can view teacher details
  "/list/teachers/[0-9a-zA-Z_-]+/edit$": ["admin"],    // only admin can edit

  // Parents
  "/list/parents$": ["admin", "teacher"],
  "/list/parents/[0-9a-zA-Z_-]+$": ["admin", "teacher"], // both can view parent details
  "/list/parents/[0-9a-zA-Z_-]+/edit$": ["admin"],     // only admin can edit

  // Classes
  "/list/classes(.*)": ["admin", "teacher"],

  // Subjects
  "/list/subjects(.*)": ["admin"],

  // Exams
  "/list/exams$": ["admin", "teacher", "student", "parent"],
  "/list/exams/[0-9a-zA-Z_-]+$": ["admin", "teacher", "student"], // parents cannot see single exam details
  "/list/exams/[0-9a-zA-Z_-]+/edit$": ["admin", "teacher"],       // only admin & teacher edit

  // Assignments
  "/list/assignments(.*)": ["admin", "teacher", "student", "parent"],


   // Lessons 
  "/list/lessons$": ["admin", "teacher"], // lessons list
  "list/lessons/[0-9a-zA-Z_-]+$": ["admin", "teacher"], // single lesson
  "list/lessons/[0-9a-zA-Z_-]+/edit$": ["admin", "teacher"], // edit lesson

  // Results
  "/list/results$": ["admin", "teacher", "student", "parent"],
  "/list/results/[0-9a-zA-Z_-]+$": ["admin", "teacher", "student"], // parents can only see list, not single detail

  // Attendance
  "/list/attendance(.*)": ["admin", "teacher", "student", "parent"],

  // Events & Announcements
  "/list/events(.*)": ["admin", "teacher", "student", "parent"],
  "/list/announcements(.*)": ["admin", "teacher", "student", "parent"],

  // Messages
  "/list/messages(.*)": ["admin", "teacher", "student", "parent"],
};
