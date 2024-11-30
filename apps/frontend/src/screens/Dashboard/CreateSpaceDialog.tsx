import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import useCreateSpace from "@/hooks/useCreateSpace.tsx";

interface CreateSpaceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateSpaceDialog({
  open,
  onOpenChange,
}: CreateSpaceDialogProps) {
  const [spaceName, setSpaceName] = useState("");
  const [dimensions, setDimensions] = useState("200x300");
  const [mapId, setMapId] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [hasPassword, setHasPassword] = useState(false);
  const { onSubmit } = useCreateSpace();

  const handleCreate = () => {
    onSubmit({
      name: spaceName,
      dimensions,
      mapId,
      thumbnail,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Space Settings
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="spaceName">Space Name</Label>
            <div className="relative">
              <Input
                id="spaceName"
                placeholder="EMPTY"
                value={spaceName}
                onChange={(e) => setSpaceName(e.target.value)}
                maxLength={30}
              />
              <span className="absolute right-3 top-2.5 text-sm text-gray-500">
                {spaceName.length}/30
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dimensions">Dimensions</Label>
            <Input
              id="dimensions"
              placeholder="200x300"
              value={dimensions}
              onChange={(e) => setDimensions(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mapId">Map ID</Label>
            <Input
              id="mapId"
              placeholder="Enter Map ID"
              value={mapId}
              onChange={(e) => setMapId(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="thumbnail">Thumbnail URL</Label>
            <Input
              id="thumbnail"
              placeholder="Enter Thumbnail URL"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Public Option</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Public</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-full"
                >
                  <span className="text-sm">?</span>
                </Button>
              </div>
            </div>
            <Switch
              checked={isPublic}
              onCheckedChange={setIsPublic}
              className="data-[state=checked]:bg-[#7C3AED]"
            />
          </div>
          <div className="flex items-center justify-between">
            <Label>Set Password</Label>
            <Switch
              checked={hasPassword}
              onCheckedChange={setHasPassword}
              className="data-[state=checked]:bg-[#7C3AED]"
            />
          </div>
          <p className="text-center text-sm text-muted-foreground">
            It may take up to 5 minutes.
          </p>
          <Button
            className="w-full bg-[#7C3AED] hover:bg-[#6D28D9]"
            onClick={handleCreate}
          >
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
