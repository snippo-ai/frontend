"use client";

import { AnimatedSection, FadeIn } from "@/components/animations";
import { Separator } from "@/components/ui/separator";
import {
  SectionIconMap,
  SECTIONS_ENUM,
} from "@/lib/mocks/account-settings-sidebar-data";
import { Fragment } from "react";
import MainContentHeader from "../../_components/main-content-header";
import ActiveSessionsSection from "./active-sessions-section";
import PasswordSection from "./password-section";
import TwoFactorAuthSection from "./two-factor-auth-section";

const SecuritySection = () => {
  return (
    <Fragment>
      <AnimatedSection aria-labelledby="security-section-heading" delay={0.1}>
        <h2 id="security-section-heading" className="sr-only">
          Security Settings
        </h2>
        <FadeIn delay={0.2} direction="up">
          <MainContentHeader
            title="Security Settings"
            description="Manage your password, two-factor authentication, and security preferences."
            icon={SectionIconMap[SECTIONS_ENUM.SECURITY]}
          />
          <Separator className="my-4 mb-6" />
          <div className="grid gap-8">
            <PasswordSection />
            <TwoFactorAuthSection />
            <ActiveSessionsSection />
          </div>
        </FadeIn>
      </AnimatedSection>
    </Fragment>
  );
};

export default SecuritySection;
