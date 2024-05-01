import { MatrixCell } from "@/types/MatrixTypes";
import { FC } from "react";
import clsx from "clsx";
import { useMatrixStore } from "@/store/matrix";

export interface MatrixSquareProps {
  xCord: number;
  yCord: number;
  cellInfo: MatrixCell;
  id: string;
}

const MatrixSquare: FC<MatrixSquareProps> = ({
  cellInfo: { state },
  xCord,
  yCord,
  id,
}) => {
  const addAWall = useMatrixStore((store) => store.toggleWall);

  const onCellClickHanadler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (event.buttons === 1 || event.buttons === 3) {
      addAWall(xCord, yCord);
    }
  };

  return (
    <button
      id={id}
      aria-label={`${xCord}:${yCord} ячейка`}
      type="button"
      onMouseEnter={(event) => onCellClickHanadler(event)}
      disabled={state === "destination" || state === "start"}
      className={clsx(
        `flex-1 border border-black transition-colors duration-200 cursor-default`,
        state === "default" ? "bg-white" : "animate-appear",
        state === "start" && "bg-green-500",
        state === "wall" && "bg-black",
        state === "destination" && "bg-blue-500",
        state === "visited" && "bg-orange-300 "
      )}
    />
  );
};

export default MatrixSquare;
