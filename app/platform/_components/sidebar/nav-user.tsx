"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { getInitials } from "@/lib/utils";
import { ChevronsUpDown, LogOut, SettingsIcon } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Settings from "./settings";

type NavUserProps = {
  session: Session;
};

const NavUser = ({ session }: NavUserProps) => {
  const { user } = session;
  const fullName = `${user.firstName} ${user.lastName}`;
  const { isMobile } = useSidebar();
  console.log({ userImage: user.userImage });

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
              <DialogTrigger asChild>
                <DropdownMenuItem>
                  <SettingsIcon />
                  Settings
                </DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent
            className="max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl w-full p-0"
            overlayBlur
          >
            <Settings session={session} />
          </DialogContent>
        </Dialog>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavUser;
