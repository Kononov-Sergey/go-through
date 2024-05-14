import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { FC } from "react";
import animateQueues from "@/algorithms/utils/animateQueues";
import { MinimumSpanningTree } from "@/algorithms/maze-generators/MinimumSpanningTree";
import { useMatrixStore } from "@/store/matrix";
import { displayThePath } from "@/algorithms/utils/displayThePath";
import { bfs } from "@/algorithms/maze-solvers/Breadth-FirstSearch";
import animateNewMatrix from "@/algorithms/utils/animateMatrix";
import clearTheMatrix from "@/algorithms/utils/clearVisitedCells";

const MainSettingsPanel: FC = () => {
  const setCellInfo = useMatrixStore((store) => store.setCellInfo);
  const setMatrix = useMatrixStore((store) => store.setMatrix);
  const matrix = useMatrixStore((store) => store.matrix);

  const mst = () => {
    const { tempMatrix: MSTMatrix } = MinimumSpanningTree(matrix);
    animateNewMatrix(MSTMatrix, setCellInfo, 400);
  };

  const paintBfs = () => {
    const { tempMatrix: clearedMatrix } = clearTheMatrix(matrix, setCellInfo);
    /**
     * This function performs a breadth-first search on the matrix,
     * and then displays the path from the start cell to the destination cell
     */
    const { historyQueue: bfsQueue, tempMatrix: bfsMatrix } = bfs(
      clearedMatrix,
      clearedMatrix[3][3]
    );
    /**
     * This function takes the matrix with BFS path and displays it
     */
    const { historyQueue: pathQueue } = displayThePath(bfsMatrix);
    /**
     * This function animates an array of queues, by calling setCellInfo
     * with each item in the queue, and a delay of 10ms between each animation step
     */
    animateQueues([bfsQueue, pathQueue], setCellInfo, 10);
  };

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="settings-panel"
          id="main-settings-panel"
        >
          Настройки
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-col gap-4">
            <button type="button" onClick={mst}>
              mst
            </button>
            <button type="button" onClick={paintBfs}>
              bfs
            </button>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default MainSettingsPanel;
