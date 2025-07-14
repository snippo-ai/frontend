"use client";

import Logo from "@/components/shared/logo";
import UpgradeToProCard from "@/components/shared/updgrade-to-pro-card";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChartNoAxesGanttIcon, ShapesIcon } from "lucide-react";
import { User } from "next-auth";
import * as React from "react";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

const data = {
  navMain: [
    {
      title: "Overview",
      url: "/overview",
      icon: ChartNoAxesGanttIcon,
    },
    {
      title: "My Collections",
      url: "/my-collections",
      icon: ShapesIcon,
    },
  ],
};

const AppSidebar = ({
  session,
  ...props
}: React.ComponentProps<typeof Sidebar> & { session: { user: User } }) => {
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
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <UpgradeToProCard variant="small" />
        <NavUser user={session.user} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
