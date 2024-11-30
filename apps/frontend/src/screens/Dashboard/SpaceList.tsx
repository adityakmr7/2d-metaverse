import { Card, CardContent, CardFooter } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Space } from "@repo/utils/SpaceTypes";
import { isEmpty, map } from "lodash";

const SpaceList = ({
  spaceList,
  handleCardClick,
}: {
  spaceList: Space[];
  handleCardClick: (id: string) => void;
}) => {
  if (isEmpty(spaceList)) {
    return (
      <div>
        <h3>There is no space as of now.</h3>
      </div>
    );
  }
  return (
    <div>
      {map(spaceList, (space) => (
        <Card
          onClick={() => handleCardClick(space.id)}
          key={space.id}
          className="overflow-hidden"
        >
          <CardContent className="p-0">
            <div className="relative">
              <img
                src={space.thumbnail ?? ""}
                alt={space.id}
                className="h-[200px] w-full object-cover"
              />
              {/*{space.isOwner && (*/}
              {/*  <div className="absolute left-2 top-2 rounded bg-[#7C3AED] px-2 py-1 text-xs font-semibold text-white">*/}
              {/*    OWNER*/}
              {/*  </div>*/}
              {/*)}*/}
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between p-4">
            <h3 className="text-lg font-semibold">{space.name}</h3>
            {/*{space.memberCount && (*/}
            {/*  <div className="flex items-center gap-1 text-sm text-gray-500">*/}
            {/*    <span>{space.memberCount}</span>*/}
            {/*  </div>*/}
            {/*)}*/}
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto h-8 w-8"
              aria-label="More options"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default SpaceList;
