import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Element } from "@repo/utils/SpaceTypes";

interface SpaceDimensions {
  width: number;
  height: number;
}

export default function SpaceCanvas({
  dimensions,
  elements,
  handleCreateElement,
}: {
  dimensions: SpaceDimensions | null;
  handleCreateElement: () => void;
  elements: Element[] | [];
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (dimensions && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the elements
        ctx.fillStyle = "blue";
        elements.forEach((element) => {
          ctx.beginPath();
          ctx.arc(element.width, element.height, 5, 0, 2 * Math.PI);
          ctx.fill();
        });
      }
    }
  }, [dimensions, elements]);

  if (!dimensions) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Space Canvas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <canvas
            ref={canvasRef}
            width={dimensions.width}
            height={dimensions.height}
            className="border border-gray-300"
          />
          <Button onClick={handleCreateElement}>Create Element</Button>
          <p>
            Canvas Size: {dimensions.width}x{dimensions.height}
          </p>
          <p>Elements Created: {elements.length}</p>
        </div>
      </CardContent>
    </Card>
  );
}
