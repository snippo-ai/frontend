"use client";

import { AnimatedButton } from "@/components/animations/button-animations";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  MOCK_BILLING_ADDRESS,
  MOCK_SUBSCRIPTION,
} from "@/lib/mocks/billing-data";
import {
  Building,
  Edit,
  FileText,
  Mail,
  MapPin,
  Phone,
  Save,
  Settings,
  X,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";

export const SubscriptionDetailsSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [billingAddress, setBillingAddress] = useState(MOCK_BILLING_ADDRESS);

  // Memoize subscription data
  const subscription = useMemo(() => MOCK_SUBSCRIPTION, []);

  // Memoize event handlers to prevent unnecessary re-renders
  const handleSaveAddress = useCallback(async () => {
    setIsLoading(true);
    try {
      // TODO: Implement save billing address logic
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsEditingAddress(false);
    } catch (error) {
      console.error("Failed to save billing address:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCancelEdit = useCallback(() => {
    setBillingAddress(MOCK_BILLING_ADDRESS);
    setIsEditingAddress(false);
  }, []);

  const handlePauseSubscription = useCallback(async () => {
    setIsLoading(true);
    try {
      // TODO: Implement pause subscription logic
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Failed to pause subscription:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // const handleResumeSubscription = useCallback(async () => {
  //   setIsLoading(true);
  //   try {
  //     // TODO: Implement resume subscription logic
  //     await new Promise(resolve => setTimeout(resolve, 1000));
  //   } catch (error) {
  //     console.error('Failed to resume subscription:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, []);

  // Memoize address field handlers
  const handleAddressFieldChange = useCallback(
    (field: string, value: string) => {
      setBillingAddress((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  if (subscription.plan.id === "free") {
    return null; // Don't show subscription details for free plan
  }

  return (
    <section aria-labelledby="subscription-details-heading">
      <div className="mb-6">
        <h2
          id="subscription-details-heading"
          className="text-xl font-semibold flex items-center gap-2"
        >
          <Settings className="h-5 w-5" aria-hidden="true" />
          Subscription Details
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Technical details and billing information for your subscription.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Billing Address */}
        <Card role="region" aria-labelledby="billing-address-title">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle
                  id="billing-address-title"
                  className="text-lg flex items-center gap-2"
                >
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                  Billing Address
                </CardTitle>
                <CardDescription>
                  Address used for billing and tax calculations
                </CardDescription>
              </div>
              {!isEditingAddress && (
                <Button
                  onClick={() => setIsEditingAddress(true)}
                  variant="outline"
                  size="sm"
                  aria-describedby="edit-address-description"
                >
                  <Edit className="mr-2 h-4 w-4" aria-hidden="true" />
                  Edit
                </Button>
              )}
              <div id="edit-address-description" className="sr-only">
                Edit your billing address information
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isEditingAddress ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveAddress();
                }}
                aria-labelledby="billing-form-title"
              >
                <div id="billing-form-title" className="sr-only">
                  Edit Billing Address Form
                </div>
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={billingAddress.name}
                        onChange={(e) =>
                          handleAddressFieldChange("name", e.target.value)
                        }
                        required
                        aria-describedby="name-help"
                      />
                      <div id="name-help" className="sr-only">
                        Enter your full legal name as it appears on your payment
                        method
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={billingAddress.email}
                        onChange={(e) =>
                          handleAddressFieldChange("email", e.target.value)
                        }
                        required
                        aria-describedby="email-help"
                      />
                      <div id="email-help" className="sr-only">
                        Email address for billing notifications
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={billingAddress.phone}
                        onChange={(e) =>
                          setBillingAddress({
                            ...billingAddress,
                            phone: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="gstin">GSTIN (Optional)</Label>
                      <Input
                        id="gstin"
                        value={billingAddress.gstin || ""}
                        onChange={(e) =>
                          setBillingAddress({
                            ...billingAddress,
                            gstin: e.target.value,
                          })
                        }
                        placeholder="For Indian businesses"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address1">Address Line 1</Label>
                    <Input
                      id="address1"
                      value={billingAddress.addressLine1}
                      onChange={(e) =>
                        setBillingAddress({
                          ...billingAddress,
                          addressLine1: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="address2">Address Line 2 (Optional)</Label>
                    <Input
                      id="address2"
                      value={billingAddress.addressLine2 || ""}
                      onChange={(e) =>
                        setBillingAddress({
                          ...billingAddress,
                          addressLine2: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={billingAddress.city}
                        onChange={(e) =>
                          setBillingAddress({
                            ...billingAddress,
                            city: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={billingAddress.state}
                        onChange={(e) =>
                          setBillingAddress({
                            ...billingAddress,
                            state: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        value={billingAddress.postalCode}
                        onChange={(e) =>
                          setBillingAddress({
                            ...billingAddress,
                            postalCode: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={billingAddress.country}
                      onChange={(e) =>
                        setBillingAddress({
                          ...billingAddress,
                          country: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div
                    className="flex gap-2 pt-2"
                    role="group"
                    aria-label="Form actions"
                  >
                    <AnimatedButton
                      type="submit"
                      disabled={isLoading}
                      aria-describedby="save-address-description"
                    >
                      <Save className="mr-2 h-4 w-4" aria-hidden="true" />
                      {isLoading ? "Saving..." : "Save Changes"}
                    </AnimatedButton>
                    <Button
                      type="button"
                      onClick={handleCancelEdit}
                      variant="outline"
                      disabled={isLoading}
                      aria-describedby="cancel-edit-description"
                    >
                      <X className="mr-2 h-4 w-4" aria-hidden="true" />
                      Cancel
                    </Button>
                    {/* Screen reader descriptions */}
                    <div className="sr-only">
                      <div id="save-address-description">
                        Save the updated billing address information
                      </div>
                      <div id="cancel-edit-description">
                        Cancel editing and discard changes
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Building className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">{billingAddress.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {billingAddress.addressLine1}
                      {billingAddress.addressLine2 &&
                        `, ${billingAddress.addressLine2}`}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {billingAddress.city}, {billingAddress.state}{" "}
                      {billingAddress.postalCode}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {billingAddress.country}
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{billingAddress.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{billingAddress.phone}</span>
                </div>
                {billingAddress.gstin && (
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      GSTIN: {billingAddress.gstin}
                    </span>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Subscription Management */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Subscription Management</CardTitle>
            <CardDescription>
              Advanced subscription controls and options
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div>
                  <h3 className="font-medium">Pause Subscription</h3>
                  <p className="text-sm text-muted-foreground">
                    Temporarily pause your subscription without losing data
                  </p>
                </div>
                <Button
                  onClick={handlePauseSubscription}
                  disabled={isLoading}
                  variant="outline"
                >
                  {isLoading ? "Processing..." : "Pause"}
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div>
                  <h3 className="font-medium">Auto-renewal</h3>
                  <p className="text-sm text-muted-foreground">
                    {subscription.cancelAtPeriodEnd
                      ? "Subscription will not renew automatically"
                      : "Subscription will renew automatically"}
                  </p>
                </div>
                <Button variant="outline" disabled={isLoading}>
                  {subscription.cancelAtPeriodEnd ? "Enable" : "Disable"}
                </Button>
              </div>

              <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-100 mt-0.5">
                    <FileText className="h-3 w-3 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-yellow-900">
                      Important Notes
                    </h3>
                    <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                      <li>
                        • Pausing subscription will stop billing but preserve
                        your data
                      </li>
                      <li>• You can resume your subscription at any time</li>
                      <li>
                        • Cancellation takes effect at the end of current
                        billing period
                      </li>
                      <li>• Contact support for custom billing arrangements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
