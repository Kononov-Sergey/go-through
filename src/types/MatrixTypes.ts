export type CellState = "default" | "wall" | "start" | "destination" | "visited" | "path";

export interface MatrixCell {
  id: string;
  row: number;
  column: number;
  state: CellState;
  pathLink: { row: number; column: number } | null;
}

export type Matrix = MatrixCell[][];
