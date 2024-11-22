import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Alert, AlertDescription } from "@/components/ui/alert.tsx";
import { LogOut } from "lucide-react";
import { logout } from "@/redux/slice/AuthSlice.ts";
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts";
import { createSpace, fetchAllSpace } from "@/redux/slice/SpaceSlice.ts";
import { Space } from "@repo/utils/SpaceTypes";
import CreateSpaceDialog from "@/screens/User/Dashboard/CreateSpaceDialog.tsx";
import SpaceList from "@/screens/User/Dashboard/SpaceList.tsx";

export default function Dashboard() {
  const [newSpace, setNewSpace] = useState({ name: "", dimensions: "" });
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
      setNewSpace({ name: "", dimensions: "" });
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

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full">
        <CardHeader className={"flex flex-row items-center justify-between"}>
          <div>
            <CardTitle>Dashboard</CardTitle>
            <CardDescription>Manage your spaces</CardDescription>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Your Spaces</h2>
          </div>
          <CreateSpaceDialog
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            handleSubmit={handleCreateSpace}
            newSpace={newSpace}
            setNewSpace={setNewSpace}
          />
          <SpaceList
            spaceList={spaceList}
            handleOnSpaceClick={handleOnSpaceClick}
          />
        </CardContent>
        <CardFooter>
          {message.content && (
            <Alert
              variant={message.type === "error" ? "destructive" : "default"}
              className="w-full"
            >
              <AlertDescription>{message.content}</AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
