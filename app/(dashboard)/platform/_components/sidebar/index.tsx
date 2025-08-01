"use client";

import Logo from "@/components/shared/logo";
import UpgradeToProCard from "@/components/shared/updgrade-to-pro-card";
import { Button } from "@/components/ui/button";
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
import { REDIRECT_ROUTES } from "@/routes";
import {
  ChartNoAxesGanttIcon,
  ChevronLeftIcon,
  LucideIcon,
  ShapesIcon,
} from "lucide-react";
import { Session } from "next-auth";
import * as React from "react";
import { NavMain } from "./nav-main";
import NavUser from "./nav-user";

const sidebarNavData: Record<
  "platform" | "account",
  {
    navMain?: {
      title: string;
      content: {
        title: string;
        url: string;
        icon: LucideIcon;
      }[];
    };
    navSecondary?: {
      title: string;
      content: {
        title: string;
        url: string;
        icon: LucideIcon;
      }[];
    };
  }
> = {
  platform: {
    navMain: {
      title: "Platform",
      content: [
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
  },
  account: {
    navMain: {
      title: "Account",
      content: [
        {
          title: "Account",
          url: "/account",
          icon: SectionIconMap["account"],
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
          title: "Preferences",
          url: "/account/preferences",
          icon: SectionIconMap["preferences"],
        },
      ],
    },
    navSecondary: {
      title: "Other",
      content: [
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
      ],
    },
  },
};

const AppSidebar = ({
  session,
  page,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  session: Session;
  page: "platform" | "account";
  showBackButton?: boolean;
}) => {
  const proBadgeVisible = page?.includes("platform");
  const showBackButton = page !== "platform";

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        {showBackButton ? (
          <Button
            size="sm"
            variant="ghost"
            className="text-muted-foreground hover:text-foreground w-fit"
            onClick={() => {
              if (typeof window === "undefined") return;

              window.location.href = REDIRECT_ROUTES.AFTER_LOGIN;
            }}
          >
            <ChevronLeftIcon /> Platform
          </Button>
        ) : (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Logo />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarHeader>
      <SidebarContent>
        {/* <WorkspaceSelector workspaces={workspaces} /> */}
        {sidebarNavData[page]?.navMain && (
          <NavMain
            items={sidebarNavData[page].navMain.content}
            groupTitle={sidebarNavData[page].navMain.title}
          />
        )}
        {sidebarNavData[page]?.navSecondary && (
          <NavMain
            items={sidebarNavData[page].navSecondary.content}
            groupTitle={sidebarNavData[page].navSecondary.title}
          />
        )}

        {proBadgeVisible && (
          <>
            <Separator className="mb-4" />
            <UpgradeToProCard variant="small" />
          </>
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser session={session} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
