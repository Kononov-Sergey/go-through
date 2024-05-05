import { Matrix } from "@/types/MatrixTypes";

function isConnected(maze: Matrix, row: number, column: number) {
  if (row < 0 || row >= maze.length || column < 0 || column >= maze[0].length) {
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
      newRow < maze.length &&
      newColumn >= 0 &&
      newColumn < maze[0].length &&
      maze[newRow][newColumn].state !== "wall"
    ) {
      return true;
    }
  }

  return false;
}
export default isConnected;
