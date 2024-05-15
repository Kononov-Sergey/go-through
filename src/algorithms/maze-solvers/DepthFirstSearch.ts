import { QueueItem } from "@/types/AlgorighmsTypes";
import { Matrix, MatrixCell } from "@/types/MatrixTypes";

const directions = [
  { row: -1, column: 0 },
  { row: 0, column: 1 },
  { row: 1, column: 0 },
  { row: 0, column: -1 },
];

export function depthFirstSearch(matrix: Matrix, startCell: MatrixCell) {
  const stack: MatrixCell[] = [];
  const tempMatrix = JSON.parse(JSON.stringify(matrix)) as Matrix;
  const tempStartCell = { ...startCell };
  const historyQueue: QueueItem[] = [];
  let destinationIsFound = false;

  stack.push(tempStartCell);

  while (stack.length > 0 && !destinationIsFound) {
    const currentCell = stack.pop();

    if (!currentCell) {
      break;
    }

    if (currentCell.state === "destination") {
      destinationIsFound = true;
      break;
    }

    const neighbors: MatrixCell[] = [];

    for (const direction of directions) {
      const nextRow = currentCell.row + direction.row;
      const nextColumn = currentCell.column + direction.column;

      if (
        nextRow >= 0 &&
        nextRow < tempMatrix.length &&
        nextColumn >= 0 &&
        nextColumn < tempMatrix[0].length &&
        tempMatrix[nextRow][nextColumn].state !== "wall" &&
        tempMatrix[nextRow][nextColumn].state !== "visited" &&
        tempMatrix[nextRow][nextColumn].state !== "start"
      ) {
        if (tempMatrix[nextRow][nextColumn].state === "destination") {
          destinationIsFound = true;
          tempMatrix[nextRow][nextColumn].pathLink = {
            row: currentCell.row,
            column: currentCell.column,
          };
          break;
        }

        neighbors.push(tempMatrix[nextRow][nextColumn]);
      }
    }

    for (const neighbor of neighbors) {
      if (neighbor.state === "default") {
        neighbor.state = "visited";
        neighbor.pathLink = { row: currentCell.row, column: currentCell.column };
        historyQueue.push({
          xCord: neighbor.row,
          yCord: neighbor.column,
          newCell: neighbor,
        });
        stack.push(neighbor);
      }
    }
  }

  return { historyQueue, matrix: tempMatrix, destinationIsFound };
}

export default depthFirstSearch;
