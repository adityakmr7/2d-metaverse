import { ReactNode } from "react";
import Sidebar from "@/components/Admin/SideBar.tsx";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="flex w-screen h-screen w-full bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}

export default Layout;
