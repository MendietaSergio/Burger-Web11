import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { types } from '../../../Types/Types'
import { validations } from '../../../utils/ValidationsRegister'
import { Message } from '../../Message/Message'

import './PersonalInformation.css'
export const PersonalInformation = ({ estados, user, dispatch }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const [viewMessage, setViewMessage] = useState(false)
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [succes, setSucces] = useState(false)
    const { dataProfile } = useParams()
    console.log("peronslainformtion ", dataProfile)
    const { nombre, email, _id, usuario, domicilio, descripcion } = user;
    const submit = async (data) => {
        setViewMessage(false)
        setMessage('')
        const { nombre, usuario, email, domicilio, descripcion } = data;
        await axios.put(`http://localhost:3001/api/user/${_id}`, {
            nombre,
            usuario,
            email,
            domicilio,
            descripcion
        })
            .then(res => {
                setLoading(true)
                if (res.data.ok) {
                    localStorage.setItem('userBurger', JSON.stringify(res.data.logeado, null))
                    handleLogin(res.data.logeado)
                    setMessage('Datos actualizados..!')
                    setSucces(true)
                    setTimeout(() => {
                        setLoading(false)
                        setViewMessage(true)
                    }, 2000)

                } else {
                    setLoading(!loading)
                    setMessage(res.data.message)
                    setMessage('Error al actualizar datos!')
                    setSucces(false)

                    setTimeout(() => {
                        setViewMessage(true)
                        setLoading(false)
                    }, 2000)
                }
            })
            .finally(() => {
                setTimeout(() => {
                    setViewMessage(false)
                }, 5000)
            })
    }
    const handleLogin = (data) => {
        dispatch({
            type: types.login,
            payload: {
                ...data
            }
        })
    }
    return (
        <>

            <div className="container-message">
                {viewMessage ?
                    (<Message
                        message={message}
                        viewMessage={viewMessage}
                        setViewMessage={setViewMessage}
                        className={succes ? 'alert-success' : 'alert-danger'} />) : (null)
                }
            </div>
            <div className="container-form">
                <h1 className='text-center my-4'>Datos personales</h1>

                <form onSubmit={handleSubmit(submit)} className="form-personalUpdate">
                    <div className='row'>
                        <div className='col-12  col-md-6'>
                            <label name="nombre">Nombre completo <small>*</small> </label>
                            <input
                                name="nombre"
                                className={errors.nombre ? ("form-control is-invalid") : ("form-control")}
                                type="text"
                                {...register('nombre', validations.nombre)}
                                defaultValue={nombre}
                            />
                            <div className={`container-errors`}>
                                {errors.nombre ? <small className='text-danger'>{errors.nombre.message}</small> : null}
                            </div>
                        </div>
                        <div className='col-12  col-md-6'>
                            <label name="usuario">Usuario <small>*</small> </label>
                            <input
                                name="usuario"
                                className="form-control"
                                type="text"
                                defaultValue={usuario}
                                disabled='true'
                            />
                        </div>
                        <div className='col-12 col-md-6'>
                            <label name="email">Email <small>*</small> </label>
                            <input
                                name="email"
                                className="form-control"
                                type="email"
                                defaultValue={email}
                                disabled='true'
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 col-md-8'>
                            <label name="domicilio">Domicilio
                                {domicilio === undefined ? <small> *</small> : (null)}
                            </label>
                            <input
                                name="domicilio"
                                className={errors.domicilio ? ("form-control is-invalid") : ("form-control")}
                                type="text"
                                defaultValue={domicilio}
                                {...register('domicilio', validations.domicilio)}
                            />
                            <div className={`container-errors`}>
                                {errors.domicilio ? <small className='text-danger'>{errors.domicilio.message}</small> : null}
                            </div>
                        </div>
                        <div className='col-12 col-md-12'>
                            <label name="descripcion">Descripcion</label>
                            <textarea
                                name="descripcion"
                                className={errors.descripcion ? ("form-control is-invalid") : ("form-control")} type="text"
                                maxLength="500"
                                minLength="20"
                                placeholder='Deje detalles del domicilio...'
                                {...register('description', validations.descripcion)}
                                defaultValue={descripcion}
                            />
                            <div className={`container-errors`}>
                                {errors.description ? <small className='text-danger'>{errors.descripcion.message}</small> : null}
                            </div>
                        </div>
                    </div>
                    <div className='d-flex flex-row justify-content-around my-3'>
                        <div>
                            <button type='submit' className='btn-toUpdate' >Actualizar{" "}
                                {loading ? (<i className="fas fa-spinner fa-pulse"></i>) : null}
                            </button>
                        </div>
                    </div>
                </form>
            </div >
        </>
    )
}
