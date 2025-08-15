export interface Subscription {
  id: string;
  plan: PlanType;
  status: "active" | "cancelled" | "pending" | "past_due";
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  razorpaySubscriptionId: string;
  razorpayCustomerId: string;
  amount: number;
  currency: "INR";
  interval: "monthly" | "yearly";
}

export interface PlanType {
  id: string;
  name: string;
  displayName: string;
  price: number;
  currency: "INR";
  interval: "monthly" | "yearly";
  features: string[];
  limits: {
    apiCalls: number;
    storage: number; // in GB
    projects: number;
    teamMembers: number;
  };
}

export interface UsageMetrics {
  apiCalls: {
    current: number;
    limit: number;
    resetDate: Date;
    history: Array<{
      date: Date;
      count: number;
    }>;
  };
  storage: {
    used: number; // in GB
    limit: number; // in GB
  };
  projects: {
    current: number;
    limit: number;
  };
  teamMembers: {
    current: number;
    limit: number;
  };
}

export interface PaymentMethod {
  id: string;
  type: "card" | "upi" | "netbanking";
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
  holderName: string;
}

export interface Invoice {
  id: string;
  number: string;
  date: Date;
  dueDate: Date;
  amount: number;
  currency: "INR";
  status: "paid" | "pending" | "failed" | "refunded";
  description: string;
  downloadUrl: string;
  paymentMethod?: PaymentMethod;
}

export interface BillingAddress {
  name: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  gstin?: string; // For Indian businesses
}

// Mock Plans
export const MOCK_PLANS: PlanType[] = [
  {
    id: "free",
    name: "free",
    displayName: "Free",
    price: 0,
    currency: "INR",
    interval: "monthly",
    features: [
      "1,000 API calls per month",
      "1 GB storage",
      "1 project",
      "Community support",
      "Basic analytics"
    ],
    limits: {
      apiCalls: 1000,
      storage: 1,
      projects: 1,
      teamMembers: 1
    }
  },
  {
    id: "plan_QkMj84RI3NKDCj",
    name: "pro_monthly",
    displayName: "Pro Monthly",
    price: 249,
    currency: "INR",
    interval: "monthly",
    features: [
      "50,000 API calls per month",
      "10 GB storage",
      "Unlimited projects",
      "5 team members",
      "Priority support",
      "Advanced analytics",
      "Custom integrations",
      "API rate limiting"
    ],
    limits: {
      apiCalls: 50000,
      storage: 10,
      projects: -1, // unlimited
      teamMembers: 5
    }
  },
  {
    id: "plan_yearly_pro",
    name: "pro_yearly",
    displayName: "Pro Yearly",
    price: 2490, // 10 months price for 12 months
    currency: "INR",
    interval: "yearly",
    features: [
      "50,000 API calls per month",
      "10 GB storage",
      "Unlimited projects",
      "5 team members",
      "Priority support",
      "Advanced analytics",
      "Custom integrations",
      "API rate limiting",
      "2 months free"
    ],
    limits: {
      apiCalls: 50000,
      storage: 10,
      projects: -1,
      teamMembers: 5
    }
  },
  {
    id: "plan_enterprise",
    name: "enterprise",
    displayName: "Enterprise",
    price: 999,
    currency: "INR",
    interval: "monthly",
    features: [
      "500,000 API calls per month",
      "100 GB storage",
      "Unlimited projects",
      "Unlimited team members",
      "24/7 dedicated support",
      "Advanced analytics",
      "Custom integrations",
      "SLA guarantee",
      "On-premise deployment",
      "Custom contracts"
    ],
    limits: {
      apiCalls: 500000,
      storage: 100,
      projects: -1,
      teamMembers: -1
    }
  }
];

// Mock Subscription Data
export const MOCK_SUBSCRIPTION: Subscription = {
  id: "sub_123456789",
  plan: MOCK_PLANS[1], // Pro Monthly
  status: "active",
  currentPeriodStart: new Date("2024-01-15"),
  currentPeriodEnd: new Date("2024-02-15"),
  cancelAtPeriodEnd: false,
  razorpaySubscriptionId: "sub_QkMj84RI3NKDCj",
  razorpayCustomerId: "cust_QkMj84RI3NKDCj",
  amount: 249,
  currency: "INR",
  interval: "monthly"
};

