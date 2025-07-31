import React from 'react'
import OrgChart from './components/OrgChart'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="page-header">
        <h1>GoalTech Organizational Chart</h1>
        <p className="company-info">Modern React + TypeScript | Real Employee Data</p>
      </header>
      
      <main className="main-content">
        <OrgChart />
      </main>
    </div>
  )
}

export default App