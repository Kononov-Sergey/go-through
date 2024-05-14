import { Accordion, AccordionDetails, AccordionSummary, Button } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { FC } from "react";
import animateQueues from "@/algorithms/utils/animateQueues";
import { MinimumSpanningTree } from "@/algorithms/maze-generators/MinimumSpanningTree";
import { useMatrixStore } from "@/store/matrix";
import { displayThePath } from "@/algorithms/utils/displayThePath";
import { bfs } from "@/algorithms/maze-solvers/Breadth-FirstSearch";
import animateNewMatrix from "@/algorithms/utils/animateMatrix";
import clearTheMatrix from "@/algorithms/utils/clearVisitedCells";
import AStar from "@/algorithms/maze-solvers/AStar";

const MainSettingsPanel: FC = () => {
  const setCellInfo = useMatrixStore((store) => store.setCellInfo);
  const matrix = useMatrixStore((store) => store.matrix);

  const paintMST = () => {
    const { tempMatrix: MSTMatrix } = MinimumSpanningTree(matrix);
    animateNewMatrix(MSTMatrix, setCellInfo, 400);
  };

  const paintBFS = () => {
    const { tempMatrix: clearedMatrix } = clearTheMatrix(matrix, setCellInfo);
    const { historyQueue: bfsQueue, tempMatrix: bfsMatrix } = bfs(
      clearedMatrix,
      clearedMatrix[3][3]
    );
    const { historyQueue: pathQueue } = displayThePath(bfsMatrix);

    animateQueues([bfsQueue, pathQueue], setCellInfo, 10);
  };

  const paintAStar = () => {
    const { tempMatrix: clearedMatrix } = clearTheMatrix(matrix, setCellInfo);
    const { historyQueue: AStarQueue, tempMatrix: AStarMatrix } = AStar(
      clearedMatrix,
      clearedMatrix[3][3],
      clearedMatrix[clearedMatrix.length - 4][clearedMatrix[0].length - 4]
    );
    const { historyQueue: pathQueue } = displayThePath(AStarMatrix);

    animateQueues([AStarQueue, pathQueue], setCellInfo, 10);
  };

  return (
    <div className="flex gap-4">
      <Button variant="contained" onClick={paintMST}>
        MST
      </Button>
      <Button variant="contained" onClick={paintBFS}>
        BFS
      </Button>
      <Button variant="contained" onClick={paintAStar}>
        A*
      </Button>
    </div>
  );
};

export default MainSettingsPanel;
