"use client";

import Typography from "@/components/shared/typography";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MOCK_PAYMENT_METHODS } from "@/lib/mocks/billing-data";
import { CreditCard as CreditCardIcon, Plus } from "lucide-react";
import { useCallback, useMemo, useRef, useState, useTransition } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { toast } from "sonner";
import MainContentHeader from "../../_components/main-content-header";

// function maskNumber(cardNumber: string) {
//   const first4 = cardNumber.slice(0, 4);
//   const last4 = cardNumber.slice(-4);

//   return `${first4} •••• •••• ${last4}`;
// }

function expiryLabel(month: number, year: number) {
  return `${month.toString().padStart(2, "0")}/${year}`;
}

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const SavedCardsSection = () => {
  const paymentMethods = useMemo(() => MOCK_PAYMENT_METHODS, []);

  // Async UX
  const [isPending, startTransition] = useTransition();
  const [, setActiveAction] = useState<null | {
    type: "add" | "default" | "remove";
    id?: string;
  }>(null);
  const [confirmRemoveId, setConfirmRemoveId] = useState<string | null>(null);
  const liveRef = useRef<HTMLDivElement>(null);

  const runAction = useCallback(
    (
      payload: { type: "add" | "default" | "remove"; id?: string },
      fn: () => Promise<void>
    ) => {
      if (isPending) return;
      setActiveAction(payload);
      startTransition(async () => {
        try {
          liveRef.current?.setAttribute(
            "data-message",
            `${payload.type} started`
          );
          await fn();
          toast.success("Success", {
            description:
              payload.type === "add"
                ? "Payment method added."
                : payload.type === "default"
                ? "Default payment method updated."
                : "Payment method removed.",
          });
          liveRef.current?.setAttribute(
            "data-message",
            `${payload.type} completed`
          );
        } catch (e: unknown) {
          const msg = e instanceof Error ? e.message : "Something went wrong.";
          toast.error("Action failed", {
            description: msg,
          });
          console.error(`[${payload.type.toUpperCase()}]`, e);
          liveRef.current?.setAttribute(
            "data-message",
            `${payload.type} failed`
          );
        } finally {
          setActiveAction(null);
        }
      });
    },
    [isPending]
  );

  // const handleAddPaymentMethod = useCallback(() => {
  //   runAction({ type: "add" }, async () => {
  //     // TODO: open secure form / Stripe Elements sheet
  //     await sleep(900);
  //   });
  // }, [runAction]);

  // const handleSetDefault = useCallback(
  //   (id: string) => {
  //     runAction({ type: "default", id }, async () => {
  //       // TODO: call backend to set default
  //       await sleep(600);
  //     });
  //   },
  //   [runAction]
  // );

  const handleRemove = useCallback(
    (id: string) => {
      runAction({ type: "remove", id }, async () => {
        // TODO: call backend to detach payment method
        await sleep(900);
      });
    },
    [runAction]
  );

  return (
    <section aria-labelledby="payment-methods-heading" className="mt-4">
      {/* Screen reader live updates */}
      <div ref={liveRef} aria-live="polite" className="sr-only" />
      <MainContentHeader
        title="Saved Cards"
        description="Manage your payment methods and billing preferences."
        icon={CreditCardIcon}
      />
      <Separator className="my-4 mb-6" />
      <div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        role="list"
        aria-label="Saved cards"
      >
        <Card
          role="listitem"
          aria-labelledby="add-payment-title"
          className="border-dashed transition hover:border-foreground/30 focus-within:border-foreground/30 p-0 cursor-pointer"
        >
          <CardContent className="flex h-full flex-col items-center justify-center p-0">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4"
              aria-hidden="true"
            >
              <Plus className="h-6 w-6 text-muted-foreground" />
            </div>
            <Typography
              as="h3"
              id="add-payment-title"
              className="font-medium mb-2"
            >
              Add Card
            </Typography>
            <Typography
              as="p"
              fluidSize="sm"
              className="text-muted-foreground text-center mb-4"
            >
              Add a new credit/debit card to your account.
            </Typography>
            <Typography
              as="div"
              id="add-payment-description"
              className="sr-only"
            >
              Opens a secure form to add a new payment method to your account.
            </Typography>
          </CardContent>
        </Card>

        {paymentMethods.map((pm) => {
          const customerName = pm.holderName;
          const cardNumber = pm.cardNumber;
          const expiryMonth = pm.expiryMonth;
          const expiryYear = pm.expiryYear;
          // const isDefaultCard = pm.isDefault;

          return (
            <div
              key={pm.id}
              className="relative group rounded-xl overflow-hidden user-cards-dashboard"
            >
              <Cards
                number={cardNumber}
                expiry={expiryLabel(expiryMonth, expiryYear)}
                cvc={""}
                locale={{ valid: "Expiry" }}
                name={customerName}
                focused="name"
                preview
              />
              {/* <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-transparent -translate-y-full group-hover:translate-y-0 transition-200">
                <div className="flex items-center justify-between gap-2 px-4 py-2">
                  {isDefaultCard ? (
                    <>
                      <Badge variant="success" className="font-medium">
                        <CheckCircleIcon className="mr-0.5 h-3 w-3" /> Default
                      </Badge>
                    </>
                  ) : (
                    <>
                      <Badge
                        className="font-medium cursor-pointer"
                        onClick={() => handleSetDefault(pm.id)}
                      >
                        {isPending ? (
                          <Spinner />
                        ) : (
                          <>
                            <ShieldCheckIcon className="mr-0.5 h-3 w-3" /> Set
                            Default
                          </>
                        )}
                      </Badge>
                      <Badge
                        variant="destructive"
                        className="font-medium cursor-pointer"
                        onClick={() => setConfirmRemoveId(pm.id)}
                      >
                        <TrashIcon className="mr-0.5 h-3 w-3" /> Remove
                      </Badge>
                    </>
                  )}
                </div>
              </div> */}
            </div>
          );
        })}
      </div>

      {/* Confirm removal dialog */}
      <AlertDialog
        open={!!confirmRemoveId}
        onOpenChange={(open) => !open && setConfirmRemoveId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove this card?</AlertDialogTitle>
            <AlertDialogDescription>
              You won’t be charged on this card anymore. This action can’t be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
              onClick={() => {
                const id = confirmRemoveId!;
                setConfirmRemoveId(null);
                handleRemove(id);
              }}
            >
              Remove card
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};
