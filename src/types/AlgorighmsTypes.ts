import { CellState } from "./MatrixTypes";

export interface QueueItem {
  xCord: number;
  yCord: number;
  newState: CellState;
}
