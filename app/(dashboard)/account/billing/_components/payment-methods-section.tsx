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
import { Separator } from "@/components/ui/separator";
import { MOCK_PAYMENT_METHODS } from "@/lib/mocks/billing-data";
import { Check, CreditCard, MoreVertical, Plus, Shield } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import MainContentHeader from "../../_components/main-content-header";

export const PaymentMethodsSection = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Memoize payment methods data
  const paymentMethods = useMemo(() => MOCK_PAYMENT_METHODS, []);

  // Memoize event handlers to prevent unnecessary re-renders
  const handleAddPaymentMethod = useCallback(async () => {
    setIsLoading(true);
    try {
      // TODO: Implement add payment method logic
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Failed to add payment method:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSetDefault = useCallback(async (paymentMethodId: string) => {
    setIsLoading(true);
    try {
      // TODO: Implement set default payment method logic
      console.log("Setting default payment method:", paymentMethodId);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Failed to set default payment method:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleRemovePaymentMethod = useCallback(
    async (paymentMethodId: string) => {
      setIsLoading(true);
      try {
        // TODO: Implement remove payment method logic
        console.log("Removing payment method:", paymentMethodId);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error("Failed to remove payment method:", error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Memoize utility functions
  const getBrandIcon = useCallback((brand: string) => {
    // In a real app, you'd use actual brand icons
    return <CreditCard className="h-4 w-4" aria-label={`${brand} card`} />;
  }, []);

  const formatCardNumber = useCallback((last4: string) => {
    return `•••• •••• •••• ${last4}`;
  }, []);

  return (
    <section aria-labelledby="payment-methods-heading" className="mt-4">
      <MainContentHeader
        title="Payment Methods"
        description="Manage your payment methods and billing preferences."
        icon={CreditCard}
      />
      <Separator className="my-4 mb-6" />

      <div className="space-y-4">
        {/* Add Payment Method Button */}
        <Card
          className="border-dashed"
          role="region"
          aria-labelledby="add-payment-title"
        >
          <CardContent className="flex flex-col items-center justify-center py-8">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4"
              aria-hidden="true"
            >
              <Plus className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 id="add-payment-title" className="font-medium mb-2">
              Add Payment Method
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Add a new credit card or payment method to your account.
            </p>
            <AnimatedButton
              onClick={handleAddPaymentMethod}
              disabled={isLoading}
              variant="outline"
              aria-describedby="add-payment-description"
            >
              <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
              {isLoading ? "Adding..." : "Add Payment Method"}
            </AnimatedButton>
            <div id="add-payment-description" className="sr-only">
              Opens a secure form to add a new payment method to your account
            </div>
          </CardContent>
        </Card>

        {/* Existing Payment Methods */}
        {paymentMethods.length > 0 && (
          <div role="region" aria-labelledby="existing-methods-title">
            <h3 id="existing-methods-title" className="sr-only">
              Your Payment Methods
            </h3>
            {paymentMethods.map((method) => (
              <Card
                key={method.id}
                role="article"
                aria-labelledby={`method-${method.id}-title`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted"
                        aria-hidden="true"
                      >
                        {getBrandIcon(method.brand)}
                      </div>
                      <div>
                        <CardTitle
                          id={`method-${method.id}-title`}
                          className="text-base flex items-center gap-2"
                        >
                          {method.brand} {formatCardNumber(method.last4)}
                          {method.isDefault && (
                            <Badge
                              variant="secondary"
                              className="text-xs"
                              aria-label="This is your default payment method"
                            >
                              <Check
                                className="mr-1 h-3 w-3"
                                aria-hidden="true"
                              />
                              Default
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription>
                          Expires{" "}
                          {method.expiryMonth.toString().padStart(2, "0")}/
                          {method.expiryYear}
                        </CardDescription>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      aria-label={`More options for ${method.brand} ending in ${method.last4}`}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      <p>Cardholder: {method.holderName}</p>
                      <p className="flex items-center gap-1 mt-1">
                        <Shield className="h-3 w-3" aria-hidden="true" />
                        Secured by 256-bit SSL encryption
                      </p>
                    </div>
                    <div
                      className="flex gap-2"
                      role="group"
                      aria-label={`Actions for ${method.brand} ending in ${method.last4}`}
                    >
                      {!method.isDefault && (
                        <Button
                          onClick={() => handleSetDefault(method.id)}
                          disabled={isLoading}
                          variant="outline"
                          size="sm"
                          aria-describedby={`set-default-${method.id}-description`}
                        >
                          {isLoading ? "Setting..." : "Set as Default"}
                        </Button>
                      )}
                      <Button
                        onClick={() => handleRemovePaymentMethod(method.id)}
                        disabled={isLoading || method.isDefault}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        aria-describedby={`remove-${method.id}-description`}
                      >
                        {isLoading ? "Removing..." : "Remove"}
                      </Button>
                      {/* Screen reader descriptions */}
                      <div className="sr-only">
                        <div id={`set-default-${method.id}-description`}>
                          Make this payment method your default for future
                          billing
                        </div>
                        <div id={`remove-${method.id}-description`}>
                          {method.isDefault
                            ? "Cannot remove default payment method. Set another as default first."
                            : "Remove this payment method from your account"}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Supported Payment Methods */}
        {/* <Card>
          <CardHeader>
            <CardTitle className="text-lg">Supported Payment Methods</CardTitle>
            <CardDescription>
              We accept the following payment methods
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 p-3 rounded-lg border">
                <CreditCard className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">Visa</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg border">
                <CreditCard className="h-5 w-5 text-red-600" />
                <span className="text-sm font-medium">Mastercard</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg border">
                <CreditCard className="h-5 w-5 text-blue-800" />
                <span className="text-sm font-medium">American Express</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg border">
                <CreditCard className="h-5 w-5 text-orange-600" />
                <span className="text-sm font-medium">RuPay</span>
              </div>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-muted">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> UPI and Net Banking options are available
                during checkout. International cards are supported for global
                customers.
              </p>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </section>
  );
};
