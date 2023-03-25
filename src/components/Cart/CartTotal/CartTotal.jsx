import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useConfig } from '../../../hooks/useConfig'
import { SkeletonCard } from '../../Skeleton/SkeletonCard'
import { FormOrder } from '../FormOrder/FormOrder'
import './CartTotal.css'
export const CartTotal = ({ priceTotal, viewCartModal, clear, setShowCartList }) => {
    const [data, setData] = useState(null)
    const [viewForm, setViewForm] = useState(false)
    const {
        getConfig,
        dataConfig,
        loading
    } = useConfig()
    useEffect(() => {
        getConfig()
    }, [])
    useEffect(() => {
        if (dataConfig) {
            setData(dataConfig[0])
        }
    }, [dataConfig])
    const deleteCart = () => {
        setShowCartList(false)
        Swal.fire({
            title: '¿Vaciarlo?',
            text: "¿Estas seguro que quieres vaciar el arrito?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, vaciar!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Vaciado!',
                    'Carrito vaciado...',
                    'success'
                )
                    .then(() => clear())
            }
        })
    }
    if (viewCartModal) {
        return (
            <>
                {data === null ? <SkeletonCard viewEnvio={true} /> : (
                    <>
                        <div className="col-12 container-itemcart-modal">
                            <span>Envío:</span>
                            <span>${data.envio ? data.valorEnvio : 'Sin cargo'}</span>
                        </div>
                        <div className="col-12 container-itemcart-modal">
                            <span>Total:</span>
                            {data.envio ? (
                                <span>${priceTotal + data.valorEnvio}</span>
                            ) : (
                                <span>${priceTotal}, 0</span>
                            )}
                        </div>
                    </>
                )}
                <div className="col-12 container-btncart-modal">
                    <button type='submit' className='btn-toAccess my-2' ><Link className='btn-viewCart' to="/micarrito" onClick={() => setShowCartList(false)}>Ver carrito</Link></button>
                    <button type='submit' className='btn-toAccess my-2' onClick={() => deleteCart()} >Vaciar carrito</button>
                </div>
            </>
        )
    } else {

        return (
            <>
                <div className='col-12 '>
                    <div className="container-cartTotal mt-5">
                        {data === null ? <span>cargando...</span> : (
                            <>
                                <div className="container-cartTotal-section">
                                    <h5 className=''>Total del carrito</h5>
                                </div>
                                <div className='container-cartTotal-info'>
                                    <div className="">
                                        <span>Envío:</span>
                                        <span>${data.envio ? data.valorEnvio : 'Sin cargo'}</span>
                                    </div>
                                    <div className="">
                                        <span>Total:</span>
                                        {data.envio ? (
                                            <span>${priceTotal + data.valorEnvio}</span>
                                        ) : (
                                            <span>${priceTotal}, 0</span>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div >
                <FormOrder priceTotal={priceTotal} data={data} dataConfig={dataConfig} />
            </>
        )
    }
}
