import React, { useState, useEffect } from 'react'
import { Productos } from '../../../pages/Productos'
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
    viewAddProducts,
    viewClients,
    viewHistory,
    viewInformation,
    viewNewUser,
    viewOrder,
    viewListProducts
}) => {
    return (
        <div className="col-12 col-md-8 container_data_user">

            <PersonalInformation viewInformation={viewInformation} user={user} dispatch={dispatch} />
            <PurchaseOrder viewOrder={viewOrder} />
            <PurchaseHistory viewHistory={viewHistory} />
            <ListClients viewClients={viewClients} />
            <AddProduct viewAddProducts={viewAddProducts} />
            <CreateUser viewNewUser={viewNewUser} admin={true} />
            <Productos viewListProducts={viewListProducts} admin={true} cantPages={true} />
        </div>
    )
}
