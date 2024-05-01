import { QueueItem } from "@/types/AlgorighmsTypes";
import { Matrix, MatrixCell } from "@/types/MatrixTypes";

export const paintTheMaze = (matrix: Matrix) => {
  const queue: QueueItem[] = [];

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      queue.push({ xCord: i, yCord: j, newCell: { ...matrix[i][j], state: "visited" } });
    }
  }

  return queue;
};

export const bfs = (matrix: Matrix, startCell: MatrixCell) => {
  const tempStartCell = { ...startCell };
  const tempMatrix = JSON.parse(JSON.stringify(matrix)) as Matrix;
  const queue: MatrixCell[] = [];
  const historyQueue: QueueItem[] = [];
  let findADestination = false;
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

  while (queue.length > 0 && !findADestination) {
    const currentCell = queue.shift()!;

    if (currentCell.state === "destination") {
      findADestination = true;
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
          findADestination = true;
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

  return { historyQueue, tempMatrix };
};

export const findThePath = (matrix: Matrix) => {
  const tempMatrix = JSON.parse(JSON.stringify(matrix)) as Matrix;
  const historyQueue: QueueItem[] = [];

  let currentCell = {
    ...tempMatrix.flat().find((cell) => cell.state === "destination")!,
  };

  while (currentCell && currentCell.state !== "start") {
    currentCell.state = "path";

    if (currentCell.pathLink) {
      currentCell = tempMatrix[currentCell.pathLink.row][currentCell.pathLink.column];
    }

    historyQueue.push({
      xCord: currentCell.row,
      yCord: currentCell.column,
      newCell: currentCell,
    });
  }

  return { historyQueue, matrix };
};
