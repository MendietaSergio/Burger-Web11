import react, { useState } from 'react'
import { Header } from './components/Header/Header'
import { Home } from './pages/Home'
function App() {
  return (
    <div className="container-fluid">
      <Header/>
      <Home/>
    </div>
  )
}

export default App
