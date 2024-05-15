import { Matrix, MatrixCell } from "@/types/MatrixTypes";
import isConnected from "../utils/isConnected";
import { QueueItem } from "@/types/AlgorighmsTypes";
import random from "../utils/random";

export const MinimumSpanningTree = (matrix: Matrix) => {
  const historyQueue: QueueItem[] = [];

  const frontierCellsList: [number, number, number, number][] = [];

  const directions = [
    [-2, 0],
    [2, 0],
    [0, -2],
    [0, 2],
  ];

  let tempMatrix = JSON.parse(JSON.stringify(matrix)) as Matrix;

  tempMatrix = tempMatrix.map((row) =>
    row.map((cell) => {
      if (cell.state !== "destination" && cell.state !== "start") {
        historyQueue.push({
          xCord: cell.row,
          yCord: cell.column,
          newCell: { ...cell, state: "wall" },
        });
        return { ...cell, state: "wall" };
      }
      if (cell.state === "start") {
        frontierCellsList.push([cell.row, cell.column, cell.row, cell.column]);
      }
      return cell;
    })
  );

  while (frontierCellsList.length > 0) {
    const [startRow, startColumn] = frontierCellsList.splice(
      random(0, frontierCellsList.length - 1),
      1
    )[0];

    for (const [dx, dy] of directions) {
      const newRow = startRow + dx;
      const newColumn = startColumn + dy;

      if (
        newRow >= 0 &&
        newRow < tempMatrix.length &&
        newColumn >= 0 &&
        newColumn < tempMatrix[0].length &&
        (tempMatrix[newRow][newColumn].state === "wall" ||
          tempMatrix[newRow][newColumn].state === "destination")
      ) {
        const newCell = tempMatrix[newRow][newColumn];
        const midPointRow = (newRow + startRow) / 2;
        const midPointColumn = (newColumn + startColumn) / 2;
        const midPointCell = tempMatrix[midPointRow][midPointColumn];

        frontierCellsList.push([newRow, newColumn, startRow, startColumn]);
        if (newCell.state !== "destination") {
          tempMatrix[newRow][newColumn].state = "default";
          historyQueue.push({ xCord: newRow, yCord: newColumn, newCell });
        }

        if (
          tempMatrix[startRow][startColumn].state !== "start" &&
          tempMatrix[startRow][startColumn].state !== "destination"
        ) {
          tempMatrix[startRow][startColumn].state = "default";
          historyQueue.push({
            xCord: startRow,
            yCord: startColumn,
            newCell: tempMatrix[startRow][startColumn],
          });
        }

        if (midPointCell.state !== "destination") {
          midPointCell.state = "default";
          historyQueue.push({
            xCord: midPointRow,
            yCord: midPointColumn,
            newCell: midPointCell,
          });
        }
      }
    }
  }

  return { tempMatrix, historyQueue };
};
