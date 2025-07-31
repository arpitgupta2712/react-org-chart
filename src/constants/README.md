# 🎨 GoalTech Design System

A comprehensive, type-safe design system built with CSS custom properties and TypeScript for consistent theming across the organizational chart application.

## 📁 Structure

```
src/constants/
├── colors.ts          # Color palette and semantic colors
├── typography.ts      # Font scales and component typography
├── spacing.ts         # Spacing scale and component spacing
├── shadows.ts         # Box shadows and elevation levels
├── theme.ts           # Main theme combining all tokens
├── cssVariables.css   # CSS custom properties
├── index.ts           # Consolidated exports
└── README.md          # This documentation
```

## 🚀 Quick Start

### 1. Using CSS Variables (Recommended)

The easiest way to use the design system is through CSS custom properties:

```css
/* In your CSS files */
.my-component {
  padding: var(--space-4);
  background: var(--bg-primary);
  color: var(--color-neutral-950);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
}

/* Responsive design */
@media (max-width: 768px) {
  .my-component {
    padding: var(--space-3);
    font-size: var(--text-sm);
  }
}
```

### 2. Using Theme Hooks in React

```tsx
import React from 'react'
import { useTheme } from '../constants'

const MyComponent: React.FC = () => {
  const theme = useTheme()
  
  return (
    <div style={{
      padding: theme.getSpacing(4),
      backgroundColor: theme.getColor('background.primary'),
      borderRadius: theme.borderRadius.lg,
      boxShadow: theme.getShadow('components.employeeCard.default')
    }}>
      <h2 style={{
        fontSize: theme.typography.fontSize.xl,
        fontWeight: theme.typography.fontWeight.semibold,
        color: theme.getColor('neutral.950')
      }}>
        Themed Component
      </h2>
    </div>
  )
}
```

### 3. Using Utility Functions

```tsx
import { getColor, getSpacing, getShadow } from '../constants'

const cardStyle = {
  padding: getSpacing(4),
  backgroundColor: getColor('background.primary', '#ffffff'),
  borderRadius: '8px',
  boxShadow: getShadow('elevation.md', 'none')
}
```

## 🎨 Design Tokens

### Colors

