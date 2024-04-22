export type CellState = "default" | "wall" | "start" | "destination" | "visited" | "path";

export type MatrixCell = {
  id: string;
  state: CellState;
  pathLink: { row: number; column: number } | null;
};

export type Matrix = MatrixCell[][];
