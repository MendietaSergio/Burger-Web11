import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import './FormOrder.css'
import imgMP from '../../../Img/mercadopago-logo.png'
import imgEfec from '../../../Img/pago-en-efectivo.png'
import { validationFormOrder } from '../../../utils/ValidationFormOrder'
import { CartContextUse } from '../../../Context/CartContextProvider'
import { MessageWsp } from '../../../utils/MessageWsp'
import { Title } from '../../Title/Title'
export const FormOrder = ({ priceTotal, data, dataConfig }) => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [wayToPay, setWayToPay] = useState({
        abonaCon: "efectivo",
        paga: true
    })

    const [turned, setTurned] = useState(0)
    const { clear, cart } = CartContextUse()

    const handleSelect = ({ target }) => {
        if (target.name === "efectivo") {
            setWayToPay({ abonaCon: target.name, paga: true })
        } else {
            setWayToPay({ abonaCon: target.name, paga: false })
        }
    };
    const sendWsp = (data) => {
        data.abonaCon = wayToPay.abonaCon
        if (wayToPay.abonaCon === "mercadopago") {
            data.vuelto = 0
        } else {
            data.vuelto = turned
        }
        data.precioTotal = priceTotal
        window.location.href = MessageWsp({ data, cart, dataConfig });
    }
    return (
        <div className='container'>
            <Title title="Formulario de contacto" />
            <form onSubmit={handleSubmit(sendWsp)} className="form-order my-5">
                <div className='row'>
                    <div className="col-12  col-md-6">
                        <label name="nombre">
                            Nombre <small>*</small>
                        </label>
                        <input
                            name="nombre"
                            className={
                                errors.nombre ? "form-control is-invalid" : "form-control"
                            }
                            type="text"
                            {...register("nombre", validationFormOrder.nombre)}
                        />
                        <div className={`container-errors`}>
                            {errors.nombre ? (
                                <small className="text-danger">
                                    {errors.nombre.message}
                                </small>
                            ) : null}
                        </div>
                    </div>

                    <div className="col-12  col-md-6">
                        <label name="nombre">
                            Telefono <small>*</small>{" "}
                        </label>
                        <input
                            name="telefono"
                            className={
                                errors.telefono ? "form-control is-invalid" : "form-control"
                            }
                            type="number"
                            {...register("telefono", validationFormOrder.telefono)}
                        />
                        <div className={`container-errors`}>
                            {errors.telefono ? (
                                <small className="text-danger">
                                    {errors.telefono.message}
                                </small>
                            ) : null}
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-12  col-md-6">
                        <label name="direccion">
                            Direccion <small>*</small>{" "}
                        </label>
                        <input
                            name="direccion"
                            className={
                                errors.direccion ? "form-control is-invalid" : "form-control"
                            }
                            type="text"
                            {...register("direccion", validationFormOrder.direccion)}
                        />
                        <div className={`container-errors`}>
                            {errors.direccion ? (
                                <small className="text-danger">
                                    {errors.direccion.message}
                                </small>
                            ) : null}
                        </div>
                    </div>
                    <div className="col-12  col-md-6">
                        <label name="entrecalles">
                            Entrecalles <small>*</small>{" "}
                        </label>
                        <input
                            name="entrecalles"
                            className={
                                errors.entrecalles ? "form-control is-invalid" : "form-control"
                            }
                            type="text"
                            {...register("entrecalles", validationFormOrder.entrecalles)}
                        />
                        <div className={`container-errors`}>
                            {errors.entrecalles ? (
                                <small className="text-danger">
                                    {errors.entrecalles.message}
                                </small>
                            ) : null}
                        </div>
                    </div>
                </div>
                <div className='col-12 col-md-6 m-auto'>
                    <div className="wrapper d-flex">
                        <div className="custom-control custom-radio iconSelect mr-2">
                            <input
                                type="radio"
                                id="efectivo"
                                name="efectivo"
                                className="custom-control-input"
                                onClick={(e) => handleSelect(e)}
                                defaultChecked={wayToPay.paga ? true : false}
                            />
                            <label className="custom-control-label" htmlFor="efectivo">
                                <img src={imgEfec} alt="" className="img-checkbox" />
                                <div className="mt-1">Efectivo</div>
                            </label>
                        </div>
                        <div className="custom-control custom-radio iconSelect ml-2">
                            <input
                                type="radio"
                                id="mercadopago"
                                name="mercadopago"
                                onClick={(e) => handleSelect(e)}
                                defaultChecked={wayToPay.paga ? false : true}
                                className="custom-control-input"
                            />
                            <label className="custom-control-label" htmlFor="mercadopago">
                                <img src={imgMP} alt="" className="img-checkbox-mp" />

                                <div className="mt-1">MercadoPago</div>
                            </label>
                        </div>
                    </div>
                </div>
                {wayToPay.abonaCon === "efectivo" && (
                    <div className='row'>
                        <div className="col-12  col-md-6">
                            <label name="pagaCon">
                                Paga con: <small>*</small>{" "}
                            </label>
                            <input
                                name="pagaCon"
                                className={
                                    errors.pagaCon ? "form-control is-invalid" : "form-control"
                                }
                                type="number"
                                {...register("pagaCon", validationFormOrder.pagaCon)}
                                defaultValue={data.envio ? data.valorEnvio + priceTotal : priceTotal}
                                min={data.envio ? data.valorEnvio + priceTotal : priceTotal}
                                onChange={(e) => setTurned(e.target.value - (data.envio ? data.valorEnvio + priceTotal : priceTotal))}
                            />
                            <div className={`container-errors`}>
                                {errors.pagaCon ? (
                                    <small className="text-danger">
                                        {errors.pagaCon.message}
                                    </small>
                                ) : null}
                            </div>
                        </div>
                        <div className='col-12 col-md-6'>
                            <label htmlFor="vuelto">Vuelto:</label>
                            <input type="number"
                                className={"form-control"}
                                disabled
                                value={turned}
                            />
                        </div>
                    </div>
                )}
                <div className="d-flex flex-row justify-content-around my-4">
                    <div>
                        <button type={"submit"} className="btn-Finish">
                            Hacer el pedido
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
