import { FC, useEffect } from "react";
import { useMatrixStore } from "../store/matrix";

const MainBody: FC = () => {
  const initializeMatrixShape = useMatrixStore(
    (state) => state.initializeMatrixShape,
  );

  useEffect(() => {
    initializeMatrixShape();
  }, [initializeMatrixShape]);

  return <main>main</main>;
};

export default MainBody;
