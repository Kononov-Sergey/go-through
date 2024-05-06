import { QueueItem } from "@/types/AlgorighmsTypes";
import { Matrix } from "@/types/MatrixTypes";

export const displayThePath = (matrix: Matrix) => {
  const tempMatrix: Matrix = JSON.parse(JSON.stringify(matrix));
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
