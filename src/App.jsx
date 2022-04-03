import react, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Header } from './components/Header/Header'
import { Home } from './pages/Home'
import { Productos } from './pages/Productos'
import { Footer } from './components/Footer/Footer'
import { Detail } from './pages/Detail'
import { MyAccount } from './pages/MyAccount'
import { Cart } from './pages/Cart'

function App() {
  return (
    <BrowserRouter>
      <div className="container-fluid">
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/productos' element={<Productos />} />
          <Route path='/productos/:idDetail' element={<Detail />} />
          <Route path='/ingresar' element={<MyAccount/>} />
          <Route path='/carrito' element={<Cart/>} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
