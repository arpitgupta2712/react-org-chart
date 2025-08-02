import React from 'react'
import OrgChart from './components/OrgChart'
import { AppHeader } from './components/AppHeader'
import { EmployeeDataProvider } from './contexts/EmployeeDataContext'
import './App.css'

function App() {
  return (
    <EmployeeDataProvider>
      <div className="app">
        <AppHeader />
        
        <main className="main-content">
          <OrgChart />
        </main>
      </div>
    </EmployeeDataProvider>
  )
}

export default App