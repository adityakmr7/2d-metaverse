import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts";
import { useEffect, useMemo } from "react";
import { fetchIndividualSpace } from "@/redux/slice/SpaceSlice.ts";
import SpaceCanvas from "@/screens/Space/SpaceCanvas.tsx";

const Space = () => {
  const { spaceId = "" } = useParams();
  const dispatch = useAppDispatch();
  const { individualSpaceData, isLoadingIndividualSpace } = useAppSelector(
    (state) => state.space,
  );
  useEffect(() => {
    dispatch(
      fetchIndividualSpace({
        spaceId,
      }),
    );
  }, [spaceId]);
  const { width, height } = useMemo(() => {
    if (individualSpaceData) {
      return {
        width: individualSpaceData?.dimensions?.split("x")[0],
        height: individualSpaceData?.dimensions?.split("x")[1],
      };
    }
    return {
      width: 200,
      height: 200,
    };
  }, [individualSpaceData]);
  const handleCreateElement = () => {};
  if (isLoadingIndividualSpace) {
    return <div>Loading...</div>;
  }
  return (
    <SpaceCanvas
      dimensions={{
        width: Number(width),
        height: Number(height),
      }}
      handleCreateElement={handleCreateElement}
      elements={individualSpaceData?.elements ?? []}
    />
  );
};

export default Space;
