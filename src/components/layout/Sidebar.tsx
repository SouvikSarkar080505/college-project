
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Home, Users, Bed, Calendar, FileText, Menu } from "lucide-react";

const navItems = [
  { icon: Home, label: "Dashboard", path: "/dashboard" },
  { icon: Users, label: "OPD Queue", path: "/opd-queue" },
  { icon: Bed, label: "Bed Availability", path: "/bed-availability" },
  { icon: Calendar, label: "Patient Admission", path: "/patient-admission" },
  { icon: FileText, label: "Inventory", path: "/inventory" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className={cn(
      "h-screen bg-white border-r border-gray-200 transition-all duration-300 flex flex-col",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <Link to="/dashboard" className="flex items-center space-x-2">
            <span className="text-hospital-700 font-bold text-xl">MediHost</span>
          </Link>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex-1 py-6 flex flex-col gap-2 px-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center space-x-2 px-4 py-3 rounded-md transition-colors",
              location.pathname === item.path 
                ? "bg-hospital-100 text-hospital-700" 
                : "text-gray-600 hover:bg-gray-100",
              collapsed && "justify-center px-2"
            )}
          >
            <item.icon className={cn("h-5 w-5", collapsed && "mx-auto")} />
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200">
        <Link
          to="/"
          className={cn(
            "flex items-center space-x-2 px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors",
            collapsed && "justify-center px-2"
          )}
        >
          <span className={cn("text-sm", collapsed && "hidden")}>Logout</span>
        </Link>
      </div>
    </div>
  );
}
