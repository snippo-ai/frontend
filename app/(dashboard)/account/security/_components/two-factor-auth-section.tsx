"use client";

import { AnimatedListItem, AnimatedSection } from "@/components/animations";
import { AnimatedSecondaryButton } from "@/components/animations/button-animations";
import LineItem from "../../../_components/line-item";

const TwoFactorAuthSection = () => {
  const handleEnable2FA = () => {
    // TODO: Implement 2FA setup functionality
    console.log("Enable 2FA clicked");
  };

  return (
    <AnimatedSection aria-labelledby="2fa-section-heading" delay={0.3}>
      <h3 id="2fa-section-heading" className="sr-only">
        Two-Factor Authentication
      </h3>

      <AnimatedListItem>
        <LineItem
          label="Two-Factor Authentication"
          subLabel="Add an extra layer of security to your account"
          action={
            <AnimatedSecondaryButton
              onClick={handleEnable2FA}
              aria-label="Enable two-factor authentication"
            >
              Enable 2FA
            </AnimatedSecondaryButton>
          }
        />
      </AnimatedListItem>
    </AnimatedSection>
  );
};

export default TwoFactorAuthSection;
