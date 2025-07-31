// Example component showing how to use the theme constants

import React from 'react'
import { useTheme, styled, getColor, getSpacing } from '../constants'

// Example 1: Using useTheme hook for accessing theme values
const ThemeShowcase: React.FC = () => {
  const theme = useTheme()
  
  return (
    <div style={{
      padding: theme.getSpacing(4),
      background: theme.getColor('background.primary'),
      borderRadius: theme.borderRadius.lg,
      boxShadow: theme.getShadow('components.employeeCard.default')
    }}>
      <h2 style={{
        color: theme.getColor('neutral.950'),
        fontSize: theme.typography.fontSize.xl,
        marginBottom: theme.getSpacing(3)
      }}>
        Theme Showcase
      </h2>
      
      <div style={{ ...styled.flexBetween, marginBottom: theme.getSpacing(2) }}>
        <span>Primary Color:</span>
        <div style={{
          width: 24,
          height: 24,
          backgroundColor: theme.getColor('primary.500'),
          borderRadius: theme.borderRadius.sm
        }} />
      </div>
    </div>
  )
}

// Example 2: Using CSS variables in inline styles
const CSSVariablesExample: React.FC = () => {
  return (
    <div style={{
      // Using CSS custom properties directly
      padding: 'var(--space-6)',
      background: 'var(--bg-secondary)',
      border: '1px solid var(--color-neutral-200)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-lg)',
      color: 'var(--color-neutral-950)'
    }}>
      <h3 style={{
        fontSize: 'var(--text-lg)',
        fontWeight: 'var(--font-semibold)',
        marginBottom: 'var(--space-3)',
        color: 'var(--color-primary-600)'
      }}>
        Using CSS Variables
      </h3>
      
      <p style={{
        fontSize: 'var(--text-sm)',
        lineHeight: 'var(--leading-relaxed)',
        color: 'var(--color-neutral-700)'
      }}>
        This approach works great for consistent styling across components.
      </p>
    </div>
  )
}

// Example 3: Using utility functions
const UtilityExample: React.FC = () => {
  const cardStyle = {
    padding: getSpacing(5),
    backgroundColor: getColor('background.primary', '#ffffff'),
    borderRadius: '8px',
    margin: getSpacing(2)
  }
  
  return (
    <div style={cardStyle}>
      <h3>Utility Functions</h3>
      <p>Quick access to theme values with fallbacks</p>
    </div>
  )
}

// Example 4: Using styled patterns
const StyledPatternsExample: React.FC = () => {
  return (
    <div style={{
      ...styled.flexColumn,
      gap: 'var(--space-4)',
      padding: 'var(--space-6)'
    }}>
      <div style={{
        ...styled.flexBetween,
        padding: styled.space.md,
        background: styled.bg.secondary,
        borderRadius: styled.radius.lg,
        boxShadow: styled.shadow.sm
      }}>
        <span style={{ color: styled.text.primary }}>Flex Between</span>
        <span style={{ color: styled.text.accent }}>Pattern</span>
      </div>
      
      <div style={{
        ...styled.flexCenter,
        height: '80px',
        background: styled.bg.tertiary,
        borderRadius: styled.radius.md,
        color: styled.text.secondary
      }}>
        Centered Content
      </div>
    </div>
  )
}

// Main example component
const ThemeExamples: React.FC = () => {
  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: 'var(--space-8)',
      fontFamily: 'var(--font-primary)'
    }}>
      <h1 style={{
        fontSize: 'var(--text-3xl)',
        fontWeight: 'var(--font-bold)',
        color: 'var(--color-primary-600)',
        marginBottom: 'var(--space-8)',
        textAlign: 'center'
      }}>
        🎨 Theme System Examples
      </h1>
      
      <div style={{
        display: 'grid',
        gap: 'var(--space-6)',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
      }}>
        <ThemeShowcase />
        <CSSVariablesExample />
        <UtilityExample />
        <StyledPatternsExample />
      </div>
      
      <div style={{
        marginTop: 'var(--space-12)',
        padding: 'var(--space-6)',
        background: 'var(--color-info)',
        color: 'var(--bg-primary)',
        borderRadius: 'var(--radius-lg)',
        textAlign: 'center'
      }}>
        <h2 style={{ marginBottom: 'var(--space-3)' }}>
          ✨ Consistent Design System
        </h2>
        <p>
          All components now use the same color palette, spacing scale, 
          typography system, and shadow hierarchy for perfect consistency!
        </p>
      </div>
    </div>
  )
}

export default ThemeExamples