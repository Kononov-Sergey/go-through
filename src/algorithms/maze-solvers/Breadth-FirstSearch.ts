import { QueueItem } from "@/types/AlgorighmsTypes";
import { Matrix, MatrixCell } from "@/types/MatrixTypes";

export const bfs = (matrix: Matrix, startCell: MatrixCell) => {
  const tempStartCell = { ...startCell };
  const tempMatrix = JSON.parse(JSON.stringify(matrix)) as Matrix;
  const queue: MatrixCell[] = [];
  const historyQueue: QueueItem[] = [];
  let destinationIsFound = false;
  const directions = [
    { row: -1, column: 0 },
    { row: 0, column: 1 },
    { row: 1, column: 0 },
    { row: 0, column: -1 },
  ];

  queue.push(tempStartCell);
  historyQueue.push({
    xCord: tempStartCell.row,
    yCord: tempStartCell.column,
    newCell: tempStartCell,
  });

  while (queue.length > 0 && !destinationIsFound) {
    const currentCell = queue.shift();

    if (!currentCell) {
      break;
    }

    if (currentCell.state === "destination") {
      destinationIsFound = true;
      break;
    }

    for (const direction of directions) {
      const nextRow = currentCell.row + direction.row;
      const nextColumn = currentCell.column + direction.column;

      if (
        nextRow >= 0 &&
        nextRow < tempMatrix.length &&
        nextColumn >= 0 &&
        nextColumn < tempMatrix[nextRow].length &&
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

        tempMatrix[nextRow][nextColumn].state = "visited";
        tempMatrix[nextRow][nextColumn].pathLink = {
          row: currentCell.row,
          column: currentCell.column,
        };

        historyQueue.push({
          xCord: nextRow,
          yCord: nextColumn,
          newCell: tempMatrix[nextRow][nextColumn],
        });

        queue.push(tempMatrix[nextRow][nextColumn]);
      }
    }
  }

  return { historyQueue, matrix: tempMatrix, destinationIsFound };
};
