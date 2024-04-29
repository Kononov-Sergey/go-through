/* eslint-disable react/no-array-index-key */

"use client";

import MatrixSquare from "@/components/MatrixCell";
import { useMatrixStore } from "@/store/matrix";
import { Transition } from "@headlessui/react";
import { FC, useEffect } from "react";

const MainBody: FC = () => {
  const initializeMatrixShape = useMatrixStore((store) => store.initializeMatrixShape);
  const addStartAndFinish = useMatrixStore((store) => store.addStartAndFinishPoint);
  const matrix = useMatrixStore((store) => store.matrix);

  useEffect(() => {
    initializeMatrixShape();
    addStartAndFinish();
  }, [initializeMatrixShape, addStartAndFinish]);

  return (
    <main className="flex-1 flex flex-col w-full p-8 overflow-auto">
      {matrix.map((row, rowIndex) => (
        <div className="w-full flex flex-1" key={rowIndex}>
          {row.map((cell, columnIndex) => (
            <MatrixSquare
              key={cell.id}
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
