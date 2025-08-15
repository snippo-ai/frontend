"use client";

import { Button } from "@/components/ui/button";
import LineItem from "../../../_components/line-item";

const ActiveSessionsSection = () => {
  const handleManageSessions = () => {
    // TODO: Implement session management functionality
    console.log("Manage sessions clicked");
  };

  return (
    <section
      aria-labelledby="sessions-section-heading"
      className="space-y-4"
    >
      <h3 id="sessions-section-heading" className="sr-only">
        Active Sessions
      </h3>

      <LineItem
        label="Active Sessions"
        subLabel="Manage devices and browsers where you're signed in"
        action={
          <Button
            size="sm"
            type="button"
            variant="secondary"
            onClick={handleManageSessions}
            aria-label="Manage active sessions"
          >
            Manage Sessions
          </Button>
        }
      />
    </section>
  );
};

export default ActiveSessionsSection;
