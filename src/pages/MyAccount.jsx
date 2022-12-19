import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Auth/AuthContext'
import { ImgProfile } from '../components/containerProfile/Imgprofile/ImgProfile'
import { OptionProfile } from '../components/containerProfile/OptionProfile/OptionProfile'

export const Myaccount = () => {
  const [viewInformation, setViewInformation] = useState(true)
  const [viewOrder, setViewOrder] = useState(false)
  const [viewHistory, setViewHistory] = useState(false)
  const [viewClients, setViewClients] = useState(false)
  const [viewAddProducts, setViewAddProducts] = useState(false)
  const [viewNewUser, setViewNewUser] = useState(false)
  const { user, dispatch } = useContext(AuthContext)
  const { nombre, usuario, avatar } = user;
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
  const view = (select) => {
    console.log(select);
    if (select === "personal") {
      setViewInformation(true)
      setViewOrder(false)
      setViewNewUser(false)
      setViewClients(false)
      setViewAddProducts(false)
      setViewHistory(false)
    }
    if (select === "order") {
      setViewOrder(true)
      setViewInformation(false)
      setViewNewUser(false)
      setViewClients(false)
      setViewAddProducts(false)
      setViewHistory(false)
    }
    if (select === "history") {
      setViewHistory(true)
      setViewInformation(false)
      setViewNewUser(false)
      setViewOrder(false)
      setViewClients(false)
      setViewAddProducts(false)

    }
    if (select === "usuario") {
      setViewNewUser(true)
      setViewInformation(false)
      setViewHistory(false)
      setViewOrder(false)
      setViewClients(false)
      setViewAddProducts(false)
    }
    if (select === "articulo") {
      setViewAddProducts(true)
      setViewInformation(false)
      setViewHistory(false)
      setViewOrder(false)
      setViewClients(false)
      setViewNewUser(false)
    }
    if (select === "clientes") {
      setViewClients(true)
      setViewInformation(false)
      setViewHistory(false)
      setViewOrder(false)
      setViewAddProducts(false)
      setViewNewUser(false)
    }
  }
  return (
    <div>
      <div className='container'>
        <div className="row">
          <div className="col-12 col-md-4">

            <ImgProfile
              avatar={avatar}
              nombre={nombre}
              usuario={usuario}
              widthImg={widthImg}
              user={user}
              dispatch={dispatch}
              view={view}
            />

          </div>
          <OptionProfile
            user={user}
            dispatch={dispatch}
            viewClients={viewClients}
            viewAddProducts={viewAddProducts}
            viewHistory={viewHistory}
            viewInformation={viewInformation}
            viewNewUser={viewNewUser}
            viewOrder={viewOrder}
          />
        </div>

      </div>
    </div>
  )
}
