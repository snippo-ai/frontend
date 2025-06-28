import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { MainContent, Sidebar, Topbar } from "./_components";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const session = await auth();

  if (!session) {
    return notFound();
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar session={session} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar session={session} />
        <MainContent>{children}</MainContent>
      </div>
    </div>
  );
};

export default DashboardLayout;
