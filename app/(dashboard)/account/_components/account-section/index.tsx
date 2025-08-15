"use client";

import { AnimatedSection, FadeIn } from "@/components/animations";
import { Separator } from "@/components/ui/separator";
import {
  SectionIconMap,
  SECTIONS_ENUM,
} from "@/lib/mocks/account-settings-sidebar-data";
import { Session } from "next-auth";
import MainContentHeader from "../main-content-header";
import SystemSettings from "./system-settings";
import UserAvatar from "./user-avatar";
import UserDetails from "./user-details";

type Props = {
  session: Session;
};

const AccountSection = ({ session }: Props) => {
  return (
    <AnimatedSection aria-labelledby="account-section-heading" delay={0.1}>
      <h2 id="account-section-heading" className="sr-only">
        Account Settings
      </h2>
      <FadeIn delay={0.2} direction="up">
        <MainContentHeader
          title="Account"
          description="Manage your account information, email preferences, and account status."
          icon={SectionIconMap[SECTIONS_ENUM.ACCOUNT]}
        />
        <Separator className="my-4 mb-6" />
        <div className="grid gap-8">
          <UserAvatar user={session.user} />
          <UserDetails user={session.user} />
        </div>
      </FadeIn>
      <FadeIn delay={0.4} direction="up">
        <SystemSettings userEmail={session.user.email} />
      </FadeIn>
    </AnimatedSection>
  );
};

export default AccountSection;