#### Primary Palette
- `--color-primary-50` to `--color-primary-900`
- Main brand color: `--color-primary-500` (#667eea)

#### Neutral Palette  
- `--color-neutral-50` to `--color-neutral-950`
- Used for text, borders, backgrounds

#### Semantic Colors
- `--color-success` (#38a169)
- `--color-warning` (#f59e0b) 
- `--color-error` (#ef4444)
- `--color-info` (#3b82f6)

#### Hierarchy Colors
- `--hierarchy-level1-bg` to `--hierarchy-level5-bg`
- Gradient backgrounds for employee levels
- Matching border and text colors

#### Background Colors
- `--bg-primary` (white)
- `--bg-secondary` (#fafbfc)
- `--bg-tertiary` (#f8f9fa)
- `--bg-gradient` (brand gradient)

### Typography

#### Font Families
- `--font-primary`: Main UI font (Segoe UI family)
- `--font-mono`: Monospace font for code
- `--font-system`: System font stack

#### Font Sizes
- `--text-xs` (0.75rem) to `--text-4xl` (2.25rem)
- Component-specific sizes:
  - `--employee-name-size` (1.125rem)
  - `--employee-title-size` (0.9375rem)
  - `--page-title-size` (1.75rem)

#### Font Weights
- `--font-light` (300) to `--font-bold` (700)
- `--font-normal` (400) for body text
- `--font-semibold` (600) for labels

#### Line Heights
- `--leading-tight` (1.25)
- `--leading-normal` (1.5) 
- `--leading-relaxed` (1.625)

### Spacing

#### Base Scale
- `--space-0` (0) to `--space-24` (6rem)
- Consistent 4px base unit progression
- `--space-px` (1px) for borders

#### Component Spacing
- `--employee-card-padding` (1.25rem)
- `--controls-padding` (1.25rem 1.5rem)
- `--grid-gap` (1.25rem)
- `--page-header-margin` (1.25rem)

### Shadows

#### Elevation Levels
- `--shadow-xs` to `--shadow-3xl`
- Consistent depth hierarchy
- Material Design inspired

#### Component Shadows
- `--shadow-employee-card` 
- `--shadow-employee-card-hover`
- `--shadow-button`
- `--shadow-toggle-btn`

#### Colored Shadows
- `--shadow-primary-sm` to `--shadow-primary-xl`
- `--shadow-focus` for focus states

### Other Tokens

#### Border Radius
- `--radius-xs` (0.125rem) to `--radius-2xl` (1.5rem)
- `--radius-full` (9999px) for circles

#### Animation
- `--duration-fast` (150ms)
- `--duration-normal` (300ms) 
- `--duration-slow` (500ms)
- `--easing-ease-in-out` for smooth transitions

#### Z-Index
- `--z-dropdown` (10)
- `--z-modal` (40)
- `--z-overlay` (80)

## 🛠️ Advanced Usage

### Custom CSS Properties

You can extend the system by creating your own CSS properties:

```css
:root {
  /* Custom component variables */
  --my-component-width: calc(var(--space-64) + var(--space-8));
  --my-component-bg: var(--color-primary-50);
  --my-component-border: 2px solid var(--color-primary-200);
}

.my-component {
  width: var(--my-component-width);
  background: var(--my-component-bg);
  border: var(--my-component-border);
}
```

### Theming with CSS

Override theme values for different themes:

```css
/* Dark theme example */
[data-theme="dark"] {
  --bg-primary: #1a202c;
  --bg-secondary: #2d3748;
  --color-neutral-950: #f7fafc;
  --color-neutral-100: #4a5568;
}
```

### TypeScript Integration

Get full type safety when accessing theme values:

```tsx
import { Theme, useTheme } from '../constants'

// Type-safe theme access
const theme = useTheme()
const primaryColor: string = theme.colors.primary[500]
const spacing: string = theme.spacing.scale[4]
```

## 📱 Responsive Design

The design system includes responsive utilities:

```css
/* Mobile-first approach */
.responsive-component {
  padding: var(--space-3);
  font-size: var(--text-sm);
}

@media (min-width: 768px) {
  .responsive-component {
    padding: var(--space-6);
    font-size: var(--text-base);
  }
}
```

Breakpoint constants are available:
- `--breakpoint-xs` (320px)
- `--breakpoint-sm` (640px) 
- `--breakpoint-md` (768px)
- `--breakpoint-lg` (1024px)
- `--breakpoint-xl` (1280px)

## ✨ Best Practices

### 1. Always Use Theme Variables
```css
/* ✅ Good */
.component {
  color: var(--color-neutral-700);
  padding: var(--space-4);
}

/* ❌ Avoid */
.component {
  color: #4a5568;
  padding: 16px;
}
```

### 2. Use Semantic Color Names
```css
/* ✅ Good */
.error-message {
  color: var(--color-error);
  background: var(--color-error-50);
}

/* ❌ Avoid */
.error-message {
  color: var(--color-red-500);
  background: var(--color-red-50);
}
```

### 3. Component-Specific Variables
```css
/* ✅ Good - Use component-specific variables when available */
.employee-card {
  padding: var(--employee-card-padding);
  border-radius: var(--employee-card-border-radius);
}

/* ✅ Also good - Fall back to base scale */
.custom-card {
  padding: var(--space-5);
  border-radius: var(--radius-xl);
}
```

### 4. Consistent Shadow Usage
```css
/* ✅ Good - Use elevation scale */
.card { box-shadow: var(--shadow-md); }
.modal { box-shadow: var(--shadow-2xl); }

/* ✅ Good - Use component shadows */
.employee-card { box-shadow: var(--shadow-employee-card); }
.employee-card:hover { box-shadow: var(--shadow-employee-card-hover); }
```

## 🔧 Customization

### Adding New Design Tokens

1. **Add to TypeScript constants:**
```tsx
// In colors.ts
export const colors = {
  // ... existing colors
  brand: {
    50: '#f0f9ff',
    500: '#0ea5e9',
    900: '#0c4a6e'
  }
}
```

2. **Add CSS variables:**
```css
/* In cssVariables.css */
:root {
  --color-brand-50: #f0f9ff;
  --color-brand-500: #0ea5e9;
  --color-brand-900: #0c4a6e;
}
```

3. **Use in components:**
```css
.branded-component {
  background: var(--color-brand-50);
  color: var(--color-brand-900);
  border: 1px solid var(--color-brand-500);
}
```

## 🎯 Benefits

- **Consistency**: All components use the same design tokens
- **Maintainability**: Change theme values in one place
- **Type Safety**: Full TypeScript support with autocomplete
- **Performance**: CSS custom properties are fast and efficient
- **Flexibility**: Easy to create themes and variants
- **Developer Experience**: Great tooling and documentation
- **Accessibility**: Semantic color names and proper contrast
- **Scalability**: Easy to extend and customize

## 📚 Examples

See `src/examples/ThemeExample.tsx` for comprehensive usage examples showing all the different ways to use the design system.

---

**Happy theming!** 🎨✨