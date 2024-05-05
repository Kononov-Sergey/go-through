/* eslint-disable react/no-array-index-key */

"use client";

import MatrixSquare from "@/components/MatrixSquare";
import { bfs, findThePath, paintTheMaze } from "@/maze-solvers/algorithms";
import { useMatrixStore } from "@/store/matrix";
import animateQueues from "@/utils/AnimateQueues";

import { FC, useEffect } from "react";

const MainBody: FC = () => {
  const initializeMatrixShape = useMatrixStore((store) => store.initializeMatrixShape);
  const addStartAndFinish = useMatrixStore((store) => store.addStartAndFinishPoint);
  const setCellState = useMatrixStore((store) => store.setCellInfo);

  const matrix = useMatrixStore((store) => store.matrix);

  useEffect(() => {
    initializeMatrixShape();
    addStartAndFinish();
  }, [initializeMatrixShape, addStartAndFinish]);

  const paint = () => {
    const { historyQueue: bfsQueue, tempMatrix: bfsMatrix } = bfs(matrix, matrix[3][3]);
    const { historyQueue: pathQueue } = findThePath(bfsMatrix);
    animateQueues([bfsQueue, pathQueue], setCellState);
  };

  return (
    <main className="flex-1 flex flex-col w-full overflow-auto">
      {matrix.map((row, rowIndex) => (
        <div className="w-full flex flex-1" key={rowIndex}>
          {row.map((cell, columnIndex) => (
            <MatrixSquare
              key={cell.id}
              id={cell.id}
              cellInfo={cell}
              xCord={rowIndex}
              yCord={columnIndex}
            />
          ))}
        </div>
      ))}
    </main>
  );
};

export default MainBody;
