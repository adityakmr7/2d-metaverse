import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PlusCircle, LogOut } from "lucide-react";
import { logout } from "@/redux/slice/AuthSlice.ts";
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts";
import { createSpace, fetchAllSpace } from "@/redux/slice/SpaceSlice.ts";
import { Space } from "@/redux/slice/types/SpaceTypes.ts";

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
    navigate("/login");
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
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Space
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Space</DialogTitle>
                  <DialogDescription>
                    Enter the details for your new space.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateSpace}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={newSpace.name}
                        onChange={(e) =>
                          setNewSpace({ ...newSpace, name: e.target.value })
                        }
                        placeholder="Enter space name"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="dimensions">Dimensions</Label>
                      <Input
                        id="dimensions"
                        value={newSpace.dimensions}
                        onChange={(e) =>
                          setNewSpace({
                            ...newSpace,
                            dimensions: e.target.value,
                          })
                        }
                        placeholder="e.g., 200x200"
                      />
                    </div>
                  </div>
                  <DialogFooter className="mt-4">
                    <Button type="submit">Create Space</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          {spaceList.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {spaceList.map((space, index) => (
                <Card
                  onClick={handleOnSpaceClick.bind(null, space)}
                  key={index}
                >
                  <CardHeader>
                    <CardTitle>{space.name}</CardTitle>
                    <CardDescription>
                      Dimensions: {space.dimensions}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              No spaces created yet.
            </p>
          )}
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
