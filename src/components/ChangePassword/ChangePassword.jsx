import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useChangePassword } from '../../hooks/useChangePassword'

import { validations } from '../../utils/ValidationsLogin'
export const ChangePassword = ({
    setViewChangePass,
}) => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { handleChangePass } = useChangePassword()
    return (
        <div>
            <form onSubmit={handleSubmit(handleChangePass)} className="form-login">
                <div>
                    <label name="email">Nombre de usuario o correo electrónico <small>*</small> </label>
                    <input {...register('email', validations.email)} className={errors.email ? ("form-control is-invalid") : ("form-control")} type="text" />
                    {errors.email ? <small className='text-danger'>{errors.email.message}</small> : null}
                </div>
                <div className='d-flex flex-row justify-content-around my-3'>
                    <button type='submit' className='btn-toSend' >Enviar</button>
                    <button type='submit' className='btn-toCancel' onClick={() => setViewChangePass(false)}>Volver
                    </button>
                </div>
            </form>
            <div className='form-info-changePass'>
                <span className=''>Ingrese su dirección de correo electrónico. Recibirá un correo con instrucciones para reestablecer su contraseña.</span>
            </div>
        </div>
    )
}
