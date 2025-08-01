// ConfirmDialog.tsx
import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import Spinner from "./spinner";

interface ConfirmDialogProps {
  open: boolean;
  title?: React.ReactNode;
  description?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  confirmButtonProps?: React.ComponentProps<"button">;
  cancelButtonProps?: React.ComponentProps<"button">;
  onConfirm: () => Promise<void> | void;
  onCancel: () => void;
  loading?: boolean;
  danger?: boolean;
}

export function ConfirmDialog({
  open,
  title = "Are you sure?",
  description,
  confirmText = "OK",
  cancelText = "Cancel",
  confirmButtonProps,
  cancelButtonProps,
  onConfirm,
  onCancel,
  loading = false,
  danger = false,
}: ConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={(v) => !v && onCancel()}>
      <AlertDialogOverlay className="bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5" />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            size="sm"
            variant="outline"
            type="button"
            onClick={onCancel}
            {...cancelButtonProps}
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button
            size="sm"
            type="button"
            onClick={onConfirm}
            variant={danger ? "destructive" : "outline"}
            {...confirmButtonProps}
            className="gap-2"
            disabled={loading}
          >
            {loading && <Spinner />} {confirmText}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
