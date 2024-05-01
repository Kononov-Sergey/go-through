import { QueueItem } from "@/types/AlgorighmsTypes";
import { Matrix } from "@/types/MatrixTypes";

export const paintTheMaze = (matrix: Matrix) => {
  const queue: QueueItem[] = [];

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      queue.push({ xCord: i, yCord: j, newState: "visited" });
    }
  }

  return queue;
};

export const draw = () => {};
