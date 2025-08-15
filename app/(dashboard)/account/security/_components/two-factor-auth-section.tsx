"use client";

import { Button } from "@/components/ui/button";
import LineItem from "../../../_components/line-item";

const TwoFactorAuthSection = () => {
  const handleEnable2FA = () => {
    // TODO: Implement 2FA setup functionality
    console.log("Enable 2FA clicked");
  };

  return (
    <section 
      aria-labelledby="2fa-section-heading"
      className="space-y-4"
    >
      <h3 id="2fa-section-heading" className="sr-only">
        Two-Factor Authentication
      </h3>

      <LineItem
        label="Two-Factor Authentication"
        subLabel="Add an extra layer of security to your account"
        action={
          <Button
            size="sm"
            type="button"
            variant="secondary"
            onClick={handleEnable2FA}
            aria-label="Enable two-factor authentication"
          >
            Enable 2FA
          </Button>
        }
      />
    </section>
  );
};

export default TwoFactorAuthSection;
