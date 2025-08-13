# Coding Standards & Guidelines

## 🎯 Overview

This document defines the coding standards and best practices for the Snippo AI frontend codebase. These guidelines ensure code consistency, maintainability, and quality across the entire project.

## 📋 Table of Contents

- [General Principles](#general-principles)
- [TypeScript Guidelines](#typescript-guidelines)
- [React Component Standards](#react-component-standards)
- [File & Folder Organization](#file--folder-organization)
- [Naming Conventions](#naming-conventions)
- [Code Formatting](#code-formatting)
- [Import/Export Standards](#importexport-standards)
- [Error Handling](#error-handling)
- [Performance Guidelines](#performance-guidelines)
- [Security Standards](#security-standards)

## 🎨 General Principles

### 1. **Code Readability**

- Write self-documenting code with clear variable and function names
- Use meaningful comments for complex business logic
- Prefer explicit over implicit behavior
- Keep functions small and focused (max 20-30 lines)

### 2. **Consistency**

- Follow established patterns throughout the codebase
- Use consistent naming conventions
- Maintain uniform code structure and organization

### 3. **Maintainability**

- Write modular, reusable code
- Avoid deep nesting (max 3-4 levels)
- Use composition over inheritance
- Keep dependencies minimal and well-defined

### 4. **Performance**

- Optimize for bundle size and runtime performance
- Use lazy loading for non-critical components
- Implement proper memoization strategies
- Avoid unnecessary re-renders

### 5. **User Experience**

- Use subtle animations for page/component transitions
- Implement smooth hover and focus states
- Provide visual feedback for user interactions
- Ensure animations are performant and accessible

### 6. **Accessibility & SEO**

- Follow WCAG 2.1 AA guidelines for accessibility compliance
- Implement proper semantic HTML structure
- Provide comprehensive ARIA labels and descriptions
- Ensure keyboard navigation and screen reader compatibility
- Optimize for search engines with proper meta tags and structured data
- Use descriptive alt text for images and meaningful link text

## 🔷 TypeScript Guidelines

### **Strict Type Safety**

```typescript
// ✅ Good: Explicit types
interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

function updateProfile(profile: UserProfile): Promise<UserProfile> {
  return api.updateUser(profile);
}

// ❌ Avoid: Using 'any'
function badFunction(data: any): any {
  return data.something;
}
```

### **Type Definitions**

```typescript
// ✅ Good: Use interfaces for object shapes
interface ComponentProps {
  title: string;
  description?: string;
  onSubmit: (data: FormData) => void;
}

// ✅ Good: Use type aliases for unions
type Status = "loading" | "success" | "error";
type Theme = "light" | "dark" | "system";

// ✅ Good: Generic types for reusability
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
```

### **Type Guards & Assertions**

```typescript
// ✅ Good: Type guards for runtime validation
function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "email" in value
  );
}

// ✅ Good: Assertion functions
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error(`Expected string, got ${typeof value}`);
  }
}
```

## ⚛️ React Component Standards

### **Functional Components**

```typescript
// ✅ Good: Functional component with proper typing
interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
  className?: string;
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  onEdit,
  className,
}) => {
  const handleEdit = useCallback(() => {
    onEdit?.(user);
  }, [onEdit, user]);

  return (
    <div className={cn("user-card", className)}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      {onEdit && <Button onClick={handleEdit}>Edit</Button>}
    </div>
  );
};
```

### **Custom Hooks**

```typescript
// ✅ Good: Custom hook pattern
export const useUserData = (userId: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetcher({ url: `/users/${userId}` });
        setUser(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { user, loading, error };
};
```

### **Component Composition**

```typescript
// ✅ Good: Compound components
export const Card = ({ children, className, ...props }: CardProps) => (
  <div className={cn("card-base", className)} {...props}>
    {children}
  </div>
);

Card.Header = ({ children, className }: CardHeaderProps) => (
  <div className={cn("card-header", className)}>{children}</div>
);

Card.Content = ({ children, className }: CardContentProps) => (
  <div className={cn("card-content", className)}>{children}</div>
);
```

## 📁 File & Folder Organization

### **Directory Structure**

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Route groups
│   ├── (dashboard)/
│   └── globals.css
├── components/            # Reusable components
│   ├── ui/               # UI primitives
│   └── shared/           # Business components
├── lib/                  # Utilities & config
│   ├── types/           # Type definitions
│   ├── utils/           # Utility functions
│   └── constants/       # App constants
├── hooks/               # Custom hooks
└── public/              # Static assets
```

### **File Naming**

- **Components**: smallCase with hyphen (`user-profile.tsx`)
- **Hooks**: smallCase with `use` prefix (`use-user-data.ts`)
- **Utilities**: smallCase with hyphen (`format-date.ts`)
- **Types**: smallCase with hyphen (`user-types.ts`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`)

## 🏷️ Naming Conventions

### **Variables & Functions**

```typescript
// ✅ Good: Descriptive names
const userProfileData = await fetchUserProfile(userId);
const isUserAuthenticated = checkAuthStatus();
const handleFormSubmission = (data: FormData) => { ... };

// ❌ Avoid: Abbreviations and unclear names
const usr = await getUsr(id);
const chk = checkAuth();
const handle = (d) => { ... };
```

### **Constants**

```typescript
// ✅ Good: Descriptive constant names
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const API_ENDPOINTS = {
  USERS: "/api/users",
  PROFILE: "/api/profile",
} as const;

const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: "This field is required",
  INVALID_EMAIL: "Please enter a valid email address",
} as const;
```

### **Component Props**

```typescript
// ✅ Good: Clear prop names
interface ButtonProps {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}
```

## 🎨 Code Formatting

### **Prettier Configuration**

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

### **ESLint Rules**

```javascript
{
  "rules": {
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/no-explicit-any": "warn",
    "react-hooks/exhaustive-deps": "warn",
    "prefer-const": "error",
    "no-var": "error",
    "no-console": "warn"
  }
}
```

## 📦 Import/Export Standards

### **Import Order**

```typescript
// 1. React and Next.js imports
import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import Link from "next/link";

// 2. Third-party libraries
import { z } from "zod";
import { useForm } from "react-hook-form";

// 3. Internal utilities and types
import { cn } from "@/lib/utils";
import type { User } from "@/lib/types/user";

// 4. Internal components
import { Button } from "@/components/ui/button";
import { UserCard } from "@/components/shared/user-card";

// 5. Relative imports
import "./component.css";
```

### **Export Standards**

```typescript
// ✅ Good: Named exports for components
export const UserProfile = () => { ... };
export const UserCard = () => { ... };

// ✅ Good: Default export for pages
const HomePage: NextPage = () => { ... };
export default HomePage;

// ✅ Good: Type-only exports
export type { User, UserProfile } from './types';
```

## 🚨 Error Handling

### **Error Boundaries**

```typescript
// ✅ Good: Error boundary implementation
class ErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    // Log to error reporting service
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

### **Async Error Handling**

```typescript
// ✅ Good: Proper async error handling
const useAsyncOperation = <T>(operation: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const execute = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await operation();
      setData(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [operation]);

  return { data, error, loading, execute };
};
```

## ⚡ Performance Guidelines

### **Component Optimization**

```typescript
// ✅ Good: Memoization for expensive calculations
const ExpensiveComponent = ({ data }: { data: Item[] }) => {
  const processedData = useMemo(() => {
    return data.map((item) => expensiveCalculation(item));
  }, [data]);

  return <div>{/* Render processedData */}</div>;
};

// ✅ Good: Callback memoization
const ListComponent = ({ items, onItemClick }: ListProps) => {
  const handleClick = useCallback(
    (id: string) => {
      onItemClick(id);
    },
    [onItemClick]
  );

  return (
    <div>
      {items.map((item) => (
        <Item key={item.id} data={item} onClick={handleClick} />
      ))}
    </div>
  );
};
```

### **Bundle Optimization**

```typescript
// ✅ Good: Dynamic imports for code splitting
const HeavyComponent = lazy(() => import("./HeavyComponent"));

// ✅ Good: Selective imports
import { format } from "date-fns";
// ❌ Avoid: import * as dateFns from 'date-fns';

// ✅ Good: Type-only imports
import type { User } from "@/types/user";
```

## 🎭 Animation Standards

### **Subtle Transitions**

```typescript
// ✅ Good: Smooth component transitions
const AnimatedCard = ({ children, isVisible }: AnimatedCardProps) => {
  return (
    <div className="transition-all duration-300 ease-in-out transform">
      {children}
    </div>
  );
};

// ✅ Good: Form field animations
<div className="animate-in slide-in-from-top-2 duration-300">
  <Input placeholder="Enter password" />
</div>

// ✅ Good: Loading states
<Button disabled className="transition-opacity duration-200">
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Loading...
</Button>
```

### **Animation Guidelines**

```css
/* ✅ Good: Standard transition durations */
.transition-fast { transition-duration: 150ms; }    /* Quick interactions */
.transition-normal { transition-duration: 300ms; }  /* Standard transitions */
.transition-slow { transition-duration: 500ms; }    /* Smooth entrances */

/* ✅ Good: Consistent easing functions */
.ease-smooth { transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
.ease-bounce { transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55); }
```

### **Performance Considerations**

```typescript
// ✅ Good: Use transform and opacity for performance
.animate-slide-in {
  transform: translateY(-10px);
  opacity: 0;
  transition: transform 300ms ease-out, opacity 300ms ease-out;
}

.animate-slide-in.active {
  transform: translateY(0);
  opacity: 1;
}

// ❌ Avoid: Animating layout properties
.avoid-layout-animation {
  transition: height 300ms; /* Causes layout thrashing */
}
```

## ♿ Accessibility & SEO Standards

### **Semantic HTML Structure**

```typescript
// ✅ Good: Proper semantic structure
const SecurityPage = () => {
  return (
    <main role="main" aria-labelledby="page-title">
      <header>
        <h1 id="page-title">Security Settings</h1>
        <p>Manage your account security and privacy settings</p>
      </header>
      
      <section aria-labelledby="password-section">
        <h2 id="password-section">Password Management</h2>
        <article>
          <h3>Update Password</h3>
          {/* Content */}
        </article>
      </section>
    </main>
  );
};

// ❌ Avoid: Generic div structure
const BadPage = () => {
  return (
    <div>
      <div>Security Settings</div>
      <div>
        <div>Password</div>
      </div>
    </div>
  );
};
```

### **ARIA Labels and Descriptions**

```typescript
// ✅ Good: Comprehensive ARIA implementation
<form 
  role="form" 
  aria-labelledby="form-title"
  aria-describedby="form-description"
>
  <h2 id="form-title">Update Password</h2>
  <p id="form-description">
    Enter your current password and choose a new secure password
  </p>
  
  <div className="form-group">
    <Label htmlFor="current-password">Current Password</Label>
    <Input
      id="current-password"
      type="password"
      aria-describedby="current-password-help"
      aria-required="true"
      aria-invalid={hasError ? "true" : "false"}
    />
    <div id="current-password-help" className="sr-only">
      Enter your existing password to verify your identity
    </div>
    {hasError && (
      <div role="alert" aria-live="polite" className="error-message">
        Current password is incorrect
      </div>
    )}
  </div>
</form>

// ✅ Good: Button accessibility
<Button
  type="submit"
  aria-label="Update your account password"
  aria-describedby="update-help"
>
  Update Password
</Button>
<div id="update-help" className="sr-only">
  This will change your password and log you out of other devices
</div>
```

### **Keyboard Navigation**

```typescript
// ✅ Good: Keyboard navigation support
const AccessibleModal = ({ isOpen, onClose }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isOpen) {
      // Focus trap implementation
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements?.[0] as HTMLElement;
      const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement;
      
      firstElement?.focus();
      
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
        
        if (e.key === "Tab") {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };
      
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);
  
  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabIndex={-1}
    >
      {/* Modal content */}
    </div>
  );
};
```

### **Screen Reader Optimization**

```typescript
// ✅ Good: Screen reader friendly components
const LoadingButton = ({ isLoading, children, ...props }: ButtonProps) => {
  return (
    <Button
      {...props}
      aria-busy={isLoading}
      aria-describedby={isLoading ? "loading-text" : undefined}
    >
      {isLoading && (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
          <span id="loading-text" className="sr-only">
            Loading, please wait
          </span>
        </>
      )}
      {children}
    </Button>
  );
};

// ✅ Good: Status announcements
const useStatusAnnouncement = () => {
  const announce = useCallback((message: string, priority: "polite" | "assertive" = "polite") => {
    const announcement = document.createElement("div");
    announcement.setAttribute("aria-live", priority);
    announcement.setAttribute("aria-atomic", "true");
    announcement.className = "sr-only";
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, []);
  
  return announce;
};
```

### **SEO Optimization**

```typescript
// ✅ Good: Next.js metadata implementation
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security Settings | Snippo AI",
  description: "Manage your account security, update passwords, enable two-factor authentication, and review active sessions.",
  keywords: ["security", "password", "2FA", "account settings", "privacy"],
  openGraph: {
    title: "Security Settings | Snippo AI",
    description: "Secure your account with advanced security features",
    type: "website",
    url: "https://snippo.ai/account/security",
  },
  twitter: {
    card: "summary",
    title: "Security Settings | Snippo AI",
    description: "Manage your account security settings",
  },
  robots: {
    index: false, // Private user pages should not be indexed
    follow: false,
  },
};

// ✅ Good: Structured data for better SEO
const SecurityPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Security Settings",
  "description": "Account security management page",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Snippo AI",
    "url": "https://snippo.ai"
  }
};
```

### **Color Contrast and Visual Accessibility**

```css
/* ✅ Good: WCAG AA compliant color contrast */
:root {
  /* Ensure 4.5:1 contrast ratio for normal text */
  --text-primary: hsl(222.2 84% 4.9%);        /* #0a0a0b */
  --background: hsl(0 0% 100%);               /* #ffffff */
  
  /* 3:1 contrast ratio for large text and UI elements */
  --text-muted: hsl(215.4 16.3% 46.9%);      /* #6b7280 */
  --border: hsl(214.3 31.8% 91.4%);          /* #e5e7eb */
}

/* Dark mode compliance */
.dark {
  --text-primary: hsl(210 40% 98%);          /* #fafafa */
  --background: hsl(222.2 47.4% 11.2%);     /* #1a1a1a */
  --text-muted: hsl(215 20.2% 65.1%);       /* #9ca3af */
}

/* ✅ Good: Focus indicators */
.focus-visible\:outline-none:focus-visible {
  outline: 2px solid hsl(221.2 83.2% 53.3%); /* Blue focus ring */
  outline-offset: 2px;
}

/* ✅ Good: Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### **Form Accessibility**

```typescript
// ✅ Good: Accessible form implementation
const AccessiblePasswordForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const announce = useStatusAnnouncement();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await updatePassword(formData);
      announce("Password updated successfully", "assertive");
    } catch (error) {
      announce("Password update failed. Please try again.", "assertive");
    }
  };
  
  return (
    <form onSubmit={handleSubmit} noValidate>
      <fieldset>
        <legend className="text-lg font-semibold mb-4">
          Update Your Password
        </legend>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="current-password" className="required">
              Current Password
            </Label>
            <Input
              id="current-password"
              type="password"
              required
              aria-describedby="current-password-error"
              aria-invalid={!!errors.currentPassword}
              autoComplete="current-password"
            />
            {errors.currentPassword && (
              <div
                id="current-password-error"
                role="alert"
                className="text-sm text-red-600 mt-1"
              >
                {errors.currentPassword}
              </div>
            )}
          </div>
          
          <div>
            <Label htmlFor="new-password" className="required">
              New Password
            </Label>
            <Input
              id="new-password"
              type="password"
              required
              aria-describedby="new-password-help new-password-error"
              aria-invalid={!!errors.newPassword}
              autoComplete="new-password"
            />
            <div id="new-password-help" className="text-sm text-muted-foreground mt-1">
              Must be at least 8 characters with uppercase, lowercase, and numbers
            </div>
            {errors.newPassword && (
              <div
                id="new-password-error"
                role="alert"
                className="text-sm text-red-600 mt-1"
              >
                {errors.newPassword}
              </div>
            )}
          </div>
        </div>
      </fieldset>
    </form>
  );
};
```

### **Accessibility Testing Checklist**

```typescript
// ✅ Component accessibility checklist
const AccessibilityChecklist = {
  semantic: [
    "Uses proper HTML5 semantic elements (main, section, article, nav, etc.)",
    "Headings follow logical hierarchy (h1 → h2 → h3)",
    "Form elements have associated labels",
    "Interactive elements are keyboard accessible"
  ],
  
  aria: [
    "ARIA labels provided for complex UI elements",
    "ARIA live regions for dynamic content updates",
    "ARIA states (expanded, selected, checked) are updated",
    "ARIA landmarks identify page regions"
  ],
  
  keyboard: [
    "All interactive elements are focusable",
    "Focus order is logical and predictable",
    "Focus indicators are visible and meet contrast requirements",
    "Keyboard shortcuts don't conflict with screen readers"
  ],
  
  screenReader: [
    "Content is announced in logical order",
    "Images have descriptive alt text",
    "Form errors are announced to screen readers",
    "Loading states and changes are communicated"
  ],
  
  visual: [
    "Color contrast meets WCAG AA standards (4.5:1 for normal text)",
    "Text can be resized up to 200% without horizontal scrolling",
    "Content is usable with CSS disabled",
    "Animations respect prefers-reduced-motion"
  ]
};
```

## 🔒 Security Standards

### **Input Validation**

```typescript
// ✅ Good: Zod schema validation
const userSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  age: z.number().min(0).max(120),
});

// ✅ Good: Sanitize user input
const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, "");
};
```

### **Environment Variables**

```typescript
// ✅ Good: Environment variable validation
const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "/api",
  isDevelopment: process.env.NODE_ENV === "development",
};

// ❌ Avoid: Hardcoded secrets
const API_KEY = "sk-1234567890"; // Never do this
```

## 📝 Documentation Standards

### **Component Documentation**

````typescript
/**
 * UserCard component displays user information in a card format
 *
 * @param user - User object containing user details
 * @param onEdit - Optional callback function called when edit button is clicked
 * @param className - Additional CSS classes to apply
 *
 * @example
 * ```tsx
 * <UserCard
 *   user={userData}
 *   onEdit={(user) => handleEdit(user)}
 *   className="mb-4"
 * />
 * ```
 */
export const UserCard: React.FC<UserCardProps> = ({ ... }) => {
  // Component implementation
};
````

### **Function Documentation**

```typescript
/**
 * Formats a date string into a human-readable format
 *
 * @param date - Date string or Date object to format
 * @param format - Format string (default: 'MMM dd, yyyy')
 * @returns Formatted date string
 *
 * @example
 * formatDate('2023-12-25') // Returns 'Dec 25, 2023'
 */
export const formatDate = (
  date: string | Date,
  format = "MMM dd, yyyy"
): string => {
  // Implementation
};
```

---

## 🔄 Review Process

1. **Self Review**: Check your code against these guidelines before committing
2. **Automated Checks**: Ensure ESLint and TypeScript checks pass
3. **Peer Review**: Have another developer review your code
4. **Testing**: Ensure all tests pass and add tests for new functionality

## 📚 Additional Resources

- [React Best Practices](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Best Practices](https://tailwindcss.com/docs/reusing-styles)

---

**Note**: These guidelines are living documents and should be updated as the project evolves and new best practices emerge.
