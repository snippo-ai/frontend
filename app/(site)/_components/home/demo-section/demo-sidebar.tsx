"use client";

import Logo from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import {
  Bookmark,
  LayoutDashboard,
  LucideIcon,
  Menu,
  PanelLeftDashed,
  Settings,
  Tag,
} from "lucide-react";
import { useState } from "react";

export type NavItemEntity = {
  icon: LucideIcon;
  label: string;
  identifyKey: string;
};

const navItems: NavItemEntity[] = [
  { icon: LayoutDashboard, label: "Dashboard", identifyKey: "dashboard" },
  { icon: Bookmark, label: "Saved Snippets", identifyKey: "saved-snippets" },
  { icon: Tag, label: "Tags", identifyKey: "tags" },
  { icon: Settings, label: "Settings", identifyKey: "settings" },
];

const DemoSidebar: React.FC = () => {
  const [currentNavItem, setCurrentNavItem] = useState(navItems[0]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      {isCollapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsCollapsed(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        h-full bg-sidebar border-r border-zinc-700 transition-all duration-300 z-50
        ${isCollapsed ? "w-16" : "w-64"}
        fixed lg:relative lg:translate-x-0
        ${isCollapsed ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="flex items-center justify-between p-4">
          {!isCollapsed && <Logo />}
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsCollapsed((prev) => !prev)}
            className="p-2 rounded-md hover:bg-zinc-700 transition-colors"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <Menu size={20} /> : <PanelLeftDashed size={20} />}
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant={
                item.identifyKey === currentNavItem.identifyKey
                  ? "default"
                  : "ghost"
              }
              className={`
                    w-full justify-start gap-3 px-3 py-2
                    ${isCollapsed ? "justify-center" : ""}
                  `}
              onClick={() => setCurrentNavItem(item)}
              disabled={item.identifyKey !== "dashboard"}
            >
              <item.icon size={20} />
              {!isCollapsed && <span>{item.label}</span>}
            </Button>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default DemoSidebar;
