import { Matrix, MatrixCell } from "@/types/MatrixTypes";
import heuristic from "../utils/heuristic";
import { QueueItem } from "@/types/AlgorighmsTypes";

const AStar = (matrix: Matrix, startCell: MatrixCell, endCell: MatrixCell) => {
  const historyQueue: QueueItem[] = [];

  const tempMatrix = JSON.parse(JSON.stringify(matrix)) as Matrix;

  let openSet: MatrixCell[] = [startCell];
  let closedSet: MatrixCell[] = [];

  while (openSet.length > 0) {
    let currentCell = openSet[0];
    for (let i = 1; i < openSet.length; i++) {
      if (
        heuristic(openSet[i], endCell) < heuristic(currentCell, endCell) ||
        (heuristic(openSet[i], endCell) === heuristic(currentCell, endCell) &&
          +openSet[i].id > +currentCell.id)
      ) {
        currentCell = openSet[i];
      }
    }

    if (currentCell.id === endCell.id) {
      return { historyQueue, tempMatrix };
    }

    openSet = openSet.filter((cell) => cell.id !== currentCell.id);
    closedSet.push(currentCell);

    if (currentCell.state !== "start" && currentCell.state !== "destination") {
      currentCell.state = "visited";

      historyQueue.push({
        xCord: currentCell.row,
        yCord: currentCell.column,
        newCell: currentCell,
      });
    }

    const neighbors: MatrixCell[] = [];
    if (currentCell.row > 0)
      neighbors.push(tempMatrix[currentCell.row - 1][currentCell.column]);
    if (currentCell.row < matrix.length - 1)
      neighbors.push(tempMatrix[currentCell.row + 1][currentCell.column]);
    if (currentCell.column > 0)
      neighbors.push(tempMatrix[currentCell.row][currentCell.column - 1]);
    if (currentCell.column < tempMatrix[0].length - 1)
      neighbors.push(tempMatrix[currentCell.row][currentCell.column + 1]);

    for (let i = 0; i < neighbors.length; i++) {
      if (neighbors[i].state === "wall" || closedSet.includes(neighbors[i])) {
        continue;
      }

      const tentativeGScore =
        heuristic(currentCell, neighbors[i]) +
        (currentCell.pathLink
          ? heuristic(
              tempMatrix[currentCell.pathLink.row][currentCell.pathLink.column],
              currentCell
            )
          : 0);
      if (!openSet.includes(neighbors[i])) {
        neighbors[i].pathLink = { row: currentCell.row, column: currentCell.column };
        openSet.push(neighbors[i]);
      } else if (tentativeGScore >= heuristic(neighbors[i], endCell)) continue;
      else {
        neighbors[i].pathLink = { row: currentCell.row, column: currentCell.column };
      }
    }
  }

  return { historyQueue, tempMatrix };
};

export default AStar;
