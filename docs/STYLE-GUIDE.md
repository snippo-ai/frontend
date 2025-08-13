# Style Guide & Design System

## 🎨 Overview

This style guide defines the visual and interaction standards for the Snippo AI frontend. It ensures consistency across all UI components and user experiences.

## 🎯 Design Principles

### **1. Consistency**
- Use established patterns and components
- Maintain visual hierarchy throughout the application
- Apply consistent spacing and typography

### **2. Accessibility**
- Follow WCAG 2.1 AA guidelines
- Ensure proper color contrast ratios
- Provide keyboard navigation support
- Include screen reader support

### **3. Performance**
- Optimize for fast loading and smooth interactions
- Use efficient CSS practices
- Minimize layout shifts

### **4. Responsive Design**
- Mobile-first approach
- Fluid layouts that adapt to all screen sizes
- Touch-friendly interactive elements

## 🎨 Color System

### **Primary Colors**
```css
/* Light Theme */
--primary: 222.2 47.4% 11.2%;           /* Primary brand color */
--primary-foreground: 210 40% 98%;      /* Text on primary */
--secondary: 210 40% 96%;               /* Secondary background */
--secondary-foreground: 222.2 84% 4.9%; /* Text on secondary */

/* Dark Theme */
--primary: 210 40% 98%;                 /* Primary brand color */
--primary-foreground: 222.2 47.4% 11.2%; /* Text on primary */
--secondary: 217.2 32.6% 17.5%;         /* Secondary background */
--secondary-foreground: 210 40% 98%;    /* Text on secondary */
```

### **Semantic Colors**
```css
--destructive: 0 84.2% 60.2%;           /* Error/danger */
--destructive-foreground: 210 40% 98%;  /* Text on error */
--success: 142 76% 36%;                 /* Success states */
--warning: 38 92% 50%;                  /* Warning states */
--info: 221 83% 53%;                    /* Information */
```

### **Neutral Colors**
```css
--background: 0 0% 100%;                /* Page background */
--foreground: 222.2 84% 4.9%;          /* Primary text */
--muted: 210 40% 96%;                   /* Muted backgrounds */
--muted-foreground: 215.4 16.3% 46.9%; /* Muted text */
--border: 214.3 31.8% 91.4%;           /* Borders */
```

## 📝 Typography

### **Font Family**
```css
font-family: Inter, ui-sans-serif, system-ui, -apple-system, sans-serif;
```

### **Type Scale**
```css
/* Headings */
.text-4xl { font-size: 2.25rem; line-height: 2.5rem; }    /* 36px */
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; }  /* 30px */
.text-2xl { font-size: 1.5rem; line-height: 2rem; }       /* 24px */
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }    /* 20px */
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }   /* 18px */

/* Body Text */
.text-base { font-size: 1rem; line-height: 1.5rem; }      /* 16px */
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }   /* 14px */
.text-xs { font-size: 0.75rem; line-height: 1rem; }       /* 12px */
```

### **Font Weights**
```css
.font-light { font-weight: 300; }
.font-normal { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
```

## 📏 Spacing System

### **Spacing Scale**
```css
.space-1 { margin: 0.25rem; }    /* 4px */
.space-2 { margin: 0.5rem; }     /* 8px */
.space-3 { margin: 0.75rem; }    /* 12px */
.space-4 { margin: 1rem; }       /* 16px */
.space-6 { margin: 1.5rem; }     /* 24px */
.space-8 { margin: 2rem; }       /* 32px */
.space-12 { margin: 3rem; }      /* 48px */
.space-16 { margin: 4rem; }      /* 64px */
```

### **Component Spacing Guidelines**
- **Small components**: 4-8px internal padding
- **Medium components**: 12-16px internal padding
- **Large components**: 24-32px internal padding
- **Section spacing**: 48-64px between major sections

## 🔲 Layout & Grid

### **Container Widths**
```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Responsive containers */
@media (min-width: 640px) { .container { padding: 0 1.5rem; } }
@media (min-width: 1024px) { .container { padding: 0 2rem; } }
```

### **Grid System**
```css
/* Responsive grid patterns */
.grid-responsive {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 768px) {
  .grid-responsive { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .grid-responsive { grid-template-columns: repeat(3, 1fr); }
}
```

## 🎛️ Component Standards

### **Button Variants**
```typescript
// Primary button - main actions
<Button variant="default">Primary Action</Button>

// Secondary button - secondary actions
<Button variant="secondary">Secondary Action</Button>

// Outline button - subtle actions
<Button variant="outline">Outline Action</Button>

// Destructive button - dangerous actions
<Button variant="destructive">Delete</Button>

// Ghost button - minimal actions
<Button variant="ghost">Ghost Action</Button>
```

### **Button Sizes**
```typescript
<Button size="sm">Small</Button>     // Height: 36px
<Button size="default">Default</Button> // Height: 40px
<Button size="lg">Large</Button>     // Height: 44px
<Button size="icon">Icon</Button>    // 40x40px square
```

