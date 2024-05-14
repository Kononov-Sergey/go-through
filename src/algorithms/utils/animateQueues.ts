import { QueueItem } from "@/types/AlgorighmsTypes";

const animateQueues = (
  queues: QueueItem[][] | undefined,
  setStateCallback: (newCellInfo: QueueItem) => void,
  speed: number = 50
) => {
  let index = 0;

  if (!queues) {
    return;
  }

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
