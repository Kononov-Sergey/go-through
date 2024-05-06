import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { FC } from "react";
import animateQueues from "@/algorithms/utils/animateQueues";
import { MinimumSpanningTree } from "@/algorithms/maze-generators/MinimumSpanningTree";
import { useMatrixStore } from "@/store/matrix";

const MainSettingsPanel: FC = () => {
  const setMatrix = useMatrixStore((store) => store.setMatrix);
  const matrix = useMatrixStore((store) => store.matrix);

  const paint = () => {
    // const { historyQueue: bfsQueue, tempMatrix: bfsMatrix } = bfs(matrix, matrix[3][3]);
    // const { historyQueue: pathQueue } = displayThePath(bfsMatrix);
    const { tempMatrix: MSTMatrix } = MinimumSpanningTree(matrix);
    setMatrix(MSTMatrix);
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
          <button type="button" onClick={paint}>
            mst
          </button>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default MainSettingsPanel;