### **Input Components**
```typescript
// Standard input
<Input placeholder="Enter text..." />

// Input with label
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>

// Input with error state
<Input 
  placeholder="Enter text..." 
  className="border-destructive focus-visible:ring-destructive"
/>
```

## 🎨 Component Styling Patterns

### **Card Components**
```typescript
// Basic card
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
</Card>

// Interactive card
<Card className="hover:shadow-md transition-shadow cursor-pointer">
  <CardContent>Interactive card content</CardContent>
</Card>
```

### **Status Indicators**
```typescript
// Success state
<div className="flex items-center gap-2 text-green-600">
  <CheckCircle className="h-4 w-4" />
  <span>Success message</span>
</div>

// Error state
<div className="flex items-center gap-2 text-red-600">
  <XCircle className="h-4 w-4" />
  <span>Error message</span>
</div>

// Warning state
<div className="flex items-center gap-2 text-yellow-600">
  <AlertTriangle className="h-4 w-4" />
  <span>Warning message</span>
</div>
```

## 📱 Responsive Design Guidelines

### **Breakpoints**
```css
/* Mobile first approach */
/* xs: 0px - 639px (default) */
/* sm: 640px - 767px */
/* md: 768px - 1023px */
/* lg: 1024px - 1279px */
/* xl: 1280px - 1535px */
/* 2xl: 1536px+ */
```

### **Responsive Patterns**
```typescript
// Responsive text sizing
<h1 className="text-2xl md:text-3xl lg:text-4xl">
  Responsive Heading
</h1>

// Responsive spacing
<div className="p-4 md:p-6 lg:p-8">
  Responsive padding
</div>

// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => <Card key={item.id} />)}
</div>
```

## 🌙 Dark Mode Guidelines

### **Theme Implementation**
```typescript
// Theme-aware components
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  Theme-aware content
</div>

// Theme toggle button
<Button
  variant="ghost"
  size="icon"
  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
>
  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
</Button>
```

## ♿ Accessibility Guidelines

### **Color Contrast**
- **Normal text**: Minimum 4.5:1 contrast ratio
- **Large text**: Minimum 3:1 contrast ratio
- **Interactive elements**: Minimum 3:1 contrast ratio

### **Focus States**
```css
/* Focus ring for interactive elements */
.focus-visible:outline-none 
.focus-visible:ring-2 
.focus-visible:ring-ring 
.focus-visible:ring-offset-2
```

### **Semantic HTML**
```typescript
// Use proper heading hierarchy
<h1>Page Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>

// Use semantic elements
<main>Main content</main>
<nav>Navigation</nav>
<aside>Sidebar content</aside>
<article>Article content</article>
```

### **ARIA Labels**
```typescript
// Button with icon only
<Button aria-label="Close dialog">
  <X className="h-4 w-4" />
</Button>

// Form inputs
<Label htmlFor="search">Search</Label>
<Input 
  id="search" 
  aria-describedby="search-help"
  placeholder="Search..."
/>
<p id="search-help" className="text-sm text-muted-foreground">
  Enter keywords to search
</p>
```

## 🎭 Animation Guidelines

### **Transition Durations**
```css
.transition-fast { transition-duration: 150ms; }    /* Quick interactions */
.transition-normal { transition-duration: 200ms; }  /* Standard transitions */
.transition-slow { transition-duration: 300ms; }    /* Smooth transitions */
```

### **Easing Functions**
```css
.ease-in-out { transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
.ease-out { transition-timing-function: cubic-bezier(0, 0, 0.2, 1); }
.ease-in { transition-timing-function: cubic-bezier(0.4, 0, 1, 1); }
```

### **Animation Examples**
```typescript
// Hover effects
<Card className="transition-shadow hover:shadow-lg">
  Hover for shadow
</Card>

// Loading states
<Button disabled className="opacity-50">
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Loading...
</Button>

// Fade in animation
<div className="animate-in fade-in-0 duration-300">
  Fade in content
</div>
```

## 📋 Component Checklist

When creating new components, ensure they meet these criteria:

### **Functionality**
- [ ] Component has proper TypeScript types
- [ ] Props are well-documented
- [ ] Default values are provided where appropriate
- [ ] Component handles edge cases gracefully

### **Styling**
- [ ] Uses design system colors and spacing
- [ ] Responsive design implemented
- [ ] Dark mode support included
- [ ] Hover and focus states defined

### **Accessibility**
- [ ] Proper semantic HTML used
- [ ] ARIA labels provided where needed
- [ ] Keyboard navigation supported
- [ ] Color contrast meets requirements

### **Performance**
- [ ] Component is optimized for re-renders
- [ ] Large components use lazy loading
- [ ] Animations are performant
- [ ] Bundle size impact considered

---

## 🔄 Style Guide Updates

This style guide should be updated when:
- New design patterns are established
- Brand colors or typography change
- New accessibility requirements emerge
- Component library is expanded

## 📚 Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Material Design Guidelines](https://material.io/design)

---

**Note**: This style guide should be referenced for all UI development and updated as design patterns evolve.
