import { create } from "zustand";
import { Matrix } from "../types/Matrix";

interface MatrixState {
  matrix: Matrix;
}

interface MatrixAction {
  initializeMatrixShape: () => void;
}

export const useMatrixStore = create<MatrixState & MatrixAction>()((set) => ({
  matrix: [],
  initializeMatrixShape: () => set(() => ({ matrix: Array(9).fill(Array(9)) })),
}));
