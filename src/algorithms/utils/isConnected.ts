import { Matrix } from "@/types/MatrixTypes";

function isConnected(matrix: Matrix, row: number, column: number) {
  if (row < 0 || row >= matrix.length || column < 0 || column >= matrix[0].length) {
    return false;
  }

  const directions = [
    [-2, 0],
    [2, 0],
    [0, -2],
    [0, 2],
  ];

  for (const [dx, dy] of directions) {
    const newRow = row + dx;
    const newColumn = column + dy;

    if (
      newRow >= 0 &&
      newRow < matrix.length &&
      newColumn >= 0 &&
      newColumn < matrix[0].length &&
      matrix[newRow][newColumn].state !== "wall"
    ) {
      return true;
    }
  }

  return false;
}
export default isConnected;
