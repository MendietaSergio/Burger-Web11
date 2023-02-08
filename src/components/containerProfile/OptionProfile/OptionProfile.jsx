import React, { useState } from 'react'
import { Productos } from '../../../pages/Productos'
import { FeaturedProduct } from '../../FeaturedProduct/FeaturedProduct'
import { AddProduct } from '../AddProduct/AddProduct'
import { CreateUser } from '../CreateUser/CreateUser'
import '../Imgprofile/ImgProfile.css'
import { ListClients } from '../ListClients/ListClients'
import { PersonalInformation } from '../PersonalInformation/PersonalInformation'
import { PurchaseHistory } from '../PurchaseHistory/PurchaseHistory'
import { PurchaseOrder } from '../PurchaseOrder/PurchaseOrder'

export const OptionProfile = ({
    user,
    dispatch,
    estados
}) => {
    const [success, setSuccess] = useState(false)
    const [newRegister, setNewRegister] = useState(false)
    return (
        <div className="col-12 col-md-8 container_data_user">

            <PersonalInformation estados={estados} user={user} dispatch={dispatch} />
            <PurchaseOrder estados={estados} />
            <PurchaseHistory estados={estados} />
            <CreateUser estados={estados} admin={true} setNewRegister={setNewRegister} />
            <AddProduct estados={estados} setSuccess={setSuccess} success={success}
            />
            <Productos estados={estados} admin={true} cantPages={true}
                setSuccess={setSuccess} success={success}
            />
            <FeaturedProduct estados={estados} viewAdmin={true} user={user} setSuccess={setSuccess} success={success} />
            <ListClients estados={estados} newRegister={newRegister} />
        </div>
    )
}
