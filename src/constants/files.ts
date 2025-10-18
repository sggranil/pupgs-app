export const FILES = [
  "Image",
  "PDF",
] as const;

export type Positions = typeof FILES[number];