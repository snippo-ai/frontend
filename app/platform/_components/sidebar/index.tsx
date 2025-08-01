"use client";

import Logo from "@/components/shared/logo";
import UpgradeToProCard from "@/components/shared/updgrade-to-pro-card";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SectionIconMap } from "@/lib/mocks/account-settings-sidebar-data";
import { ChartNoAxesGanttIcon, ShapesIcon } from "lucide-react";
import { Session } from "next-auth";
import * as React from "react";
import { NavMain } from "./nav-main";
import NavUser from "./nav-user";

const sidebarNavData = {
  platform: {
    groupTitle: "Platform",
    navMain: [
      {
        title: "Overview",
        url: "/platform/overview",
        icon: ChartNoAxesGanttIcon,
      },
      {
        title: "My Collections",
        url: "/platform/my-collections",
        icon: ShapesIcon,
      },
    ],
  },
  account: {
    groupTitle: "Settings",
    navMain: [
      {
        title: "Account",
        url: "/account",
        icon: SectionIconMap["account"],
      },
      {
        title: "Profile",
        url: "/account/profile",
        icon: SectionIconMap["profile"],
      },
      {
        title: "Security",
        url: "/account/security",
        icon: SectionIconMap["security"],
      },
      {
        title: "Billing",
        url: "/account/billing",
        icon: SectionIconMap["billing"],
      },
      {
        title: "Notifications",
        url: "/account/notifications",
        icon: SectionIconMap["notifications"],
      },
      {
        title: "Integrations",
        url: "/account/integrations",
        icon: SectionIconMap["integrations"],
      },
      {
        title: "API Keys",
        url: "/account/api-keys",
        icon: SectionIconMap["api-keys"],
      },
      {
        title: "Preferences",
        url: "/account/preferences",
        icon: SectionIconMap["preferences"],
      },
    ],
  },
};

const AppSidebar = ({
  session,
  page,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  session: Session;
  page: "platform" | "account";
}) => {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Logo />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* <WorkspaceSelector workspaces={workspaces} /> */}
        <NavMain
          items={sidebarNavData[page].navMain}
          groupTitle={sidebarNavData[page].groupTitle}
        />
        <Separator className="mb-4" />
        <UpgradeToProCard variant="small" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser session={session} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
