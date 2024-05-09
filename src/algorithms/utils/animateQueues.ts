import { QueueItem } from "@/types/AlgorighmsTypes";

const animateQueues = (
  queues: QueueItem[][],
  setStateCallback: (newCellInfo: QueueItem) => void,
  speed: number = 50
) => {
  let index = 0;

  for (let queue of queues) {
    while (queue.length > 0) {
      const newCellInfo = queue.shift();
      index++;
      if (newCellInfo) {
        setTimeout(() => {
          setStateCallback(newCellInfo);
        }, index * speed);
      }
    }
  }
};

export default animateQueues;
