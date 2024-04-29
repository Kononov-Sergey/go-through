export type CellState = "default" | "wall" | "start" | "destination" | "visited" | "path";

export interface MatrixCell {
  id: string;
  state: CellState;
  pathLink: { row: number; column: number } | null;
  animationDelay: number;
}

export type Matrix = MatrixCell[][];
