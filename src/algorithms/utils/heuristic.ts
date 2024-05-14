import { MatrixCell } from "@/types/MatrixTypes";

const heuristic = (firstCell: MatrixCell, secondCell: MatrixCell) => {
  const d1 = Math.abs(firstCell.row - secondCell.row);
  const d2 = Math.abs(firstCell.column - secondCell.column);
  return d1 + d2;
};
export default heuristic;
