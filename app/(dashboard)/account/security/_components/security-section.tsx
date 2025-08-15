"use client";

import { Separator } from "@/components/ui/separator";
import {
  SectionIconMap,
  SECTIONS_ENUM,
} from "@/lib/mocks/account-settings-sidebar-data";
import { motion } from "motion/react";
import { Fragment } from "react";
import MainContentHeader from "../../_components/main-content-header";
import ActiveSessionsSection from "./active-sessions-section";
import PasswordSection from "./password-section";
import TwoFactorAuthSection from "./two-factor-auth-section";

const SecuritySection = () => {
  return (
    <Fragment>
      <motion.section
        aria-labelledby="security-section-heading"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h2 id="security-section-heading" className="sr-only">
          Security Settings
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <MainContentHeader
            title="Security Settings"
            description="Manage your password, two-factor authentication, and security preferences."
            icon={SectionIconMap[SECTIONS_ENUM.SECURITY]}
          />
        </motion.div>

        <Separator className="my-4 mb-6" />

        <div className="grid gap-8">
          <PasswordSection />
          <TwoFactorAuthSection />
          <ActiveSessionsSection />
        </div>
      </motion.section>
    </Fragment>
  );
};

export default SecuritySection;
