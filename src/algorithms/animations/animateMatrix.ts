import { QueueItem } from "@/types/AlgorighmsTypes";
import { Matrix } from "@/types/MatrixTypes";

const animateNewMatrix = (
  matrix: Matrix,
  setStateCallback: (newCellInfo: QueueItem) => void,
  speed = 50
) => {
  const historyQueue: QueueItem[] = [];

  let diagonal = 0;

  while (historyQueue.length < matrix.length * matrix[0].length) {
    let row = 0;
    let column = diagonal;
    for (let index = 0; index < diagonal + 1; index++) {
      if (matrix[row] && matrix[row][column]) {
        historyQueue.push({
          xCord: row,
          yCord: column,
          newCell: matrix[row][column],
        });
      }
      row++;
      column--;
    }
    diagonal++;
  }

  while (historyQueue.length > 0) {
    let animationIndex = 0;
    const newCellInfo = historyQueue.shift();
    animationIndex++;
    if (newCellInfo) {
      setTimeout(() => {
        setStateCallback(newCellInfo);
      }, animationIndex * speed);
    }
  }
};

export default animateNewMatrix;
