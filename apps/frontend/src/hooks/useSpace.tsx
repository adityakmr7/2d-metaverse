import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts";
import { logout } from "@/redux/slice/AuthSlice.ts";
import { createSpace, fetchAllSpace } from "@/redux/slice/SpaceSlice.ts";
import { Space } from "@repo/utils/SpaceTypes";

const useSpace = () => {
  const [newSpace, setNewSpace] = useState({
    name: "",
    dimensions: "",
    thumbnail: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });
  const navigate = useNavigate();
  const { spaceList } = useAppSelector((state) => state.space);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setMessage({ type: "success", content: "Logged out successfully!" });
    dispatch(logout());
    navigate("/auth");
  };
  const handleCreateSpace = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSpace.name && newSpace.dimensions) {
      // setSpaces([...spaces, newSpace]);
      dispatch(
        createSpace({
          name: newSpace.name,
          dimensions: newSpace.dimensions,
          thumbnail: newSpace.thumbnail,
        }),
      ).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          dispatch(fetchAllSpace());
          setMessage({
            type: "success",
            content: "Space created successfully!",
          });
        } else {
          setMessage({
            type: "error",
            content: "Not able to create space, Please try again.",
          });
        }
      });
      setNewSpace({ name: "", dimensions: "", thumbnail: "" });
      setIsDialogOpen(false);
    } else {
      setMessage({ type: "error", content: "Please fill in all fields." });
    }
  };
  useEffect(() => {
    if (spaceList.length <= 0) {
      dispatch(fetchAllSpace());
    }
  }, []);
  const handleOnSpaceClick = (space: Space) => {
    navigate(`/space/${space.id}`);
  };
  return {
    handleLogout,
    handleOnSpaceClick,
    handleCreateSpace,
    message,
    isDialogOpen,
  };
};

export default useSpace;
