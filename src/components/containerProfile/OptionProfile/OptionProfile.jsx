import React, { useState } from 'react'
import '../Imgprofile/ImgProfile.css'
import { PersonalInformation } from '../PersonalInformation/PersonalInformation'
import { PurchaseHistory } from '../PurchaseHistory/PurchaseHistory'
import { PurchaseOrder } from '../PurchaseOrder/PurchaseOrder'
export const OptionProfile = () => {
    const [viewInformation, setViewInformation] = useState(true)
    const [viewOrder, setViewOrder] = useState(false)
    const [viewHistory, setViewHistory] = useState(false)
    const [admin, setAdmin] = useState(true)

    const view = (select) => {
        if (select === "personal") {
            setViewInformation(true)
            setViewOrder(false)
            setViewHistory(false)
        }
        if (select === "order") {
            setViewOrder(true)
            setViewInformation(false)
            setViewHistory(false)
        }
        if (select === "history") {
            setViewHistory(true)
            setViewInformation(false)
            setViewOrder(false)
        }
    }
    return (
        <div className="col-12 col-md-8 ">
            <div className="container-optionsprofile m-3 py-5">
                <div className='row'>
                    <div className='d-flex justify-content-center'>
                        <ul className='list-inline mb-0'>
                            <li className='list-inline-item' onClick={() => view("personal")}>Datos personales</li>
                            <li className='list-inline-item' onClick={() => view('order')}>Ordenes de compras</li>
                            <li className='list-inline-item' onClick={() => view('history')}>Historial</li>
                            {admin ? (
                                <>
                                    <li className='list-inline-item' onClick={() => view('usuario')}>Nuevo usuario</li>
                                    <li className='list-inline-item' onClick={() => view('articulo')}>Nuevo articulo</li>
                                    <li className='list-inline-item' onClick={() => view('clientes')}>Lista de clientes</li>
                                </>
                            ) : (null)}
                        </ul>
                    </div>
                </div>
            </div>
            <PersonalInformation viewInformation={viewInformation} />
            <PurchaseOrder viewOrder={viewOrder} />
            <PurchaseHistory viewHistory={viewHistory} />
        </div>
    )
}
