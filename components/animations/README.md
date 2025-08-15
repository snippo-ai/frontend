# Reusable Animation Components

This directory contains reusable animation components built with Framer Motion to provide consistent, performant animations throughout the security sections and beyond.

## Components Overview

### Core Animation Components (`index.tsx`)

#### `AnimatedSection`
Provides consistent section-level animations with fade-in and slide-up effects.

```tsx
<AnimatedSection 
  aria-labelledby="section-heading"
  delay={0.2}
  className="space-y-4"
>
  {/* Section content */}
</AnimatedSection>
```

**Props:**
- `delay?: number` - Animation delay in seconds (default: 0.2)
- `className?: string` - CSS classes (default: "space-y-4")
- `aria-labelledby?: string` - Accessibility label reference

#### `AnimatedCard`
Creates animated cards with scale and fade effects for forms and content containers.

```tsx
<AnimatedCard delay={0.1}>
  {/* Card content */}
</AnimatedCard>
```

**Props:**
- `delay?: number` - Animation delay (default: 0)
- `className?: string` - CSS classes (default: card styling)

#### `AnimatedListItem`
Animates list items with scale and fade effects.

```tsx
<AnimatedListItem>
  <LineItem label="Setting" subLabel="Description" action={<Button />} />
</AnimatedListItem>
```

#### `AnimatedHeader`
Animates section headers with slide-in effects.

```tsx
<AnimatedHeader delay={0.1}>
  <AnimatedIcon animation="scale" delay={0.2}>
    <Shield className="h-5 w-5 text-primary" />
  </AnimatedIcon>
  <h4 className="text-lg font-semibold">Section Title</h4>
</AnimatedHeader>
```

#### `AnimatedIcon`
Provides various icon animations.

```tsx
<AnimatedIcon 
  animation="scale" // "spin" | "bounce" | "pulse" | "scale"
  delay={0.2}
>
  <Icon />
</AnimatedIcon>
```

#### `AnimatedFormActions`
Animates form action containers (button groups).

```tsx
<AnimatedFormActions delay={0.4}>
  <AnimatedSubmitButton>Save</AnimatedSubmitButton>
  <AnimatedCancelButton onClick={handleCancel}>Cancel</AnimatedCancelButton>
</AnimatedFormActions>
```

#### `AnimatedPresenceWrapper`
Wraps AnimatePresence for consistent enter/exit animations.

```tsx
<AnimatedPresenceWrapper mode="wait">
  {condition ? <ComponentA /> : <ComponentB />}
</AnimatedPresenceWrapper>
```

### Button Animation Components (`button-animations.tsx`)

#### `AnimatedButton`
General-purpose animated button with hover and tap effects.

```tsx
<AnimatedButton
  size="sm"
  variant="secondary"
  onClick={handleClick}
  aria-label="Button description"
  scale={1.05} // Hover scale factor
>
  Button Text
</AnimatedButton>
```

#### `AnimatedSubmitButton`
Pre-configured submit button with animations.

```tsx
<AnimatedSubmitButton disabled={isLoading}>
  Update Password
</AnimatedSubmitButton>
```

#### `AnimatedCancelButton`
Pre-configured cancel/outline button with animations.

```tsx
<AnimatedCancelButton onClick={handleCancel}>
  Cancel
</AnimatedCancelButton>
```

#### `AnimatedSecondaryButton`
Pre-configured secondary button with animations.

```tsx
<AnimatedSecondaryButton 
  onClick={handleAction}
  aria-label="Enable feature"
>
  Enable 2FA
</AnimatedSecondaryButton>
```

#### `AnimatedIconButton`
Specialized button for icon-only interactions (like show/hide password).

```tsx
<AnimatedIconButton
  onClick={toggleVisibility}
  aria-label="Toggle password visibility"
>
  <Eye className="h-4 w-4" />
</AnimatedIconButton>
```

## Animation Variants

Pre-defined animation variants for consistency:

- `fadeInUp` - Fade in with upward motion
- `fadeInScale` - Fade in with scale effect
- `slideInLeft` - Slide in from left
- `scaleIn` - Scale in from zero

## Transition Configurations

- `springTransition` - Spring-based transitions for interactive elements
- `easeTransition` - Smooth ease transitions for content

## Usage Examples

### Before (Manual Animation)
```tsx
<motion.section
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, delay: 0.2 }}
  className="space-y-4"
>
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
  >
    <Button onClick={handleClick}>Click Me</Button>
  </motion.div>
</motion.section>
```

### After (Reusable Components)
```tsx
<AnimatedSection delay={0.2}>
  <AnimatedButton onClick={handleClick}>
    Click Me
  </AnimatedButton>
</AnimatedSection>
```

## Benefits

✅ **Consistency** - Standardized animations across components  
✅ **Maintainability** - Single source of truth for animation logic  
✅ **Performance** - Optimized animation configurations  
✅ **Accessibility** - Built-in accessibility considerations  
✅ **Developer Experience** - Simple, intuitive API  
✅ **Code Reduction** - Significant reduction in boilerplate code  

## Code Reduction Stats

- **Password Section**: Reduced from ~320 lines to ~180 lines (44% reduction)
- **2FA Section**: Reduced from ~50 lines to ~25 lines (50% reduction)
- **Sessions Section**: Reduced from ~50 lines to ~25 lines (50% reduction)
- **Total Animation Code**: Centralized in 2 reusable files vs scattered across components

## Best Practices

1. **Use semantic component names** - Choose the most specific animation component for your use case
2. **Consistent delays** - Use incremental delays (0.1, 0.2, 0.3) for staggered animations
3. **Accessibility first** - Always include proper ARIA labels and semantic markup
4. **Performance** - Prefer transform-based animations over layout-affecting properties
5. **Testing** - Test animations with reduced motion preferences enabled
