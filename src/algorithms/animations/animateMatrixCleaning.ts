import { QueueItem } from "@/types/AlgorighmsTypes";
import { Matrix } from "@/types/MatrixTypes";

const animateMatrixCleaning = (
  matrix: Matrix,
  setCellInfo: (newCellInfo: QueueItem) => void
) => {
  const tempMatrix = JSON.parse(JSON.stringify(matrix)) as Matrix;

  for (let row = 0; row < tempMatrix.length; row++) {
    for (let column = 0; column < tempMatrix[row].length; column++) {
      if (
        tempMatrix[row][column].state === "visited" ||
        tempMatrix[row][column].state === "path"
      ) {
        tempMatrix[row][column].state = "default";

        if (tempMatrix[row][column].pathLink) {
          tempMatrix[row][column].pathLink = null;
        }

        setCellInfo({
          xCord: row,
          yCord: column,
          newCell: tempMatrix[row][column],
        });
      }
    }
  }
  return { tempMatrix };
};

export default animateMatrixCleaning;
