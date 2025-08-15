"use client";

import { AnimatedButton } from "@/components/animations/button-animations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MOCK_SUBSCRIPTION,
  formatCurrency,
  getDaysUntilBilling,
} from "@/lib/mocks/billing-data";
import { AlertTriangle, CheckCircle, Clock, Zap } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

export const CurrentPlanSection = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Memoize expensive calculations
  const subscription = useMemo(() => MOCK_SUBSCRIPTION, []);
  const currentPlan = useMemo(() => subscription.plan, [subscription]);
  const daysUntilBilling = useMemo(
    () => getDaysUntilBilling(subscription),
    [subscription]
  );

  // Memoize status badge to prevent re-renders
  const getStatusBadge = useCallback((status: string) => {
    const statusConfig = {
      active: {
        className: "bg-green-100 text-green-800 hover:bg-green-100",
        icon: CheckCircle,
        label: "Active",
        ariaLabel: "Subscription is currently active",
      },
      pending: {
        className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
        icon: Clock,
        label: "Pending",
        ariaLabel: "Subscription is pending activation",
      },
      cancelled: {
        className: "bg-red-100 text-red-800 hover:bg-red-100",
        icon: AlertTriangle,
        label: "Cancelled",
        ariaLabel: "Subscription has been cancelled",
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    if (!config) {
      return (
        <Badge
          variant="secondary"
          aria-label={`Subscription status: ${status}`}
        >
          {status}
        </Badge>
      );
    }

    const IconComponent = config.icon;
    return (
      <Badge className={config.className} aria-label={config.ariaLabel}>
        <IconComponent className="mr-1 h-3 w-3" aria-hidden="true" />
        {config.label}
      </Badge>
    );
  }, []);

  // Memoize event handlers to prevent unnecessary re-renders
  const handleUpgrade = useCallback(async () => {
    setIsLoading(true);
    try {
      // TODO: Implement upgrade logic
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Upgrade failed:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCancelSubscription = useCallback(async () => {
    setIsLoading(true);
    try {
      // TODO: Implement cancellation logic
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Cancellation failed:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleManageSubscription = useCallback(async () => {
    setIsLoading(true);
    try {
      // TODO: Implement subscription management
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Subscription management failed:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <section aria-labelledby="current-plan-heading">
      {/* <div className="mb-6">
        <h2
          id="current-plan-heading"
          className="text-xl font-semibold flex items-center gap-2"
        >
          <CreditCard className="h-5 w-5" aria-hidden="true" />
          Current Plan
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Your current subscription plan and billing details.
        </p>
      </div> */}

      <div className="grid gap-6">
        {/* Plan Overview Card */}
        <Card role="region" aria-labelledby="plan-overview-title">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <CardTitle id="plan-overview-title" className="text-2xl">
                    {currentPlan.displayName}
                  </CardTitle>
                  {getStatusBadge(subscription.status)}
                </div>
                <CardDescription>
                  {currentPlan.id === "free"
                    ? "Free forever plan with basic features"
                    : "Full access to all premium features"}
                </CardDescription>
              </div>
              <div
                className="text-right"
                role="group"
                aria-label="Pricing information"
              >
                <div
                  className="text-3xl font-bold"
                  aria-label={`Price: ${formatCurrency(currentPlan.price)}`}
                >
                  {formatCurrency(currentPlan.price)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {currentPlan.interval === "yearly"
                    ? "per year"
                    : currentPlan.price === 0
                    ? "forever"
                    : "per month"}
                </div>
                {subscription.status === "active" && currentPlan.price > 0 && (
                  <div
                    className="text-xs text-muted-foreground mt-1"
                    aria-live="polite"
                  >
                    Next billing: {daysUntilBilling} days
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {currentPlan.id === "free" ? (
                <AnimatedButton
                  onClick={handleUpgrade}
                  disabled={isLoading}
                  className="w-full sm:w-auto"
                  aria-describedby="upgrade-description"
                >
                  <Zap className="mr-2 h-4 w-4" aria-hidden="true" />
                  {isLoading ? "Processing..." : "Upgrade to Pro"}
                </AnimatedButton>
              ) : (
                <div
                  className="flex flex-wrap gap-2"
                  role="group"
                  aria-label="Subscription management actions"
                >
                  <AnimatedButton
                    onClick={handleManageSubscription}
                    disabled={isLoading}
                    variant="outline"
                    aria-describedby="manage-description"
                  >
                    {isLoading ? "Loading..." : "Manage Subscription"}
                  </AnimatedButton>
                  {!subscription.cancelAtPeriodEnd && (
                    <Button
                      onClick={handleCancelSubscription}
                      disabled={isLoading}
                      variant="ghost"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      aria-describedby="cancel-description"
                    >
                      {isLoading ? "Processing..." : "Cancel Subscription"}
                    </Button>
                  )}
                </div>
              )}
              {/* Screen reader descriptions */}
              <div className="sr-only">
                <div id="upgrade-description">
                  Upgrade to Pro plan for more features and higher limits
                </div>
                <div id="manage-description">
                  Access subscription management portal
                </div>
                <div id="cancel-description">
                  Cancel your subscription - takes effect at end of billing
                  period
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plan Features */}
        {/* <Card role="region" aria-labelledby="plan-features-title">
          <CardHeader>
            <CardTitle id="plan-features-title" className="text-lg">
              Plan Features
            </CardTitle>
            <CardDescription>
              What&apos;s included in your {currentPlan.displayName} plan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4" role="list" aria-label="Plan features">
              <div className="flex items-center gap-3" role="listitem">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100"
                  aria-hidden="true"
                >
                  <Zap className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">
                    {currentPlan.limits.apiCalls === -1
                      ? "Unlimited API calls"
                      : `${currentPlan.limits.apiCalls.toLocaleString()} API calls per month`}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Access to all API endpoints
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                  <Database className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">
                    {currentPlan.limits.storage === -1
                      ? "Unlimited storage"
                      : `${currentPlan.limits.storage} GB storage`}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Store your data and files
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                  {currentPlan.limits.projects === -1 ? (
                    <Infinity className="h-4 w-4 text-purple-600" />
                  ) : (
                    <span className="text-sm font-semibold text-purple-600">
                      {currentPlan.limits.projects}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-medium">
                    {currentPlan.limits.projects === -1
                      ? "Unlimited projects"
                      : `${currentPlan.limits.projects} project${
                          currentPlan.limits.projects > 1 ? "s" : ""
                        }`}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Organize your work
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100">
                  <Users className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium">
                    {currentPlan.limits.teamMembers === -1
                      ? "Unlimited team members"
                      : `${currentPlan.limits.teamMembers} team member${
                          currentPlan.limits.teamMembers > 1 ? "s" : ""
                        }`}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Collaborate with your team
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card> */}

        {/* Billing Cycle Info */}
        {subscription.status === "active" && currentPlan.price > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Billing Cycle</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current period:</span>
                  <span>
                    {subscription.currentPeriodStart.toLocaleDateString()} -{" "}
                    {subscription.currentPeriodEnd.toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Next billing date:
                  </span>
                  <span className="font-medium">
                    {subscription.currentPeriodEnd.toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-medium">
                    {formatCurrency(subscription.amount)}
                  </span>
                </div>
                {subscription.cancelAtPeriodEnd && (
                  <div className="flex justify-between text-orange-600">
                    <span>Status:</span>
                    <span className="font-medium">
                      Cancels on{" "}
                      {subscription.currentPeriodEnd.toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};
