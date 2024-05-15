import { QueueItem } from "@/types/AlgorighmsTypes";
import { Matrix } from "@/types/MatrixTypes";

const randowMaze = (matrix: Matrix) => {
  const historyQueue: QueueItem[] = [];

  const tempMatrix = JSON.parse(JSON.stringify(matrix)) as Matrix;

  for (let row = 0; row < tempMatrix.length; row++) {
    for (let column = 0; column < tempMatrix[0].length; column++) {
      if (
        Math.random() < 0.25 &&
        tempMatrix[row][column].state !== "start" &&
        tempMatrix[row][column].state !== "destination" &&
        tempMatrix[row][column].state !== "wall"
      ) {
        tempMatrix[row][column].state = "wall";
        historyQueue.push({
          xCord: row,
          yCord: column,
          newCell: tempMatrix[row][column],
        });
      }
    }
  }

  return { matrix: tempMatrix, historyQueue };
};

export default randowMaze;
