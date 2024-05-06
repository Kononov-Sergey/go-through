/* eslint-disable no-param-reassign */
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { QueueItem } from "@/types/AlgorighmsTypes";
import { Matrix, MatrixCell } from "../types/MatrixTypes";

export interface MatrixState {
  matrix: Matrix;
  startCell: MatrixCell | null;
}

export interface MatrixAction {
  initializeMatrixShape: () => void;
  addStartAndFinishPoint: () => void;
  toggleWall: (xCord: number, yCord: number) => void;
  setCellInfo: (newCellInfo: QueueItem) => void;
  setMatrix: (newMatrix: Matrix) => void;
}

export const useMatrixStore = create<MatrixState & MatrixAction>()(
  immer((set) => ({
    // states
    matrix: [],
    startCell: null,

    // actions
    initializeMatrixShape: () =>
      set(() => ({
        matrix: Array(25)
          .fill(0)
          .map((_row, rowIndex) =>
            Array(40)
              .fill(0)
              .map(
                (_cell, cellIndex) =>
                  ({
                    id: `${rowIndex}${cellIndex}`,
                    state: "default",
                    pathLink: null,
                    row: rowIndex,
                    column: cellIndex,
                  }) satisfies MatrixCell
              )
          ) satisfies Matrix,
      })),

    addStartAndFinishPoint: () =>
      set((state) => {
        const storeMatrix = state.matrix;

        storeMatrix[3][3].state = "start";
        storeMatrix[3][3].pathLink = { column: 3, row: 3 };
        storeMatrix[storeMatrix.length - 4][
          storeMatrix[storeMatrix.length - 4].length - 4
        ].state = "destination";

        state.startCell = storeMatrix[3][3];
      }),

    toggleWall: (xCord, yCord) =>
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

    setCellInfo: ({ xCord, yCord, newCell }) =>
      set((state) => {
        state.matrix[xCord][yCord] = newCell;
      }),

    setMatrix: (matrix: Matrix) =>
      set((state) => {
        state.matrix = matrix;
      }),

    clearMatrix: () =>
      set((state) => {
        state.matrix = state.matrix.map((row) =>
          row.map((cell) => ({
            ...cell,
            pathLink: null,
            state: "default",
          }))
        );
      }),
  }))
);
