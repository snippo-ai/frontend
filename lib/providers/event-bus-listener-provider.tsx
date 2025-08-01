"use client";

import { useEffect } from "react";
import eventBus from "../event-bus";

export default function EventListenerProvider() {
  useEffect(() => {
    eventBus.on("SAVE_USER", () => {});

    return () => {
      eventBus.off("SAVE_USER", () => {});
    };
  }, []);

  return null;
}
