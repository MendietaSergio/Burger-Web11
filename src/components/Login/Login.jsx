import React, { useState, useContext } from 'react'
import { Title } from '../Title/Title'
import { useForm } from 'react-hook-form'
import './Login.css'
import { validations } from '../../utils/ValidationsLogin'
import axios from 'axios'
import { Link, Navigate } from 'react-router-dom'
import { Message } from '../Message/Message'
import { AuthContext } from '../../Auth/AuthContext'
import { types } from '../../Types/Types'
import { ChangePassword } from '../ChangePassword/ChangePassword'

export const Login = () => {
    const { dispatch } = useContext(AuthContext)
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const [succes, setSucces] = useState(false)
    const [loading, setLoading] = useState(false)
    const [changeClassName, setChangeClassName] = useState(false)
    const [viewMessage, setViewMessage] = useState(false)
    const [message, setMessage] = useState('')
    const [viewChangePass, setViewChangePass] = useState(false)
    const submit = async (data) => {
        setLoading(true)
        const { email, password } = data;
        await axios.post('http://localhost:3001/api/auth/signin', {
            email,
            password
        })
            .then(res => {
                if (res.data.ok) {
                    localStorage.setItem('userBurger', JSON.stringify(res.data.logeado, null))
                    handleLogin(res.data.logeado)
                    setMessage("Logeando...")
                    setChangeClassName(true)
                    setTimeout(() => {
                        setLoading(false)
                        setViewMessage(true)

                    }, 2000)
                    setTimeout(() => setSucces(true), 5000)
                } else {
                    setMessage(res.data.message)
                    setChangeClassName(false)
                    setTimeout(() => {
                        setLoading(false)
                        setViewMessage(true)
                    }, 2000)
                }
            })
            .finally(() => {
                setTimeout(() => {
                    setViewMessage(false)
                    setMessage('')
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
            {succes && <Navigate to='/' />}
            <div className="container-message-login">

                {viewMessage ?
                    (<Message
                        message={message}
                        viewMessage={viewMessage}
                        setViewMessage={setViewMessage}
                        className={changeClassName ? 'alert-success' : 'alert-danger'}
                    />) : (null)
                }
            </div>
            <div className='container-form'>
                <div className='container-form-body'>
                    <Title title="Mi cuenta" bar={false} />
                    {viewChangePass ? (
                        <ChangePassword
                            setViewChangePass={setViewChangePass}
                        />
                    ) : (
                        <>
                            <div className='form-subTitle'>
                                <h5 className=''>Acceder</h5>
                            </div>
                            <form onSubmit={handleSubmit(submit)} className="form-login">
                                <div>
                                    <label name="email">Nombre de usuario o correo electrónico <small>*</small> </label>
                                    <input {...register('email', validations.email)} className={errors.email ? ("form-control is-invalid") : ("form-control")} type="text" />
                                    {errors.email ? <small className='text-danger'>{errors.email.message}</small> : null}
                                </div>
                                <div>
                                    <label name="password">Contraseña <small>*</small></label>
                                    <input {...register('password', validations.password)} className={errors.password ? ("form-control is-invalid") : ("form-control")} type="password" />
                                    {errors.password ? <small className='text-danger'>{errors.password.message}</small> : null}
                                </div>
                                <div className='d-flex justify-content-start align-items-baseline'>
                                    <input name="rememberMe" type="checkbox" />
                                    <label htmlFor='rememberMe' name="rememberMe" className='px-2'>Recuérdame</label>
                                </div>
                                <div>
                                    <button type='submit' className='btn-toAccess' >Acceder
                                        {loading ? (<i className="fas fa-spinner fa-pulse"></i>) : null}
                                    </button>
                                </div>
                                <div>
                                    <a className='info-password' onClick={() => setViewChangePass(true)} >¿Olvidaste tu contraseña?</a>
                                </div>
                                <div>
                                    <small >¿Sos nuevo? <Link className='info-register' to='/registrarse' >¡Registrate!</Link></small>
                                </div>
                            </form>
                        </>

                    )
                    }

                </div >
            </div >
        </>
    )
}
