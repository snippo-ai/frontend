"use client";

type EventHandler<T = unknown> = (payload: T) => void;

class EventBus {
  private events = new Map<string, Set<EventHandler>>();

  on<T = unknown>(event: string, handler: EventHandler<T>) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event)!.add(handler as EventHandler);
  }

  off<T = unknown>(event: string, handler: EventHandler<T>) {
    this.events.get(event)?.delete(handler as EventHandler);
  }

  emit<T = unknown>(event: string, payload?: T) {
    this.events.get(event)?.forEach((handler) => {
      (handler as EventHandler<T>)(payload as T);
    });
  }

  clear(event: string) {
    this.events.delete(event);
  }
}

const eventBus = new EventBus();
export default eventBus;
