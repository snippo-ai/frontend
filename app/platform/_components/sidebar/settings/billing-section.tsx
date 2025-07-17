"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  AlertTriangle,
  Calendar,
  CalendarIcon,
  CheckCircle,
  Clock,
  CreditCard,
  CreditCardIcon,
  DollarSign,
  Download,
  UserIcon,
} from "lucide-react";
import { User as UserType } from "next-auth";
import { useState } from "react";
import MainContentHeader from "./main-content-header";

interface BillingFormProps {
  user: UserType;
}

export const BillingForm = ({ user }: BillingFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  // Mock subscription data - replace with actual data from your backend
  const subscription = user.subscription || {
    plan: "Free",
    status: "active",
    razorpaySubscriptionId: "",
    razorpayCustomerId: "",
  };

  const getPlanDisplayName = (plan: string) => {
    switch (plan) {
      case "plan_QkMj84RI3NKDCj":
        return "Pro Monthly";
      case "plan_yearly":
        return "Pro Yearly";
      default:
        return "Free";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="mr-1 h-3 w-3" />
            Active
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <AlertTriangle className="mr-1 h-3 w-3" />
            Cancelled
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleUpgrade = async () => {
    setIsLoading(true);
    // TODO: Implement upgrade logic
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleCancelSubscription = async () => {
    setIsLoading(true);
    // TODO: Implement cancellation logic
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-8">
      {/* Current Plan Section */}
      <section>
        <MainContentHeader
          title="Current Plan"
          description="Your current subscription plan and billing details."
          icon={CreditCardIcon}
        />
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border bg-muted/20 gap-4">
            <div className="space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <h3 className="font-semibold text-lg">
                  {getPlanDisplayName(subscription.plan)}
                </h3>
                {getStatusBadge(subscription.status)}
              </div>
              <p className="text-sm text-muted-foreground">
                {subscription.plan === "Free"
                  ? "Free forever plan with basic features"
                  : "Full access to all premium features"}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">
                {subscription.plan === "Free" ? "₹0" : "₹249"}
              </div>
              <div className="text-sm text-muted-foreground">
                {subscription.plan === "Free" ? "Forever" : "per month"}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            {subscription.plan === "Free" ? (
              <Button
                onClick={handleUpgrade}
                disabled={isLoading}
                className="w-full sm:w-auto"
              >
                {isLoading ? "Upgrading..." : "Upgrade to Pro"}
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={handleCancelSubscription}
                disabled={isLoading}
                className="w-full sm:w-auto"
              >
                {isLoading ? "Cancelling..." : "Cancel Subscription"}
              </Button>
            )}
          </div>
        </div>
      </section>

      <Separator />

      {/* Billing Information */}
      <section>
        <MainContentHeader
          title="Billing Information"
          description="Your billing address and contact information."
          icon={UserIcon}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <p className="text-sm text-muted-foreground">
              {user.firstName} {user.lastName}
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          {user.phoneNumber && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <p className="text-sm text-muted-foreground">
                {user.phoneNumber}
              </p>
            </div>
          )}
        </div>
      </section>

      <Separator />

      {/* Payment Methods */}
      <section>
        <MainContentHeader
          title="Payment Methods"
          description="Manage your payment methods and billing preferences."
          icon={CreditCardIcon}
        />
        {subscription.plan === "Free" ? (
          <div className="text-center py-8">
            <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No payment methods required for free plan.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border gap-3">
              <div className="flex items-center gap-3">
                <div className="h-8 w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">VISA</span>
                </div>
                <div>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-sm text-muted-foreground">Expires 12/25</p>
                </div>
              </div>
              <Badge variant="secondary" className="self-start sm:self-center">
                Default
              </Badge>
            </div>
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              Add Payment Method
            </Button>
          </div>
        )}
      </section>

      <Separator />

      {/* Billing History */}
      <section>
        <MainContentHeader
          title="Billing History"
          description="View and download your past invoices and receipts."
          icon={CalendarIcon}
        />
        {subscription.plan === "Free" ? (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No billing history for free plan.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border gap-3">
              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-medium">Pro Monthly Plan</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-center">
                <span className="font-medium">₹249</span>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border gap-3">
              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-medium">Pro Monthly Plan</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(
                      Date.now() - 30 * 24 * 60 * 60 * 1000
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-center">
                <span className="font-medium">₹249</span>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Subscription Details */}
      {subscription.plan !== "Free" && (
        <>
          <Separator />
          <section>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Subscription Details</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Technical details about your subscription.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                <span className="text-sm font-medium">Subscription ID</span>
                <span className="text-sm text-muted-foreground font-mono break-all">
                  {subscription.razorpaySubscriptionId || "N/A"}
                </span>
              </div>
              <Separator />
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                <span className="text-sm font-medium">Customer ID</span>
                <span className="text-sm text-muted-foreground font-mono break-all">
                  {subscription.razorpayCustomerId || "N/A"}
                </span>
              </div>
              <Separator />
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                <span className="text-sm font-medium">Plan ID</span>
                <span className="text-sm text-muted-foreground font-mono break-all">
                  {subscription.plan}
                </span>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};
