"use client";

import { AnimatedListItem, AnimatedSection } from "@/components/animations";
import { AnimatedSecondaryButton } from "@/components/animations/button-animations";
import LineItem from "../../../_components/line-item";

const ActiveSessionsSection = () => {
  const handleManageSessions = () => {
    // TODO: Implement session management functionality
    console.log("Manage sessions clicked");
  };

  return (
    <AnimatedSection aria-labelledby="sessions-section-heading" delay={0.4}>
      <h3 id="sessions-section-heading" className="sr-only">
        Active Sessions
      </h3>

      <AnimatedListItem>
        <LineItem
          label="Active Sessions"
          subLabel="Manage devices and browsers where you're signed in"
          action={
            <AnimatedSecondaryButton
              onClick={handleManageSessions}
              aria-label="Manage active sessions"
            >
              Manage Sessions
            </AnimatedSecondaryButton>
          }
        />
      </AnimatedListItem>
    </AnimatedSection>
  );
};

export default ActiveSessionsSection;
