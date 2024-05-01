/* eslint-disable react/no-array-index-key */

"use client";

import MatrixSquare from "@/components/MatrixSquare";
import { paintTheMaze } from "@/maze-solvers/algorithms";
import { useMatrixStore } from "@/store/matrix";

import { FC, useEffect } from "react";

const MainBody: FC = () => {
  const initializeMatrixShape = useMatrixStore((store) => store.initializeMatrixShape);
  const addStartAndFinish = useMatrixStore((store) => store.addStartAndFinishPoint);
  const setCellState = useMatrixStore((store) => store.setCellState);

  const matrix = useMatrixStore((store) => store.matrix);

  useEffect(() => {
    initializeMatrixShape();
    addStartAndFinish();
  }, [initializeMatrixShape, addStartAndFinish]);

  const paint = () => {
    const queue = paintTheMaze(matrix);

    queue.forEach((newCellInfo, index) => {
      setTimeout(() => {
        setCellState(newCellInfo);
      }, index * 50);
    });
  };

  return (
    <main className="flex-1 flex flex-col w-full p-8 overflow-auto">
      <button type="button" onClick={paint}>
        click
      </button>
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
