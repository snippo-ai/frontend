"use client";

import { AnimatedButton } from "@/components/animations/button-animations";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCallback, useMemo, useRef, useState, useTransition } from "react";

import {
  MOCK_SUBSCRIPTION,
  Subscription,
  SubscriptionStatus,
  formatCurrency,
} from "@/lib/mocks/billing-data";

import Typography from "@/components/shared/typography";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Info,
  Loader2,
  Zap,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────────────────────
   Status badge
   ────────────────────────────────────────────────────────────────────────── */

const STATUS_CONFIG: Record<
  "active" | "pending" | "cancelled",
  {
    className: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    label: string;
    ariaLabel: string;
  }
> = {
  active: {
    className:
      "bg-green-100 text-green-800 ring-1 ring-inset ring-green-200 hover:bg-green-100",
    icon: CheckCircle,
    label: "Active",
    ariaLabel: "Subscription is currently active",
  },
  pending: {
    className:
      "bg-yellow-100 text-yellow-800 ring-1 ring-inset ring-yellow-200 hover:bg-yellow-100",
    icon: Clock,
    label: "Pending",
    ariaLabel: "Subscription is pending activation",
  },
  cancelled: {
    className:
      "bg-red-100 text-red-800 ring-1 ring-inset ring-red-200 hover:bg-red-100",
    icon: AlertTriangle,
    label: "Cancelled",
    ariaLabel: "Subscription has been cancelled",
  },
};

