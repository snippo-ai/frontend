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
import { ChevronsUpDown, LogOut, SettingsIcon } from "lucide-react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Settings from "./settings";

export function NavUser({ user }: { user: User }) {
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
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.userImage} alt={user.firstName} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.firstName}</span>
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
            <Settings />
            {/* <DialogFooter>
              <Button type="submit">Confirm</Button>
            </DialogFooter> */}
          </DialogContent>
        </Dialog>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
