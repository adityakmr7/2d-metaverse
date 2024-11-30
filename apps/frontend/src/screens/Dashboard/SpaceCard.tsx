import { Space } from "@repo/utils/SpaceTypes";

interface SpaceCardProps {
  space: Space;
}

export default function SpaceCard({ space }: SpaceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {space.thumbnail && (
        <img
          src={space.thumbnail}
          alt={space.name}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{space.name}</h3>
        <p className="text-gray-600">Dimensions: {space.dimensions}</p>
      </div>
    </div>
  );
}