// Mock Usage Metrics
export const MOCK_USAGE_METRICS: UsageMetrics = {
  apiCalls: {
    current: 23450,
    limit: 50000,
    resetDate: new Date("2024-02-15"),
    history: [
      { date: new Date("2024-01-01"), count: 12000 },
      { date: new Date("2024-01-02"), count: 15000 },
      { date: new Date("2024-01-03"), count: 18000 },
      { date: new Date("2024-01-04"), count: 21000 },
      { date: new Date("2024-01-05"), count: 23450 }
    ]
  },
  storage: {
    used: 3.2,
    limit: 10
  },
  projects: {
    current: 7,
    limit: -1 // unlimited
  },
  teamMembers: {
    current: 3,
    limit: 5
  }
};

// Mock Payment Methods
export const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "pm_1",
    type: "card",
    last4: "4242",
    brand: "Visa",
    expiryMonth: 12,
    expiryYear: 2025,
    isDefault: true,
    holderName: "John Doe"
  },
  {
    id: "pm_2",
    type: "card",
    last4: "5555",
    brand: "Mastercard",
    expiryMonth: 8,
    expiryYear: 2026,
    isDefault: false,
    holderName: "John Doe"
  }
];

// Mock Invoices
export const MOCK_INVOICES: Invoice[] = [
  {
    id: "inv_1",
    number: "INV-2024-001",
    date: new Date("2024-01-15"),
    dueDate: new Date("2024-01-15"),
    amount: 249,
    currency: "INR",
    status: "paid",
    description: "Pro Monthly Plan - January 2024",
    downloadUrl: "/api/invoices/inv_1/download",
    paymentMethod: MOCK_PAYMENT_METHODS[0]
  },
  {
    id: "inv_2",
    number: "INV-2023-012",
    date: new Date("2023-12-15"),
    dueDate: new Date("2023-12-15"),
    amount: 249,
    currency: "INR",
    status: "paid",
    description: "Pro Monthly Plan - December 2023",
    downloadUrl: "/api/invoices/inv_2/download",
    paymentMethod: MOCK_PAYMENT_METHODS[0]
  },
  {
    id: "inv_3",
    number: "INV-2023-011",
    date: new Date("2023-11-15"),
    dueDate: new Date("2023-11-15"),
    amount: 249,
    currency: "INR",
    status: "paid",
    description: "Pro Monthly Plan - November 2023",
    downloadUrl: "/api/invoices/inv_3/download",
    paymentMethod: MOCK_PAYMENT_METHODS[1]
  },
  {
    id: "inv_4",
    number: "INV-2023-010",
    date: new Date("2023-10-15"),
    dueDate: new Date("2023-10-15"),
    amount: 249,
    currency: "INR",
    status: "failed",
    description: "Pro Monthly Plan - October 2023",
    downloadUrl: "/api/invoices/inv_4/download"
  }
];

// Mock Billing Address
export const MOCK_BILLING_ADDRESS: BillingAddress = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+91 98765 43210",
  addressLine1: "123 Tech Park",
  addressLine2: "Sector 5",
  city: "Bangalore",
  state: "Karnataka",
  postalCode: "560001",
  country: "India",
  gstin: "29ABCDE1234F1Z5"
};

// Utility functions
export const getPlanById = (planId: string): PlanType | undefined => {
  return MOCK_PLANS.find(plan => plan.id === planId);
};

export const formatCurrency = (amount: number, currency: "INR" = "INR"): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0
  }).format(amount);
};

export const formatUsagePercentage = (current: number, limit: number): number => {
  if (limit === -1) return 0; // unlimited
  return Math.min((current / limit) * 100, 100);
};

export const getUsageColor = (percentage: number): string => {
  if (percentage >= 90) return "text-red-600";
  if (percentage >= 75) return "text-yellow-600";
  return "text-green-600";
};

export const getNextBillingDate = (subscription: Subscription): Date => {
  return subscription.currentPeriodEnd;
};

export const getDaysUntilBilling = (subscription: Subscription): number => {
  const now = new Date();
  const nextBilling = getNextBillingDate(subscription);
  const diffTime = nextBilling.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
