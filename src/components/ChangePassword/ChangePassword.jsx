import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { validations } from '../../utils/ValidationsLogin'
export const ChangePassword = ({
    setViewChangePass,

}) => {
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const handleChangePass = async (data) => {
        const { email } = data
        await axios.get(`http://localhost:3001/api/user/changepass/${email}`)
            .then((resp) => {
                const { data } = resp;
                if (data.ok) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `${data.msj}`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Do you want to continue',
                        icon: 'error',
                        confirmButtonText: 'Cool'
                    })
                }
            })
    }

    return (
        <div>
            <form onSubmit={handleSubmit(handleChangePass)} className="form-login">
                <div>
                    <label name="email">Nombre de usuario o correo electrónico <small>*</small> </label>
                    <input {...register('email', validations.email)} className={errors.email ? ("form-control is-invalid") : ("form-control")} type="text" />
                    {errors.email ? <small className='text-danger'>{errors.email.message}</small> : null}
                </div>
                <div className='d-flex flex-row justify-content-around my-3'>
                    <button type='submit' className='btn-toSend' >Enviar
                        {loading ? (<i className="fas fa-spinner fa-pulse"></i>) : null}
                    </button>
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
