# Snippo AI Frontend Documentation

Welcome to the Snippo AI frontend documentation. This comprehensive guide covers the architecture, patterns, and implementation details of the Next.js-based frontend application.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🏗️ Project Overview

Snippo AI is a modern SaaS application built with:

- **Next.js 15.2.3** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **NextAuth.js** for authentication
- **Axios** for API communication

## 📁 Directory Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Protected dashboard
│   ├── (site)/           # Public marketing pages
│   └── onboarding/       # User onboarding
├── components/            # Reusable components
│   ├── ui/               # UI primitives
│   └── shared/           # Business components
├── lib/                  # Utilities and configurations
│   ├── providers/        # Context providers
│   ├── types/           # Type definitions
│   └── helpers/         # Helper functions
├── hooks/               # Custom React hooks
├── public/              # Static assets
└── docs/               # Documentation (this folder)
```

## 🎯 Key Features

- **Multi-provider Authentication** (Google, GitHub, Credentials)
- **Route Protection** with middleware
- **Responsive Design** with mobile-first approach
- **Dark/Light Theme** support
- **Type-safe API** integration
- **Component Library** with Radix UI
- **Event-driven Architecture** with custom event bus
- **File Upload** capabilities
- **Form Validation** with Zod schemas

## 📖 Getting Started

1. Read the [Architecture Overview](./architecture.md) to understand the system design
2. Check the [Development Guide](./development.md) for setup instructions
3. Explore the [Component System](./components.md) for UI patterns
4. Review [API Patterns](./api-patterns.md) for data fetching

## 🤝 Contributing

Please refer to the [Development Guide](./development.md) for coding standards and contribution guidelines.

---

**Last Updated**: August 13, 2025  
**Version**: 0.1.0  
**Maintainer**: Snippo AI Team
