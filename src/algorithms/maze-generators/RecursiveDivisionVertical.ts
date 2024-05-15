import { QueueItem } from "@/types/AlgorighmsTypes";
import { Matrix } from "@/types/MatrixTypes";
import generateDoors from "../utils/generateDoors";

const recursiveDivision = (matrix: Matrix, rows: number, columns: number) => {
  const historyQueue: QueueItem[] = [];
  const horizontalSplit = Math.floor(rows / 2);
  const verticalSplit = Math.floor(columns / 2);

  for (let row = 0; row < rows; row++) {
    if (
      matrix[row][verticalSplit].state !== "start" &&
      matrix[row][verticalSplit].state !== "destination"
    ) {
      matrix[row][verticalSplit].state = "wall";
      historyQueue.push({
        xCord: row,
        yCord: verticalSplit,
        newCell: matrix[row][verticalSplit],
      });
    }
  }
  for (let column = 0; column < columns; column++) {
    if (
      matrix[horizontalSplit][column].state !== "start" &&
      matrix[horizontalSplit][column].state !== "destination"
    ) {
      matrix[horizontalSplit][column].state = "wall";
      historyQueue.push({
        xCord: horizontalSplit,
        yCord: column,
        newCell: matrix[horizontalSplit][column],
      });
    }
  }

  const doors = generateDoors(horizontalSplit, verticalSplit);

  doors.forEach(([row, column]) => {
    if (
      matrix[row][column].state !== "start" &&
      matrix[row][column].state !== "destination"
    ) {
      console.log(row, column);

      matrix[row][column].state = "default";
      historyQueue.push({
        xCord: row,
        yCord: column,
        newCell: matrix[row][column],
      });
    }
  });

  return { matrix, historyQueue };
};

export default recursiveDivision;