function StatusBadge({ status }: { status: SubscriptionStatus }) {
  const config = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG] ?? null;

  if (!config) {
    return (
      <Badge variant="secondary" aria-label={`Subscription status: ${status}`}>
        {status}
      </Badge>
    );
  }

  const Icon = config.icon;
  return (
    <Badge className={config.className} aria-label={config.ariaLabel}>
      <Icon className="mr-1 h-3 w-3" aria-hidden="true" />
      {config.label}
    </Badge>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Utils
   ────────────────────────────────────────────────────────────────────────── */

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

function getCycleProgress(start: Date, end: Date) {
  const now = new Date().getTime();
  const s = start.getTime();
  const e = end.getTime();
  if (now <= s) return 0;
  if (now >= e) return 100;
  return Math.round(((now - s) / (e - s)) * 100);
}

// function formatDaysLabel(n: number) {
//   return `${n} ${n === 1 ? "day" : "days"}`;
// }

export const CurrentPlanSection = () => {
  const subscription: Subscription = MOCK_SUBSCRIPTION;
  const { plan: currentPlan } = subscription;

  // const daysUntilBilling = useMemo(
  //   () => getDaysUntilBilling(subscription),
  //   [subscription]
  // );
  const cyclePct = useMemo(
    () =>
      getCycleProgress(
        subscription.currentPeriodStart,
        subscription.currentPeriodEnd
      ),
    [subscription.currentPeriodStart, subscription.currentPeriodEnd]
  );

  const isPaidPlan = currentPlan.price > 0;
  const isActive = subscription.status === "active";
  const isYearly = currentPlan.interval === "yearly";
  const perMonthEquivalent =
    isYearly && currentPlan.price > 0 ? currentPlan.price / 12 : null;

  // Async UX
  const [isPending, startTransition] = useTransition();
  const [action, setAction] = useState<null | "upgrade" | "manage" | "cancel">(
    null
  );
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const liveRegionRef = useRef<HTMLDivElement>(null);

  // Minimal toast fallback — plug your toast system here if available
  const toast = (opts: {
    title?: string;
    description?: string;
    variant?: "destructive" | "default";
  }) => {
    const prefix = opts.variant === "destructive" ? "ERROR" : "INFO";
    console[opts.variant === "destructive" ? "error" : "log"](
      `${prefix}: ${opts.title ?? ""} ${opts.description ?? ""}`.trim()
    );
  };

  const runAction = useCallback(
    (label: "upgrade" | "manage" | "cancel", fn: () => Promise<void>) => {
      if (isPending) return;
      setAction(label);
      startTransition(async () => {
        try {
          liveRegionRef.current?.setAttribute(
            "data-message",
            `${label} started`
          );
          await fn();
          toast({
            title: "Done",
            description:
              label === "upgrade"
                ? "Your plan has been upgraded."
                : label === "manage"
                ? "Opening your subscription management portal."
                : "Your subscription will cancel at the end of the period.",
          });
          liveRegionRef.current?.setAttribute(
            "data-message",
            `${label} completed`
          );
        } catch (err: unknown) {
          const msg =
            err instanceof Error ? err.message : "Something went wrong.";
          toast({
            title: "Action failed",
            description: msg,
            variant: "destructive",
          });
          console.error(`[${label.toUpperCase()}]`, err);
          liveRegionRef.current?.setAttribute(
            "data-message",
            `${label} failed`
          );
        } finally {
          setAction(null);
        }
      });
    },
    [isPending]
  );

  // Handlers (replace sleeps with real API calls)
  const handleUpgrade = useCallback(() => {
    return runAction("upgrade", async () => {
      await sleep(900);
      // await upgradePlan()
    });
  }, [runAction]);

  const handleManageSubscription = useCallback(() => {
    return runAction("manage", async () => {
      await sleep(500);
      // window.location.href = portalUrl
    });
  }, [runAction]);

  const handleCancelSubscription = useCallback(() => {
    return runAction("cancel", async () => {
      await sleep(900);
      // await cancelAtPeriodEnd()
    });
  }, [runAction]);

  return (
    <section aria-labelledby="current-plan-heading">
      {/* Live region for screen readers */}
      <div ref={liveRegionRef} aria-live="polite" className="sr-only" />

      <div className="grid gap-6">
        {/* Overview */}
        <Card role="region" aria-labelledby="plan-overview-title">
          <CardHeader className="">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="">
                  <div className="flex items-center gap-2">
                    <CardTitle id="plan-overview-title" className="text-2xl">
                      {currentPlan.displayName}
                    </CardTitle>
                    <StatusBadge status={subscription.status} />
                    {isYearly && isPaidPlan ? (
                      <Badge
                        variant="outline"
                        className="border-blue-200 text-blue-700"
                      >
                        Yearly plan
                      </Badge>
                    ) : null}
                  </div>
                  <Typography
                    as="p"
                    fluidSize="xs"
                    className="text-muted-foreground"
                  >
                    {currentPlan.id === "free"
                      ? "Free forever plan with essential features to get started."
                      : "Full access to all premium features for teams that need more."}
                  </Typography>
                </div>

                {/* Price block */}
                <div className="text-right">
                  <div
                    className="text-3xl font-bold leading-none"
                    aria-label={`Price: ${formatCurrency(currentPlan.price)}`}
                  >
                    {formatCurrency(currentPlan.price)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {isYearly
                      ? "per year"
                      : isPaidPlan
                      ? "per month"
                      : "forever"}
                  </div>

                  {isYearly && perMonthEquivalent ? (
                    <div className="mt-1 text-xs text-muted-foreground">
                      ≈ {formatCurrency(perMonthEquivalent)} / mo
                    </div>
                  ) : null}

                  {/* {isActive && isPaidPlan ? (
                    <div className="text-xs text-muted-foreground mt-2">
                      Next billing in {formatDaysLabel(daysUntilBilling)}
                    </div>
                  ) : null} */}
                </div>
              </div>
            </div>
          </CardHeader>

          <Separator className="opacity-60" />

          <CardContent className="">
            {/* Billing progress (only paid + active) */}
            {isActive && isPaidPlan ? (
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>Current cycle</span>
                  <span>{cyclePct}% used</span>
                </div>
                <div
                  className="h-2 w-full rounded-full bg-muted relative overflow-hidden"
                  role="progressbar"
                  aria-valuenow={cyclePct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-primary transition-[width] duration-500"
                    style={{ width: `${cyclePct}%` }}
                  />
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {subscription.currentPeriodStart.toLocaleDateString()}
                  </span>
                  <span>
                    {subscription.currentPeriodEnd.toLocaleDateString()}
                  </span>
                </div>
              </div>
            ) : null}

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              {currentPlan.id === "free" ? (
                <AnimatedButton
                  onClick={handleUpgrade}
                  disabled={isPending}
                  className="w-full sm:w-auto"
                  aria-describedby="upgrade-description"
                  aria-busy={action === "upgrade"}
                >
                  {action === "upgrade" ? (
                    <>
                      <Loader2
                        className="mr-2 h-4 w-4 animate-spin"
                        aria-hidden="true"
                      />
                      Upgrading…
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-4 w-4" aria-hidden="true" />
                      Upgrade to Pro
                    </>
                  )}
                </AnimatedButton>
              ) : (
                <div
                  className="flex flex-wrap gap-2"
                  role="group"
                  aria-label="Subscription management actions"
                >
                  <AnimatedButton
                    onClick={handleManageSubscription}
                    disabled={isPending}
                    variant="outline"
                    aria-describedby="manage-description"
                    aria-busy={action === "manage"}
                  >
                    {action === "manage" ? (
                      <>
                        <Loader2
                          className="mr-2 h-4 w-4 animate-spin"
                          aria-hidden="true"
                        />
                        Opening…
                      </>
                    ) : (
                      <>Manage Subscription</>
                    )}
                  </AnimatedButton>

                  {!subscription.cancelAtPeriodEnd && (
                    <>
                      <Button
                        onClick={() => setShowCancelDialog(true)}
                        disabled={isPending}
                        variant="ghost"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        aria-describedby="cancel-description"
                      >
                        {action === "cancel" ? (
                          <>
                            <Loader2
                              className="mr-2 h-4 w-4 animate-spin"
                              aria-hidden="true"
                            />
                            Cancelling…
                          </>
                        ) : (
                          <>Cancel Subscription</>
                        )}
                      </Button>

                      {/* Confirm dialog */}
                      <AlertDialog
                        open={showCancelDialog}
                        onOpenChange={setShowCancelDialog}
                      >
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Cancel subscription?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Your access will remain until{" "}
                              {subscription.currentPeriodEnd.toLocaleDateString()}
                              . You can resume any time before that date.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel disabled={isPending}>
                              Keep plan
                            </AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                              onClick={() => {
                                setShowCancelDialog(false);
                                handleCancelSubscription();
                              }}
                            >
                              Confirm cancel
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </>
                  )}
                </div>
              )}

              {/* Screen reader descriptions */}
              <div className="sr-only">
                <div id="upgrade-description">
                  Upgrade to the Pro plan for additional features and higher
                  limits.
                </div>
                <div id="manage-description">
                  Open the subscription management portal.
                </div>
                <div id="cancel-description">
                  Cancel your subscription; it will take effect at the end of
                  the current billing period.
                </div>
              </div>

              {/* Helpful tip */}
              <TooltipProvider>
                <Tooltip delayDuration={250}>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition"
                      aria-label="More information about billing"
                    >
                      <Info className="h-3.5 w-3.5" />
                      Billing help
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs text-xs leading-relaxed">
                    Need help with invoices, refunds, or VAT/GST? Open the
                    subscription portal via “Manage Subscription”.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardContent>
        </Card>

        {/* Billing Cycle Card (explicit details) */}
        {/* {isActive && isPaidPlan ? (
          <Card role="region" aria-labelledby="billing-cycle-title">
            <CardHeader>
              <CardTitle id="billing-cycle-title" className="text-lg">
                Billing details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current period</span>
                  <span>
                    {subscription.currentPeriodStart.toLocaleDateString()} –{" "}
                    {subscription.currentPeriodEnd.toLocaleDateString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Next billing date
                  </span>
                  <span className="font-medium">
                    {subscription.currentPeriodEnd.toLocaleDateString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-medium">
                    {formatCurrency(subscription.amount)}
                  </span>
                </div>

                {subscription.cancelAtPeriodEnd ? (
                  <div className="flex justify-between text-orange-600">
                    <span>Status</span>
                    <span className="font-medium">
                      Cancels on{" "}
                      {subscription.currentPeriodEnd.toLocaleDateString()}
                    </span>
                  </div>
                ) : null}
              </div>
            </CardContent>
          </Card>
        ) : (
          // Empty/edge state for free plans or inactive subs
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">You’re on the free plan</CardTitle>
              <CardDescription>
                Upgrade to unlock premium features and higher limits.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AnimatedButton
                onClick={handleUpgrade}
                disabled={isPending}
                aria-busy={action === "upgrade"}
              >
                {action === "upgrade" ? (
                  <>
                    <Loader2
                      className="mr-2 h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />
                    Upgrading…
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" aria-hidden="true" />
                    Upgrade to Pro
                  </>
                )}
              </AnimatedButton>
            </CardContent>
          </Card>
        )} */}
      </div>
    </section>
  );
};
