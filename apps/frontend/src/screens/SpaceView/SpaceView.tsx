import { useState } from "react";
import {
  Clock,
  Link2,
  MapPin,
  Maximize2,
  Menu,
  MessageSquare,
  Mic,
  Minus,
  Monitor,
  Plus,
  Settings,
  Users,
  Video,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function SpaceView() {
  const [message, setMessage] = useState("");

  return (
    <div className="flex h-screen w-full bg-background">
      {/* Left Sidebar */}
      <div className="flex w-16 flex-col items-center border-r bg-background py-4">
        <Button variant="ghost" size="icon" className="mb-4">
          <Menu className="h-6 w-6" />
        </Button>
        <Separator className="mb-4" />
        <div className="flex flex-col items-center space-y-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <MapPin className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Location</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Link2 className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Share Link</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <MessageSquare className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Chat</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon"></Button>
            </TooltipTrigger>
            <TooltipContent side="right">Tools</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Top Banner */}
        <div className="flex h-12 items-center justify-between bg-[#5C8D54] px-4 text-white">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Minus className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>1</span>
            </div>
            <Button size="sm" variant="secondary">
              Invite
            </Button>
          </div>
        </div>

        {/* Game Viewport */}
        <div className="relative flex-1 bg-[#90B77D] overflow-scroll">
          <canvas />
        </div>

        {/* Bottom Controls */}
        <div className="flex h-16 items-center justify-between border-t bg-background px-4">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Mic className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Monitor className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Clock className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex w-96 items-center space-x-2">
            <Input
              type="text"
              placeholder="Please enter your chat"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1"
            />
            <Button variant="ghost" size="icon">
              <MessageSquare className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
