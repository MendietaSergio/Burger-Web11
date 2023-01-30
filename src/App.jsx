import react, { useState, useReducer, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Header } from './components/Header/Header'
import { Home } from './pages/Home'
import { Productos } from './pages/Productos'
import { Footer } from './components/Footer/Footer'
import { Detail } from './pages/Detail'
import { LoginPages } from './pages/LoginPages'
import { Cart } from './pages/Cart'
import { RegisterPages } from './pages/RegisterPages'
import { Myaccount } from './pages/Myaccount'
import { ErrorFound } from './pages/ErrorFound'
import { AuthContext } from './Auth/AuthContext'
import { AuthReducer } from './Auth/AuthReducer'
import { CartContextProvider } from './Context/CartContextProvider'

const init = () => {
  return JSON.parse(localStorage.getItem('userBurger')) || {
    logueado: false
  }
}

function App() {

  const [user, dispatch] = useReducer(AuthReducer, {}, init)

  useEffect(() => {
    localStorage.setItem("userBurger", JSON.stringify(user, null, 3))
  }, [user])
  const [widthImg, setWidthImg] = useState(window.innerWidth)
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);

  const handleResize = () => {
    setWidthImg(window.innerWidth);
  };
  return (
    <AuthContext.Provider
      value={{ user, dispatch }}
    >
      <CartContextProvider>
        <BrowserRouter>
          <div className="container-fluid">
            <Header setWidthImg={setWidthImg} widthImg={widthImg} />
            <Routes>
              <Route path='/' element={<Home setWidthImg={setWidthImg} widthImg={widthImg} />} />
              <Route path='/productos' element={<Productos cantPages={false} />} />
              <Route path='/productos/:idCategoria' element={<Productos />} />
              <Route path='/productos/:idCategoria/:idSubcategoria' element={<Productos />} />
              <Route path='/productos/detalle/:idDetail' element={<Detail />} />
              <Route path='/ingresar' element={<LoginPages />} />
              <Route path='/registrarse' element={<RegisterPages />} />
              <Route path='/micuenta' element={<Myaccount />} />
              <Route path='/micarrito' element={<Cart />} />
              <Route path='*' element={<ErrorFound />} />
            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
      </CartContextProvider>
    </AuthContext.Provider>
  )
}

export default App