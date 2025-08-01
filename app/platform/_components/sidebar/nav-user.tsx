"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { SectionIconMap } from "@/lib/mocks/account-settings-sidebar-data";
import { getInitials } from "@/lib/utils";
import { AUTH_ROUTES } from "@/routes";
import { ChevronsUpDown, LogOut } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";

type NavUserProps = {
  session: Session;
};

const NavUser = ({ session }: NavUserProps) => {
  const { user } = session;
  const fullName = `${user.firstName} ${user.lastName}`;
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="size-8 rounded-lg">
                  <AvatarImage
                    src={user?.userImage}
                    alt={fullName}
                    className="object-cover"
                  />
                  <AvatarFallback className="rounded-lg">
                    {getInitials(fullName)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <div className="flex items-center gap-1">
                    <span className="truncate font-medium">
                      {user.firstName}
                    </span>
                    {/* <span className="border-2 border-sky-500 text-[10px] px-2 rounded-lg">
                      Pro
                    </span> */}
                  </div>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "top"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuGroup>
                <Link href="/account">
                  <DropdownMenuItem>
                    <SectionIconMap.account />
                    Account
                  </DropdownMenuItem>
                </Link>
                <Link href="/profile">
                  <DropdownMenuItem>
                    <SectionIconMap.profile />
                    Profile
                  </DropdownMenuItem>
                </Link>
                <Link href="/account/security">
                  <DropdownMenuItem>
                    <SectionIconMap.security />
                    Security
                  </DropdownMenuItem>
                </Link>
                <Link href="/account/billing">
                  <DropdownMenuItem>
                    <SectionIconMap.billing />
                    Billing
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => signOut({ callbackUrl: AUTH_ROUTES.LOGIN })}
              >
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Dialog>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavUser;
