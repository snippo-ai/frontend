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
