import React from 'react'
import { LoadingState, Spinner } from '../styles/StateStyles'

export const LoadingStateComponent: React.FC = () => {
  return (
    <LoadingState>
      <Spinner />
      <h3>Loading Organization Chart...</h3>
      <p>Please wait while we fetch the employee data</p>
    </LoadingState>
  )
}