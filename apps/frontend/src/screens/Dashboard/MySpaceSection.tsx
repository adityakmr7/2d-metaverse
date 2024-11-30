import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Search } from "lucide-react";
import { CreateSpaceDialog } from "@/screens/Dashboard/CreateSpaceDialog.tsx";
import { useNavigate } from "react-router-dom";
import useGetAllSpace from "@/hooks/useGetAllSpace.tsx";
import SpaceList from "@/screens/Dashboard/SpaceList.tsx";

const MySpaceSection = () => {
  const [activeTab, setActiveTab] = useState("recent");
  const [searchQuery, setSearchQuery] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { spaceList = [] } = useGetAllSpace();

  const handleCardClick = (id: string) => {
    navigate(`/space-view/${id}`);
  };
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <Tabs
          value={activeTab}
          defaultValue="recent"
          className="w-full md:w-auto"
          onValueChange={setActiveTab}
        >
          <div className={"flex flex-row  justify-between w-full align-middle"}>
            <TabsList>
              <TabsTrigger
                value="recent"
                onClick={() => setActiveTab("recent")}
              >
                Recent
              </TabsTrigger>
              <TabsTrigger
                value="my-spaces"
                onClick={() => setActiveTab("my-spaces")}
              >
                My Spaces
              </TabsTrigger>
            </TabsList>
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search Spaces"
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="text-[#7C3AED]">
                  Enter with Code
                </Button>
                <Button
                  onClick={() => setCreateDialogOpen(true)}
                  className="bg-[#7C3AED] hover:bg-[#6D28D9]"
                >
                  Create Space
                </Button>
              </div>
            </div>
          </div>
          <TabsContent value="recent">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <h1>Recent is empty as of now.</h1>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="my-spaces">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <SpaceList
                handleCardClick={handleCardClick}
                spaceList={spaceList}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <CreateSpaceDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
    </div>
  );
};

export default MySpaceSection;
