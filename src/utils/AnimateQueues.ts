import { QueueItem } from "@/types/AlgorighmsTypes";

const animateQueues = (
  queues: QueueItem[][],
  callback: (newCellInfo: QueueItem) => void
) => {
  let index = 0;

  for (let queue of queues) {
    while (queue.length > 0) {
      const newCellInfo = queue.shift();
      index++;
      if (newCellInfo) {
        setTimeout(() => {
          callback(newCellInfo);
        }, index * 50);
      }
    }
  }
};

export default animateQueues;
