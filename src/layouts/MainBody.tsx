/* eslint-disable react/no-array-index-key */

"use client";

import MatrixCell from "@/components/MatrixCell";
import { useMatrixStore } from "@/store/matrix";
import { FC, useEffect } from "react";

const MainBody: FC = () => {
  const initializeMatrixShape = useMatrixStore((state) => state.initializeMatrixShape);
  const matrix = useMatrixStore((store) => store.matrix);

  useEffect(() => {
    initializeMatrixShape();
  }, [initializeMatrixShape]);

  return (
    <main className="flex-1 flex flex-col w-full p-8">
      {matrix.map((row, rowIndex) => (
        <div className="w-full flex flex-1" key={rowIndex}>
          {row.map((cell) => (
            <MatrixCell key={cell.id} />
          ))}
        </div>
      ))}
    </main>
  );
};

export default MainBody;
