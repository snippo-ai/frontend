import { auth } from "@/auth";
import CustomBreadcrumb from "@/components/shared/breadcrumb";
import MaxWidthContainer from "@/components/shared/max-width-container";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import AppSidebar from "../platform/_components/sidebar";

interface AccountSettingsLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  description:
    "Update your profile, configure preferences, manage billing, integrations, and other settings for your Snippo account.",
};

const AccountSettingsLayout = async ({
  children,
}: AccountSettingsLayoutProps) => {
  const session = await auth();

  if (!session) {
    return notFound();
  }

  return (
    <SidebarProvider>
      <AppSidebar session={session} page="account" />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <CustomBreadcrumb />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <MaxWidthContainer maxWidth="2xl">{children}</MaxWidthContainer>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AccountSettingsLayout;
