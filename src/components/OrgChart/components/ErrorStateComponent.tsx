import React from 'react'
import { ErrorState } from '../styles/StateStyles'

interface ErrorStateComponentProps {
  error: string
}

export const ErrorStateComponent: React.FC<ErrorStateComponentProps> = ({ error }) => {
  return (
    <ErrorState>
      <h3>Failed to load data</h3>
      <p>{error}</p>
      <button onClick={() => window.location.reload()}>Try Again</button>
    </ErrorState>
  )
}