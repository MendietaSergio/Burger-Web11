import React, { useState,useEffect } from 'react'
import { AddProduct } from '../AddProduct/AddProduct'
import { CreateUser } from '../CreateUser/CreateUser'
import '../Imgprofile/ImgProfile.css'
import { ViewOptions } from './ViewOptions/ViewOptions'
import { ListClients } from '../ListClients/ListClients'
import { PersonalInformation } from '../PersonalInformation/PersonalInformation'
import { PurchaseHistory } from '../PurchaseHistory/PurchaseHistory'
import { PurchaseOrder } from '../PurchaseOrder/PurchaseOrder'

export const OptionProfile = ({user, dispatch}) => {
    const [viewInformation, setViewInformation] = useState(true)
    const [viewOrder, setViewOrder] = useState(false)
    const [viewHistory, setViewHistory] = useState(false)
    const [viewClients, setViewClients] = useState(false)
    const [viewAddProducts, setViewAddProducts] = useState(false)
    const [viewNewUser, setViewNewUser] = useState(false)
    const [admin, setAdmin] = useState(true)
    // const [widthWeb,setWidthWeb] = useState('')
    const [ widthImg, setWidthImg] = useState(window.innerWidth)
      
        useEffect(() => {
          window.addEventListener("resize", handleResize);
      
          return () => {
            window.removeEventListener("resize", handleResize);
          };
        }, [window.innerWidth]);
      
        const handleResize = () => {
          setWidthImg(window.innerWidth);
          console.log("Tamaño de la pantalla => ",widthImg);
        };

    const view = (select) => {
        console.log(select.value);
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
        <div className="col-12 col-md-8 ">
            <div className="container-optionsprofile m-3 py-5">
                <div className='row'>
                    <div className='d-flex justify-content-center'>
                        <ViewOptions 
                        widthImg={widthImg} admin={user.rol} view={view}
                        />
                    </div>
                </div>
            </div>
            <PersonalInformation viewInformation={viewInformation} user={user} dispatch={dispatch} />
            <PurchaseOrder viewOrder={viewOrder} />
            <PurchaseHistory viewHistory={viewHistory} />
            <ListClients viewClients={viewClients} />
            <AddProduct viewAddProducts={viewAddProducts} />
            <CreateUser viewNewUser={viewNewUser} admin={true} />

        </div>
    )
}
