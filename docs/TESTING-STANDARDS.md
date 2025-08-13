# Testing Standards & Guidelines

## 🧪 Overview

This document outlines the testing standards and best practices for the Snippo AI frontend. It ensures code reliability, maintainability, and quality through comprehensive testing strategies.

## 🎯 Testing Philosophy

### **Testing Pyramid**
1. **Unit Tests (70%)** - Test individual functions and components
2. **Integration Tests (20%)** - Test component interactions and API integration
3. **End-to-End Tests (10%)** - Test complete user workflows

### **Testing Principles**
- **Write tests first** (Test-Driven Development when possible)
- **Test behavior, not implementation**
- **Keep tests simple and focused**
- **Maintain high test coverage** (minimum 80%)
- **Use descriptive test names**

## 🔧 Testing Tools & Setup

### **Testing Stack**
```json
{
  "jest": "^29.0.0",
  "@testing-library/react": "^13.0.0",
  "@testing-library/jest-dom": "^5.16.0",
  "@testing-library/user-event": "^14.0.0",
  "msw": "^1.0.0",
  "cypress": "^12.0.0"
}
```

### **Jest Configuration**
```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.tsx',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

## 🧩 Unit Testing Standards

### **Component Testing**
```typescript
// __tests__/components/UserCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { UserCard } from '@/components/UserCard';

const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://example.com/avatar.jpg',
};

describe('UserCard', () => {
  it('renders user information correctly', () => {
    render(<UserCard user={mockUser} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockUser.avatar);
  });

  it('calls onEdit when edit button is clicked', () => {
    const mockOnEdit = jest.fn();
    render(<UserCard user={mockUser} onEdit={mockOnEdit} />);
    
    fireEvent.click(screen.getByText('Edit'));
    expect(mockOnEdit).toHaveBeenCalledWith(mockUser);
  });

  it('does not render edit button when onEdit is not provided', () => {
    render(<UserCard user={mockUser} />);
    
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
  });

  it('applies custom className correctly', () => {
    const { container } = render(
      <UserCard user={mockUser} className="custom-class" />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
```

### **Hook Testing**
```typescript
// __tests__/hooks/useUserData.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { useUserData } from '@/hooks/useUserData';
import { fetcher } from '@/lib/api';

// Mock the API
jest.mock('@/lib/api', () => ({
  fetcher: jest.fn(),
}));

const mockFetcher = fetcher as jest.MockedFunction<typeof fetcher>;

describe('useUserData', () => {
  beforeEach(() => {
    mockFetcher.mockClear();
  });

  it('fetches user data successfully', async () => {
    const mockUser = { id: '1', name: 'John Doe' };
    mockFetcher.mockResolvedValue({ data: mockUser });

    const { result } = renderHook(() => useUserData('1'));

    expect(result.current.loading).toBe(true);
    expect(result.current.user).toBeNull();
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.user).toEqual(mockUser);
      expect(result.current.error).toBeNull();
    });

    expect(mockFetcher).toHaveBeenCalledWith({ url: '/users/1' });
  });

  it('handles fetch error correctly', async () => {
    const errorMessage = 'Failed to fetch user';
    mockFetcher.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useUserData('1'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.user).toBeNull();
      expect(result.current.error).toBe(errorMessage);
    });
  });

  it('does not fetch when userId is empty', () => {
    renderHook(() => useUserData(''));
    
    expect(mockFetcher).not.toHaveBeenCalled();
  });
});
```

### **Utility Function Testing**
```typescript
// __tests__/utils/formatDate.test.ts
import { formatDate } from '@/lib/utils/formatDate';

describe('formatDate', () => {
  it('formats date string correctly', () => {
    const result = formatDate('2023-12-25');
    expect(result).toBe('Dec 25, 2023');
  });

  it('formats Date object correctly', () => {
    const date = new Date('2023-12-25');
    const result = formatDate(date);
    expect(result).toBe('Dec 25, 2023');
  });

  it('uses custom format when provided', () => {
    const result = formatDate('2023-12-25', 'yyyy-MM-dd');
    expect(result).toBe('2023-12-25');
  });

  it('handles invalid date gracefully', () => {
    const result = formatDate('invalid-date');
    expect(result).toBe('Invalid Date');
  });
});
```

## 🔗 Integration Testing

### **API Integration Testing**
```typescript
// __tests__/integration/userApi.test.ts
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { fetcher } from '@/lib/api';

const server = setupServer(
  rest.get('/api/users/:id', (req, res, ctx) => {
    const { id } = req.params;
    return res(
      ctx.json({
        data: { id, name: 'John Doe', email: 'john@example.com' }
      })
    );
  }),

  rest.post('/api/users', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        data: { id: '2', name: 'Jane Doe', email: 'jane@example.com' }
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('User API Integration', () => {
  it('fetches user data correctly', async () => {
    const response = await fetcher({ url: '/api/users/1' });
    
    expect(response.data).toEqual({
      data: { id: '1', name: 'John Doe', email: 'john@example.com' }
    });
  });

  it('creates user correctly', async () => {
    const userData = { name: 'Jane Doe', email: 'jane@example.com' };
    const response = await fetcher({
      url: '/api/users',
      method: 'POST',
      data: userData
    });
    
    expect(response.status).toBe(201);
    expect(response.data.data).toMatchObject(userData);
  });
});
```

### **Component Integration Testing**
```typescript
// __tests__/integration/UserProfile.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserProfile } from '@/components/UserProfile';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
  });
  
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('UserProfile Integration', () => {
  it('loads and displays user data', async () => {
    render(<UserProfile userId="1" />, { wrapper: createWrapper() });
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });
  });

  it('handles edit user flow', async () => {
    const user = userEvent.setup();
    render(<UserProfile userId="1" />, { wrapper: createWrapper() });
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
    
    await user.click(screen.getByText('Edit'));
    
    const nameInput = screen.getByLabelText('Name');
    await user.clear(nameInput);
    await user.type(nameInput, 'John Smith');
    
    await user.click(screen.getByText('Save'));
    
    await waitFor(() => {
      expect(screen.getByText('Profile updated successfully')).toBeInTheDocument();
    });
  });
});
```

## 🎭 Testing Patterns

### **Test Data Factories**
```typescript
// __tests__/factories/userFactory.ts
export const createMockUser = (overrides: Partial<User> = {}): User => ({
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://example.com/avatar.jpg',
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: '2023-01-01T00:00:00Z',
  ...overrides,
});

