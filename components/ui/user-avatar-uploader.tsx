"use client";

import { Button } from "@/components/ui/button";
import { useFileUpload } from "@/hooks/use-file-upload";
import { CircleUserRoundIcon } from "lucide-react";
import NextImage from "next/image";
import { memo, useEffect, useId, useMemo, useState } from "react";

/**
 * UserAvatarUploader (purpose-built for user avatars)
 *
 * ✅ Optimized UX: single-avatar only, clear CTA, instant preview
 * ✅ Performance: memoized derived values, minimal re-renders, tiny DOM
 * ✅ Accessibility: descriptive alt/labels, errors with aria-live, keyboard-friendly
 * ✅ Robustness: strict file type/size/dimension validation, safe URL revocation
 * ✅ Maintainability: tiny API surface (same props), self-contained
 */

interface UserAvatarUploaderProps {
  /** Existing avatar URL (may be remote or data URL). */
  initialUserImage?: string | null;
  /** Full name for accessible alt text. */
  fullName: string;
}

const MAX_BYTES = 3 * 1024 * 1024; // 3MB hard cap for avatars (tunable)
const MIN_DIMENSION = 128; // require at least 128×128 so it doesn't look blurry
const ALLOWED_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

const UserAvatarUploader = ({
  initialUserImage = null,
  fullName,
}: UserAvatarUploaderProps) => {
  const inputId = useId();
  const [error, setError] = useState<string | null>(null);

  // Only accept avatar-appropriate formats.
  const [{ files }, { removeFile, openFileDialog, getInputProps }] =
    useFileUpload({
      accept: "image/jpeg,image/png,image/webp",
    });

  const file = files?.[0]?.file as File | undefined;
  const fileId = files?.[0]?.id as string | undefined;

  // Validate file when it changes (type/size/dimensions). If invalid, remove it.
  useEffect(() => {
    let canceled = false;
    if (!file) {
      setError(null);
      return;
    }

    // Type & size checks first (cheap).
    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      setError("Please choose a JPG, PNG, or WEBP image.");
      if (fileId) removeFile(fileId);
      return;
    }

    if (file.size > MAX_BYTES) {
      setError("Max file size is 3MB.");
      if (fileId) removeFile(fileId);
      return;
    }

    // Dimension check (async but fast).
    const blobURL = URL.createObjectURL(file);
    const img = new Image();
    img.src = blobURL;

    img.onload = () => {
      if (canceled) return;
      const { width, height } = img;
      URL.revokeObjectURL(blobURL);

      if (width < MIN_DIMENSION || height < MIN_DIMENSION) {
        setError(
          `Avatar should be at least ${MIN_DIMENSION}×${MIN_DIMENSION}px.`
        );
        if (fileId) removeFile(fileId);
      } else {
        setError(null);
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(blobURL);
      if (canceled) return;
      setError("Couldn't read that image. Please try another file.");
      if (fileId) removeFile(fileId);
    };

    return () => {
      canceled = true;
      try {
        URL.revokeObjectURL(blobURL);
      } catch {}
    };
  }, [file, fileId, removeFile]);

  // Derived UI values (memoized to avoid unnecessary re-renders)
  const previewUrl = useMemo(
    () => files?.[0]?.preview || initialUserImage || null,
    [files, initialUserImage]
  );
  // const fileLabel = useMemo(
  //   () => file?.name || fullName || "User avatar",
  //   [file?.name, fullName]
  // );

  return (
    <div className="flex flex-col items-start gap-2" aria-live="polite">
      <div className="flex items-center gap-3">
        {/* Avatar frame (circular, fixed size for stable layout) */}
        <div
          className="border-input relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full border bg-muted/20"
          aria-label={
            previewUrl
              ? `${fullName}'s avatar preview`
              : `${fullName}'s default avatar`
          }
        >
          {previewUrl ? (
            <NextImage
              className="size-full object-cover"
              src={previewUrl}
              alt={`${fullName}'s avatar`}
              width={40}
              height={40}
              sizes="40px"
              priority={false}
              // blob: previews render fine, but explicitly allow unoptimized just in case
              unoptimized={previewUrl.startsWith?.("blob:") ?? false}
            />
          ) : (
            <span aria-hidden="true">
              <CircleUserRoundIcon className="opacity-60" size={18} />
            </span>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={openFileDialog}
            aria-controls={inputId}
            aria-describedby={error ? `${inputId}-error` : undefined}
            className="whitespace-nowrap"
          >
            {file
              ? "Change avatar"
              : previewUrl
              ? "Change avatar"
              : "Upload avatar"}
          </Button>

          {fileId && (
            <Button
              type="button"
              variant="ghost"
              className="text-destructive hover:text-destructive"
              onClick={() => removeFile(fileId)}
            >
              Remove
            </Button>
          )}

          {/* Visually hidden input (screen-reader accessible) */}
          <input
            {...getInputProps?.()}
            id={inputId}
            className="sr-only"
            aria-label="Upload avatar file"
            aria-invalid={error ? true : false}
          />
        </div>
      </div>

      {/* File hint / errors */}
      <div className="text-xs text-muted-foreground" id={`${inputId}-hint`}>
        JPG, PNG, or WEBP • ≤ 3MB • Recommended ≥ {MIN_DIMENSION}×
        {MIN_DIMENSION}px
      </div>
      {error && (
        <div
          className="text-xs font-medium text-destructive"
          role="status"
          id={`${inputId}-error`}
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default memo(UserAvatarUploader);
