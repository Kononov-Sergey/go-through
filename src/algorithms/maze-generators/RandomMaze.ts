import { QueueItem } from "@/types/AlgorighmsTypes";
import { Matrix } from "@/types/MatrixTypes";
import LFSRNumberGenerator from "../utils/LFSRNumberGenerator";

const randowMaze = (matrix: Matrix) => {
  const historyQueue: QueueItem[] = [];

  const tempMatrix = JSON.parse(JSON.stringify(matrix)) as Matrix;

  let buffer = [1, 0, 1, 1, 0, 1, 0, 1, 1, 0];
  let links = [9, 4, 0];

  const randomArray = LFSRNumberGenerator(
    buffer,
    links,
    tempMatrix.length * tempMatrix[0].length
  );

  const maxRandomValue = Math.max(...randomArray);
  const minRandomValue = Math.min(...randomArray);

  const decidingMedian = (maxRandomValue + minRandomValue) / 3;

  for (let row = 0; row < tempMatrix.length; row++) {
    for (let column = 0; column < tempMatrix[0].length; column++) {
      if (
        randomArray[row * tempMatrix[0].length + column] < decidingMedian &&
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
