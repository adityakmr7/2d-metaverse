import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { PlusCircle } from "lucide-react";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";

interface CreateSpaceDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (isDialogOpen: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
  newSpace: {
    name: string;
    dimensions: string;
  };
  setNewSpace: ({
    name,
    dimensions,
  }: {
    name: string;
    dimensions: string;
  }) => void;
}
export default function CreateSpaceDialog({
  isDialogOpen,
  setIsDialogOpen,
  handleSubmit,
  newSpace,
  setNewSpace,
}: CreateSpaceDialogProps) {
  return (
    <div>
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
          <form onSubmit={handleSubmit}>
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
  );
}