export const createMockUsers = (count: number): User[] => {
  return Array.from({ length: count }, (_, index) =>
    createMockUser({
      id: String(index + 1),
      name: `User ${index + 1}`,
      email: `user${index + 1}@example.com`,
    })
  );
};
```

### **Custom Render Utilities**
```typescript
// __tests__/utils/testUtils.tsx
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/lib/providers/theme-provider';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
```

### **Mock Utilities**
```typescript
// __tests__/mocks/handlers.ts
import { rest } from 'msw';

export const handlers = [
  rest.get('/api/users', (req, res, ctx) => {
    return res(
      ctx.json({
        data: [
          { id: '1', name: 'John Doe', email: 'john@example.com' },
          { id: '2', name: 'Jane Doe', email: 'jane@example.com' },
        ]
      })
    );
  }),

  rest.post('/api/auth/login', (req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          user: { id: '1', name: 'John Doe', email: 'john@example.com' },
          token: 'mock-jwt-token'
        }
      })
    );
  }),
];
```

## 🎯 E2E Testing with Cypress

### **Cypress Configuration**
```typescript
// cypress.config.ts
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    viewportWidth: 1280,
    viewportHeight: 720,
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
});
```

### **E2E Test Example**
```typescript
// cypress/e2e/user-authentication.cy.ts
describe('User Authentication', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('allows user to login with valid credentials', () => {
    cy.get('[data-testid="email-input"]').type('user@example.com');
    cy.get('[data-testid="password-input"]').type('password123');
    cy.get('[data-testid="login-button"]').click();

    cy.url().should('include', '/dashboard');
    cy.get('[data-testid="user-menu"]').should('be.visible');
  });

  it('shows error message for invalid credentials', () => {
    cy.get('[data-testid="email-input"]').type('user@example.com');
    cy.get('[data-testid="password-input"]').type('wrongpassword');
    cy.get('[data-testid="login-button"]').click();

    cy.get('[data-testid="error-message"]')
      .should('be.visible')
      .and('contain', 'Invalid credentials');
  });

  it('redirects to intended page after login', () => {
    cy.visit('/dashboard/profile');
    cy.url().should('include', '/login');

    cy.get('[data-testid="email-input"]').type('user@example.com');
    cy.get('[data-testid="password-input"]').type('password123');
    cy.get('[data-testid="login-button"]').click();

    cy.url().should('include', '/dashboard/profile');
  });
});
```

## 📊 Test Coverage Standards

### **Coverage Requirements**
- **Statements**: Minimum 80%
- **Branches**: Minimum 80%
- **Functions**: Minimum 80%
- **Lines**: Minimum 80%

### **Coverage Reports**
```bash
# Generate coverage report
npm run test:coverage

# View coverage report
open coverage/lcov-report/index.html
```

### **Coverage Exclusions**
```javascript
// jest.config.js
collectCoverageFrom: [
  'src/**/*.{ts,tsx}',
  '!src/**/*.d.ts',
  '!src/**/*.stories.tsx',
  '!src/**/*.test.{ts,tsx}',
  '!src/test/**/*',
  '!src/mocks/**/*',
],
```

## 🚀 Testing Best Practices

### **Do's**
- ✅ Write descriptive test names
- ✅ Test user behavior, not implementation details
- ✅ Use data-testid for reliable element selection
- ✅ Mock external dependencies
- ✅ Test error states and edge cases
- ✅ Keep tests independent and isolated
- ✅ Use factories for test data generation

### **Don'ts**
- ❌ Test implementation details
- ❌ Write overly complex tests
- ❌ Ignore failing tests
- ❌ Test third-party library functionality
- ❌ Use production data in tests
- ❌ Write tests that depend on each other

### **Test Naming Convention**
```typescript
// Pattern: should [expected behavior] when [condition]
describe('UserCard', () => {
  it('should display user information when user data is provided', () => {});
  it('should call onEdit callback when edit button is clicked', () => {});
  it('should hide edit button when onEdit is not provided', () => {});
  it('should show loading state when data is being fetched', () => {});
});
```

## 🔄 Continuous Integration

### **GitHub Actions Workflow**
```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test:coverage
      - run: npm run build
      
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
```

## 📚 Testing Resources

- [Testing Library Documentation](https://testing-library.com/docs/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Cypress Documentation](https://docs.cypress.io/)
- [MSW Documentation](https://mswjs.io/docs/)

---

**Note**: These testing standards should be followed for all new code and existing code should be gradually updated to meet these standards.
