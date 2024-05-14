/* eslint-disable react/no-array-index-key */

"use client";

import MatrixSquare from "@/components/MatrixSquare";
import { useMatrixStore } from "@/store/matrix";

import { FC, useEffect } from "react";
import MainSettingsPanel from "./MainSettingsPanel";

const MainBody: FC = () => {
  const initializeMatrixShape = useMatrixStore((store) => store.initializeMatrixShape);
  const addStartAndFinish = useMatrixStore((store) => store.addStartAndFinishPoint);

  const matrix = useMatrixStore((store) => store.matrix);

  useEffect(() => {
    initializeMatrixShape();
    addStartAndFinish();
  }, [initializeMatrixShape, addStartAndFinish]);

  return (
    <main className="flex-1 flex flex-col gap-4">
      <MainSettingsPanel />
      <div className="flex-1 flex flex-col">
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
      </div>
    </main>
  );
};

export default MainBody;
