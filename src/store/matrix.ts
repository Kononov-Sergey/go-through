/* eslint-disable no-param-reassign */
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { Matrix } from "../types/Matrix";

export interface MatrixState {
  matrix: Matrix;
}

export interface MatrixAction {
  initializeMatrixShape: () => void;
  addStartAndFinishPoint: () => void;
  toggleWall: (xCord: number, yCord: number) => void;
}

export const useMatrixStore = create<MatrixState & MatrixAction>()(
  immer((set) => ({
    matrix: [],
    initializeMatrixShape: () =>
      set(() => ({
        matrix: Array(45)
          .fill(0)
          .map((row, rowIndex) =>
            Array(80)
              .fill(0)
              .map((cell, cellIndex) => ({
                id: `${rowIndex}${cellIndex}`,
                state: "default",
                pathLink: null,
              }))
          ),
      })),

    addStartAndFinishPoint: () =>
      set((state) => {
        const storeMatrix = state.matrix;

        storeMatrix[3][3].state = "start";
        storeMatrix[storeMatrix.length - 4][
          storeMatrix[storeMatrix.length - 4].length - 4
        ].state = "destination";
      }),

    toggleWall: (xCord: number, yCord: number) =>
      set((state) => {
        const cell = state.matrix[xCord][yCord];
        if (cell.state === "destination" || cell.state === "start") {
          return;
        }
        if (cell.state === "wall") {
          cell.state = "default";
          return;
        }
        cell.state = "wall";
      }),
  }))
);
