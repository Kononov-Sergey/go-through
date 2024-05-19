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
      title={`${xCord}:${yCord} ячейка`}
      className={clsx(
        `flex-1 border border-black transition-colors duration-200 cursor-default`,
        state === "default" ? "bg-white" : "animate-appear",
        state === "start" && "bg-green-400",
        state === "wall" && "bg-gray-500",
        state === "destination" && "bg-blue-400",
        state === "visited" && "bg-orange-300 ",
        state === "path" && "bg-indigo-500"
      )}
    >
      {/* {xCord + ":" + yCord} */}
    </button>
  );
};

export default MatrixSquare;
