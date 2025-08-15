"use client";

import { AnimatedButton } from "@/components/animations/button-animations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MOCK_INVOICES, formatCurrency } from "@/lib/mocks/billing-data";
import {
  CheckCircle,
  Clock,
  Download,
  Filter,
  Receipt,
  RotateCcw,
  Search,
  XCircle,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";

export const BillingHistorySection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Memoize invoices data
  const invoices = useMemo(() => MOCK_INVOICES, []);

  // Memoize event handlers to prevent unnecessary re-renders
  const handleDownloadInvoice = useCallback(async (invoiceId: string) => {
    setIsLoading(true);
    try {
      // TODO: Implement invoice download logic
      console.log("Downloading invoice:", invoiceId);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Failed to download invoice:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDownloadAll = useCallback(async () => {
    setIsLoading(true);
    try {
      // TODO: Implement download all invoices logic
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Failed to download all invoices:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Memoize utility functions for performance
  const getStatusBadge = useCallback((status: string) => {
    const statusLabels = {
      paid: "Payment completed successfully",
      pending: "Payment is being processed",
      failed: "Payment failed or was declined",
      refunded: "Payment was refunded",
    };

    switch (status) {
      case "paid":
        return (
          <Badge
            className="bg-green-100 text-green-800 hover:bg-green-100"
            aria-label={statusLabels.paid}
          >
            <CheckCircle className="mr-1 h-3 w-3" aria-hidden="true" />
            Paid
          </Badge>
        );
      case "pending":
        return (
          <Badge
            className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
            aria-label={statusLabels.pending}
          >
            <Clock className="mr-1 h-3 w-3" aria-hidden="true" />
            Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge
            className="bg-red-100 text-red-800 hover:bg-red-100"
            aria-label={statusLabels.failed}
          >
            <XCircle className="mr-1 h-3 w-3" aria-hidden="true" />
            Failed
          </Badge>
        );
      case "refunded":
        return (
          <Badge
            className="bg-blue-100 text-blue-800 hover:bg-blue-100"
            aria-label={statusLabels.refunded}
          >
            <RotateCcw className="mr-1 h-3 w-3" aria-hidden="true" />
            Refunded
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" aria-label={`Invoice status: ${status}`}>
            {status}
          </Badge>
        );
    }
  }, []);

  const getStatusIcon = useCallback((status: string) => {
    const iconProps = { className: "h-5 w-5", "aria-hidden": "true" as const };
    switch (status) {
      case "paid":
        return (
          <CheckCircle {...iconProps} className="h-5 w-5 text-green-600" />
        );
      case "pending":
        return <Clock {...iconProps} className="h-5 w-5 text-yellow-600" />;
      case "failed":
        return <XCircle {...iconProps} className="h-5 w-5 text-red-600" />;
      case "refunded":
        return <RotateCcw {...iconProps} className="h-5 w-5 text-blue-600" />;
      default:
        return (
          <Receipt {...iconProps} className="h-5 w-5 text-muted-foreground" />
        );
    }
  }, []);

  // Memoize filtered invoices for performance
  const filteredInvoices = useMemo(() => {
    if (!searchTerm.trim()) return invoices;
    const lowerSearchTerm = searchTerm.toLowerCase();
    return invoices.filter(
      (invoice) =>
        invoice.number.toLowerCase().includes(lowerSearchTerm) ||
        invoice.description.toLowerCase().includes(lowerSearchTerm)
    );
  }, [invoices, searchTerm]);

  // Memoize search handler
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    []
  );

  return (
    <section aria-labelledby="billing-history-heading">
      <div className="mb-6">
        <h2
          id="billing-history-heading"
          className="text-xl font-semibold flex items-center gap-2"
        >
          <Receipt className="h-5 w-5" aria-hidden="true" />
          Billing History
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          View and download your past invoices and receipts.
        </p>
      </div>

      <div className="space-y-4">
        {/* Billing Summary */}
        <Card>
          <CardHeader>
            <CardDescription>Overview of your billing history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-green-600">
                  {invoices.filter((inv) => inv.status === "paid").length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Paid Invoices
                </div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-yellow-600">
                  {invoices.filter((inv) => inv.status === "pending").length}
                </div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-red-600">
                  {invoices.filter((inv) => inv.status === "failed").length}
                </div>
                <div className="text-sm text-muted-foreground">Failed</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold">
                  {formatCurrency(
                    invoices
                      .filter((inv) => inv.status === "paid")
                      .reduce((sum, inv) => sum + inv.amount, 0)
                  )}
                </div>
                <div className="text-sm text-muted-foreground">Total Paid</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter Controls */}
        <Card role="search" aria-labelledby="search-controls-title">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  placeholder="Search invoices by number or description..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10"
                  aria-label="Search invoices"
                  aria-describedby="search-help"
                />
                <div id="search-help" className="sr-only">
                  Search through your invoices by invoice number or description
                </div>
              </div>
              <div
                className="flex gap-2"
                role="group"
                aria-label="Invoice actions"
              >
                <Button
                  variant="outline"
                  size="sm"
                  aria-label="Open filter options"
                >
                  <Filter className="mr-2 h-4 w-4" aria-hidden="true" />
                  Filter
                </Button>
                <AnimatedButton
                  onClick={handleDownloadAll}
                  disabled={isLoading}
                  variant="outline"
                  size="sm"
                  aria-describedby="download-all-description"
                >
                  <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                  {isLoading ? "Preparing..." : "Download All"}
                </AnimatedButton>
                <div id="download-all-description" className="sr-only">
                  Download all invoices as a ZIP file
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Invoices List */}
        {filteredInvoices.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
                <Receipt className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium mb-2">No Invoices Found</h3>
              <p className="text-sm text-muted-foreground text-center">
                {searchTerm
                  ? "No invoices match your search criteria."
                  : "No billing history available yet."}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredInvoices.map((invoice) => (
              <Card key={invoice.id}>
                <CardContent className="pt-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted flex-shrink-0">
                        {getStatusIcon(invoice.status)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{invoice.number}</h3>
                          {getStatusBadge(invoice.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {invoice.description}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs text-muted-foreground">
                          <span>
                            Issued: {invoice.date.toLocaleDateString()}
                          </span>
                          <span>
                            Due: {invoice.dueDate.toLocaleDateString()}
                          </span>
                          {invoice.paymentMethod && (
                            <span>
                              {invoice.paymentMethod.brand} ••••{" "}
                              {invoice.paymentMethod.last4}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 self-start sm:self-center">
                      <div className="text-right">
                        <div className="font-semibold">
                          {formatCurrency(invoice.amount)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {invoice.currency}
                        </div>
                      </div>
                      <Button
                        onClick={() => handleDownloadInvoice(invoice.id)}
                        disabled={isLoading}
                        variant="outline"
                        size="sm"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Help Section */}
        {/* <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                <Receipt className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-blue-900 mb-1">
                  Need Help with Billing?
                </h3>
                <p className="text-sm text-blue-700 mb-3">
                  If you have questions about your invoices or need assistance
                  with payments, our support team is here to help.
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-300 text-blue-700 hover:bg-blue-100"
                  >
                    Contact Support
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-300 text-blue-700 hover:bg-blue-100"
                  >
                    View FAQ
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </section>
  );
};
