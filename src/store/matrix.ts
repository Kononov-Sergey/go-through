import { create } from "zustand";
import { Matrix } from "../types/Matrix";

export interface MatrixState {
  matrix: Matrix;
}

export interface MatrixAction {
  initializeMatrixShape: () => void;
}

export const useMatrixStore = create<MatrixState & MatrixAction>()((set) => ({
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
}));
