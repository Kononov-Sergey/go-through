import { MatrixCell } from "@/types/Matrix";
import { FC } from "react";
import clsx from "clsx";
import { useMatrixStore } from "@/store/matrix";

export interface MatrixSquareProps {
  xCord: number;
  yCord: number;
  cellInfo: MatrixCell;
}

const MatrixSquare: FC<MatrixSquareProps> = ({ cellInfo: { state }, xCord, yCord }) => {
  const addAWall = useMatrixStore((store) => store.toggleWall);

  return (
    <button
      aria-label={`${xCord}:${yCord} ячейка`}
      type="button"
      onClick={() => addAWall(xCord, yCord)}
      className={clsx(
        "flex-1 border border-black",
        state === "start" && "bg-green-500",
        state === "wall" && "bg-black",
        state === "destination" && "bg-blue-500"
      )}
    />
  );
};

export default MatrixSquare;
