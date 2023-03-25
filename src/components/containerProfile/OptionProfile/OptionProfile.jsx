import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Productos } from '../../../pages/Productos'
import { optionsProfile } from '../../../utils/OptionsProfile'
import { FeaturedProduct } from '../../FeaturedProduct/FeaturedProduct'
import { AddProduct } from '../AddProduct/AddProduct'
import { CreateUser } from '../CreateUser/CreateUser'
import { DesignsPages } from '../Configurations/DesignsPages'
import '../Imgprofile/ImgProfile.css'
import { ListClients } from '../ListClients/ListClients'
import { PersonalInformation } from '../PersonalInformation/PersonalInformation'
import { PurchaseHistory } from '../PurchaseHistory/PurchaseHistory'
import { PurchaseOrder } from '../PurchaseOrder/PurchaseOrder'

export const OptionProfile = ({
    user,
    dispatch,
    setStatus
}) => {
    const [success, setSuccess] = useState(false)
    const [newRegister, setNewRegister] = useState(false)
    const { dataProfile } = useParams()
    const navigation = useNavigate()
    useEffect(() => {
        let found = optionsProfile.find(item => {
            return item.name === dataProfile
        })
        if (found === undefined) {
            navigation('/micuenta/datos-personales')
        }
    }, [dataProfile])


    return (
        <div className="col-12 col-md-8 container_data_user">
            {dataProfile === "datos-personales" ? (
                <PersonalInformation
                    user={user} dispatch={dispatch} />
            ) : null}
            {dataProfile === "orden-de-compras" ? (
                <PurchaseOrder
                />
            ) : null}
            {dataProfile === "historial-de-pedidos" ? (
                <PurchaseHistory
                />
            ) : null}
            {dataProfile === "nuevo-usuario" ? (
                <CreateUser
                    admin={true} setNewRegister={setNewRegister} />
            ) : null}
            {dataProfile === "nuevo-articulo" ? (
                <AddProduct
                    setSuccess={setSuccess} success={success}
                />
            ) : null}
            {dataProfile === "lista-de-articulos" ? (
                <Productos
                    allProducts={true}
                    admin={true} cantPages={true}
                    setSuccess={setSuccess} success={success}
                />
            ) : null}
            {dataProfile === "articulos-destacados" ? (
                <FeaturedProduct
                    viewAdmin={true} user={user} setSuccess={setSuccess} success={success} />
            ) : null}
            {dataProfile === "lista-de-clientes" ? (
                <ListClients
                    newRegister={newRegister} />
            ) : null}
            {dataProfile === "configuracion" ? (
                <DesignsPages  setStatus={setStatus}/>
            ) : null}

        </div>
    )
}
