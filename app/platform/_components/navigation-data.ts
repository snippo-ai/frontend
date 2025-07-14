import {
  BarChart3,
  FileText,
  Folder,
  Home,
  Settings as SettingsIcon,
  Users,
} from "lucide-react";

export const sidebarItems = [
  { icon: Home, label: "Dashboard", href: "/platform", active: true },
  { icon: FileText, label: "Snippets", href: "/platform/snippets" },
  { icon: Folder, label: "Collections", href: "/platform/collections" },
  { icon: Users, label: "Team", href: "/platform/team" },
  { icon: BarChart3, label: "Analytics", href: "/platform/analytics" },
];

export const bottomSidebarItems = [
  { icon: SettingsIcon, label: "Settings", href: "/platform/settings" },
];
