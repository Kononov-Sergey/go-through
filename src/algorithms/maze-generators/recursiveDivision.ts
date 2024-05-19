import { QueueItem } from "@/types/AlgorighmsTypes";
import { Matrix } from "@/types/MatrixTypes";
import random from "../utils/random";

const recursiveDivision = (
  matrix: Matrix,
  rowStart: number,
  rowEnd: number,
  colStart: number,
  colEnd: number,
  orientation: "horizontal" | "vertical",
  callBack: (newCellInfo: QueueItem) => void
) => {
  let tempMatrix = JSON.parse(JSON.stringify(matrix)) as Matrix;

  if (
    rowEnd < rowStart ||
    colEnd < colStart ||
    colEnd - colStart < 2 ||
    rowEnd - rowStart < 2
  ) {
    return tempMatrix;
  }

  if (orientation === "horizontal") {
    const randomRowWallIndex = random(rowStart + 1, rowEnd - 1);
    const randomColGapIndex = [colStart, colEnd][random(0, 1)];

    for (let column = colStart; column <= colEnd; column++) {
      if (
        column !== randomColGapIndex &&
        tempMatrix[randomRowWallIndex][column].state !== "start" &&
        tempMatrix[randomRowWallIndex][column].state !== "destination"
      ) {
        tempMatrix[randomRowWallIndex][column].state = "wall";
        callBack({
          xCord: randomRowWallIndex,
          yCord: column,
          newCell: tempMatrix[randomRowWallIndex][column],
        });
      }
    }

    const isUpperNewBlockVertical =
      colEnd - colStart + 1 > randomRowWallIndex - 1 - rowStart + 1;

    tempMatrix = recursiveDivision(
      tempMatrix,
      rowStart,
      randomRowWallIndex - 1,
      colStart,
      colEnd,
      isUpperNewBlockVertical ? "vertical" : "horizontal",
      callBack
    );

    const isLowerNewBlockVertical =
      colEnd - colStart + 1 > rowEnd - randomRowWallIndex + 1;

    tempMatrix = recursiveDivision(
      tempMatrix,
      randomRowWallIndex + 1,
      rowEnd,
      colStart,
      colEnd,
      isLowerNewBlockVertical ? "vertical" : "horizontal",
      callBack
    );
  }

  if (orientation === "vertical") {
    const randomRowGapIndex = [rowStart, rowEnd][random(0, 1)];
    const randomColWallIndex = random(colStart + 1, colEnd - 1);

    for (let row = rowStart; row <= rowEnd; row++) {
      if (
        row !== randomRowGapIndex &&
        tempMatrix[row][randomColWallIndex].state !== "start" &&
        tempMatrix[row][randomColWallIndex].state !== "destination"
      ) {
        tempMatrix[row][randomColWallIndex].state = "wall";
        callBack({
          xCord: row,
          yCord: randomColWallIndex,
          newCell: tempMatrix[row][randomColWallIndex],
        });
      }
    }

    const isLeftNewBlockHorizontal =
      rowEnd - rowStart + 1 > randomColWallIndex - 1 - colStart + 1;

    tempMatrix = recursiveDivision(
      tempMatrix,
      rowStart,
      rowEnd,
      colStart,
      randomColWallIndex - 1,
      isLeftNewBlockHorizontal ? "horizontal" : "vertical",
      callBack
    );

    const isRightNewBlockHorizontal =
      rowEnd - rowStart + 1 > colEnd - randomColWallIndex + 1;

    tempMatrix = recursiveDivision(
      tempMatrix,
      rowStart,
      rowEnd,
      randomColWallIndex + 1,
      colEnd,
      isRightNewBlockHorizontal ? "horizontal" : "vertical",
      callBack
    );
  }

  return tempMatrix;
};

export default recursiveDivision;
