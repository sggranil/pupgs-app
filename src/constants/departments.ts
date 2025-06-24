export const DEPARTMENTS = [
  "Graduate School",
  "Open University System",
  "College of Business Administration",
  "College of Education",
  "College of Political Science and Public Administration",
  "College of Law",
] as const;

export type Department = typeof DEPARTMENTS[number];
