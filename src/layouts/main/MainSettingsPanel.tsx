import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { FC } from "react";
import animateQueues from "@/algorithms/utils/animateQueues";
import { MinimumSpanningTree } from "@/algorithms/maze-generators/MinimumSpanningTree";
import { useMatrixStore } from "@/store/matrix";
import { displayThePath } from "@/algorithms/utils/displayThePath";
import { bfs } from "@/algorithms/maze-solvers/Breadth-FirstSearch";
import animateNewMatrix from "@/algorithms/utils/animateMatrix";

const MainSettingsPanel: FC = () => {
  const setCellInfo = useMatrixStore((store) => store.setCellInfo);
  const setMatrix = useMatrixStore((store) => store.setMatrix);
  const matrix = useMatrixStore((store) => store.matrix);

  const mst = () => {
    const { tempMatrix: MSTMatrix } = MinimumSpanningTree(matrix);
    animateNewMatrix(MSTMatrix, setCellInfo);
  };

  const paintBfs = () => {
    const { historyQueue: bfsQueue, tempMatrix: bfsMatrix } = bfs(matrix, matrix[3][3]);
    const { historyQueue: pathQueue } = displayThePath(bfsMatrix);
    animateQueues([bfsQueue, pathQueue], setCellInfo, 5);
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
