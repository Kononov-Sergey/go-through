import { MatrixCell } from "@/types/Matrix";
import { FC, useState } from "react";
import clsx from "clsx";
import { useMatrixStore } from "@/store/matrix";

export interface MatrixSquareProps {
  xCord: number;
  yCord: number;
  cellInfo: MatrixCell;
}

const MatrixSquare: FC<MatrixSquareProps> = ({ cellInfo: { state }, xCord, yCord }) => {
  const addAWall = useMatrixStore((store) => store.toggleWall);

  const [effect, setEffect] = useState(false);

  const onCellClickHanadler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (effect) {
      return;
    }
    if (event.buttons === 1 || event.buttons === 3) {
      setEffect(true);
      addAWall(xCord, yCord);
    }
  };

  return (
    <button
      aria-label={`${xCord}:${yCord} ячейка`}
      type="button"
      onMouseEnter={(event) => onCellClickHanadler(event)}
      disabled={state === "destination" || state === "start"}
      className={clsx(
        "flex-1 border border-black",
        effect && "animate-appear",
        state === "default" && "bg-white",
        state === "start" && "bg-green-500",
        state === "wall" && "bg-black",
        state === "destination" && "bg-blue-500"
      )}
      onAnimationEnd={() => setEffect(false)}
    />
  );
};

export default MatrixSquare;
