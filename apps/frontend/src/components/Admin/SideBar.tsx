import { Link } from "react-router-dom";
import { Home, LayoutGrid, Map, Square } from "lucide-react";

function Sidebar() {
  return (
    <div className="w-64 bg-white h-full shadow-md">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>
      <nav className="mt-8">
        <Link
          to="/admin/dashboard"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          <Home className="mr-2" size={20} />
          Dashboard
        </Link>
        <Link
          to="/admin/spaces"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          <Square className="mr-2" size={20} />
          Spaces
        </Link>
        <Link
          to="/admin/elements"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          <LayoutGrid className="mr-2" size={20} />
          Space Elements
        </Link>
        <Link
          to="/admin/maps"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          <Map className="mr-2" size={20} />
          Maps
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
