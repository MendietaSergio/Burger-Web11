import { useReducer, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { Home } from './pages/Home'
import { Productos } from './pages/Productos'
import { Footer } from './components/Footer/Footer'
import { Detail } from './pages/Detail'
import { LoginPages } from './pages/LoginPages'
import { Cart } from './pages/Cart'
import { Myaccount } from './pages/Myaccount'
import { RegisterPages } from './pages/RegisterPages'
import { ErrorFound } from './pages/ErrorFound'
import { AuthContext } from './Auth/AuthContext'
import { AuthReducer } from './Auth/AuthReducer'
import { CartContextProvider } from './Context/CartContextProvider'
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop'
import { DetectSizeProvider } from './Context/DetectSizeProvider'
import { useConfig } from './hooks/useConfig'
const init = () => {
  return JSON.parse(localStorage.getItem('userBurger')) || {
    logueado: false
  }
}
function App() {
  const [user, dispatch] = useReducer(AuthReducer, {}, init)
  const [status, setStatus] = useState(true)

  const { getConfig, dataConfig, loading } = useConfig()
  useEffect(() => {
    localStorage.setItem("userBurger", JSON.stringify(user, null, 3))
  }, [user])
  useEffect(() => {
    if (status) {
      return getConfig()
    }
  }, [status])

  if (!dataConfig) {
    return <div className='container-loading-home'><div className="nb-spinner"></div></div>
  } else {
    return (
      <AuthContext.Provider
        value={{ user, dispatch }}
      >
        <CartContextProvider>
          <DetectSizeProvider>
            <BrowserRouter>
              <ScrollToTop />
              <div className="container-fluid">
                <Header widthMin={992} loading={loading} dataConfig={dataConfig[0]} />
                <Routes>
                  <Route exact path='/' element={<Home />} />
                  <Route exact path='/productos' element={<Productos cantPages={false} allProducts={true} />} />
                  <Route exact path='/productos/:idCategoria' element={<Productos />} />
                  <Route exact path='/productos/:idCategoria/:idSubcategoria' element={<Productos />} />
                  <Route exact path='/productos/detalle/:idDetail' element={<Detail />} />
                  <Route exact path='/ingresar' element={<LoginPages />} />
                  <Route exact path='/registrarse' element={<RegisterPages />} />
                  <Route exact path='/micuenta/:dataProfile' element={<Myaccount setStatus={setStatus} />} />
                  <Route exact path='/micarrito' element={<Cart />} />
                  <Route exact path='*' element={<ErrorFound />} />
                </Routes>
                <Footer />
              </div>
            </BrowserRouter>
          </DetectSizeProvider>
        </CartContextProvider>
      </AuthContext.Provider>
    )
  }
}

export default App