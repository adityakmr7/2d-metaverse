import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Space } from "@repo/utils/SpaceTypes";

interface SpaceListProps {
  spaceList: Space[];
  handleOnSpaceClick: (item: Space) => void;
}
export default function SpaceList({
  spaceList,
  handleOnSpaceClick,
}: SpaceListProps) {
  return (
    <div>
      {spaceList.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {spaceList.map((space, index) => (
            <Card onClick={handleOnSpaceClick.bind(null, space)} key={index}>
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
    </div>
  );
}
