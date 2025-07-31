import React from 'react'
import OrgChart from './components/OrgChart'
import { AppHeader } from './components/AppHeader'
import './App.css'

function App() {
  return (
    <div className="app">
      <AppHeader />
      
      <main className="main-content">
        <OrgChart />
      </main>
    </div>
  )
}

export default App