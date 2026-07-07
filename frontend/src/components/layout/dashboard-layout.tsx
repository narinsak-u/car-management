import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <div className="lg:pl-64">
        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>

      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0 bg-gray-950 border-0">
          <div className="pt-14">
            <Sidebar />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
