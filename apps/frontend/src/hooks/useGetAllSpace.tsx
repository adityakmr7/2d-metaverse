import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts";
import { fetchAllSpace } from "@/redux/slice/SpaceSlice.ts";

const useGetAllSpace = () => {
  const { spaceList } = useAppSelector((state) => state.space);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (spaceList.length <= 0) {
      dispatch(fetchAllSpace());
    }
  }, []);
  return {
    spaceList,
  };
};

export default useGetAllSpace;
