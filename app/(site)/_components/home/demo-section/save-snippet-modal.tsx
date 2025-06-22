import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { SnipEntity } from "@/lib/mocks/home-page";
import { X } from "lucide-react";
import { useRef, useState } from "react";

const SaveSnippetModal = ({
  prefill,
  onClose,
  onSave,
}: {
  prefill: SnipEntity;
  onClose: () => void;
  onSave: () => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [exiting, setExiting] = useState(false);

  // Instead, use the prefill values directly
  const title = prefill.title;
  const tags = prefill.tags.join(", ");
  const code = prefill.code;
  const disabled = false;

  const handleClose = () => {
    setExiting(true);
    setTimeout(() => onClose(), 300); // match animation duration
  };

  return (
    <div
      className={`absolute inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        exiting ? "opacity-0" : "opacity-100"
      }`}
      style={{ background: "rgba(0,0,0,0.7)" }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        className={`rounded-2xl shadow-2xl border w-full max-w-lg p-8 relative bg-card border-border text-foreground ${
          exiting ? "animate-fade-out" : "animate-fade-in"
        }`}
        style={{
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.25)",
        }}
      >
        <button
          className="absolute top-4 right-4 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Close modal"
          onClick={handleClose}
          style={{
            background: "var(--card)",
            color: "var(--muted-foreground)",
          }}
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex flex-col items-center mb-4">
          <h2 className="text-2xl font-bold mb-1 tracking-tight text-chart-2">
            Add New Snippet
          </h2>
        </div>
        <form
          className="space-y-5 text-center"
          onSubmit={(e) => {
            e.preventDefault();
            onSave();
          }}
        >
          <div>
            <Label
              htmlFor="title"
              className="mb-1"
              style={{ color: "var(--foreground)" }}
            >
              Title <span style={{ color: "var(--primary)" }}>*</span>
            </Label>
            <div
              className="w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/70 placeholder:opacity-70 transition border text-sm mt-2 text-left"
              style={{
                background: "var(--input)",
                border: "1px solid var(--border)",
                color: "var(--foreground)",
                minHeight: 36,
                display: "flex",
                alignItems: "center",
                fontFamily: "inherit",
              }}
            >
              {title || <span className="opacity-50">Snippet title</span>}
            </div>
          </div>
          <div>
            <Label
              htmlFor="tags"
              className="mb-1"
              style={{ color: "var(--foreground)" }}
            >
              Tags{" "}
              <span style={{ color: "var(--muted-foreground)" }}>
                (comma separated)
              </span>
            </Label>
            <div
              className="w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/70 placeholder:opacity-70 transition border text-sm mt-2 text-left"
              style={{
                background: "var(--input)",
                border: "1px solid var(--border)",
                color: "var(--foreground)",
                minHeight: 36,
                display: "flex",
                alignItems: "center",
                fontFamily: "inherit",
              }}
            >
              {tags || (
                <span className="opacity-50">e.g. python, algorithm</span>
              )}
            </div>
          </div>
          <div>
            <Label
              htmlFor="code"
              className="mb-1"
              style={{ color: "var(--foreground)" }}
            >
              Code <span style={{ color: "var(--primary)" }}>*</span>
            </Label>
            <div
              className="w-full rounded-lg px-4 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-primary/70 placeholder:opacity-70 transition border text-sm mt-2 text-left"
              style={{
                background: "var(--input)",
                border: "1px solid var(--border)",
                color: "var(--foreground)",
                minHeight: 48,
                fontFamily: "JetBrains Mono, monospace",
                whiteSpace: "pre-wrap",
              }}
            >
              {code || (
                <span className="opacity-50">Paste your code here...</span>
              )}
            </div>
          </div>
          <Button
            size="sm"
            type="submit"
            className="w-fit ml-auto py-2 rounded-lg font-semibold shadow-md transition"
            disabled={disabled}
          >
            Add Snippet
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SaveSnippetModal;
