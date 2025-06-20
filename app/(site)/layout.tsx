import { auth } from "@/auth";
import { ReactNode } from "react";
import Footer from "./_components/footer";
import Header from "./_components/header";

type SiteLayoutProps = {
  children: ReactNode;
};

const SiteLayout = async ({ children }: SiteLayoutProps) => {
  const session = await auth();

  return (
    <>
      <Header session={session} />
      {children}
      <Footer />
    </>
  );
};

export default SiteLayout;
