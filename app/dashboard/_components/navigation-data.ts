import {
  BarChart3,
  FileText,
  Folder,
  Home,
  Settings as SettingsIcon,
  Users,
} from "lucide-react";

export const sidebarItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard", active: true },
  { icon: FileText, label: "Snippets", href: "/dashboard/snippets" },
  { icon: Folder, label: "Collections", href: "/dashboard/collections" },
  { icon: Users, label: "Team", href: "/dashboard/team" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
];

export const bottomSidebarItems = [
  { icon: SettingsIcon, label: "Settings", href: "/dashboard/settings" },
];
