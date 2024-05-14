import { Accordion, AccordionDetails, AccordionSummary, Button } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { FC } from "react";
import animateQueues from "@/algorithms/animations/animateQueues";
import { MinimumSpanningTree } from "@/algorithms/maze-generators/MinimumSpanningTree";
import { useMatrixStore } from "@/store/matrix";
import { displayThePath } from "@/algorithms/maze-solvers/displayThePath";
import { bfs } from "@/algorithms/maze-solvers/BreadthFirstSearch";
import animateNewMatrix from "@/algorithms/animations/animateMatrix";
import animateMatrixCleaning from "@/algorithms/animations/animateMatrixCleaning";
import AStar from "@/algorithms/maze-solvers/AStar";
import depthFirstSearch from "@/algorithms/maze-solvers/DepthFirstSearch";

const MainSettingsPanel: FC = () => {
  const setCellInfo = useMatrixStore((store) => store.setCellInfo);
  const matrix = useMatrixStore((store) => store.matrix);

  const paintMST = () => {
    const { tempMatrix: MSTMatrix } = MinimumSpanningTree(matrix);
    animateNewMatrix(MSTMatrix, setCellInfo, 400);
  };

  const paintBFS = () => {
    const { tempMatrix: clearedMatrix } = animateMatrixCleaning(matrix, setCellInfo);
    const { historyQueue: bfsQueue, matrix: bfsMatrix } = bfs(
      clearedMatrix,
      clearedMatrix[3][3]
    );
    const { historyQueue: pathQueue } = displayThePath(bfsMatrix);

    animateQueues([bfsQueue, pathQueue], setCellInfo, 10);
  };

  const paintDFS = () => {
    const { tempMatrix: clearedMatrix } = animateMatrixCleaning(matrix, setCellInfo);
    const { historyQueue: dfsQueue, matrix: dfsMatrix } = depthFirstSearch(
      clearedMatrix,
      clearedMatrix[3][3]
    );
    const { historyQueue: pathQueue } = displayThePath(dfsMatrix);
    animateQueues([dfsQueue, pathQueue], setCellInfo, 10);
  };

  const paintAStar = () => {
    const { tempMatrix: clearedMatrix } = animateMatrixCleaning(matrix, setCellInfo);
    const { historyQueue: AStarQueue, matrix: AStarMatrix } = AStar(
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
      <Button variant="contained" onClick={paintDFS}>
        DFS
      </Button>
      <Button variant="contained" onClick={paintAStar}>
        A*
      </Button>
    </div>
  );
};

export default MainSettingsPanel;
