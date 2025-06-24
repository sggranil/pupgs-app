export const POSITIONS = [
  "Dean",
  "Director",
  "Chief, Academic Assessor",
  "Chief, Training Section",
  "Chief, Marketing and Promotions Section",
  "Academic Program Head",
  "Program Coordinator",
  "Program Chair",
  "Professor",
  "Instructor",
  "Administrative Staff",
] as const;

export type Positions = typeof POSITIONS[number];
