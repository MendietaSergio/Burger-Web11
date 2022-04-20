import React from 'react'
import { Title } from '../Title/Title'
import './Login.css'
export const Login = ({setViewRegister}) => {
    return (
        <div className='container-form'>
            <div className='container-form-body'>
                <Title title="Mi cuenta" bar={false} />
                <div className='form-subTitle'>
                    <h5 className=''>Acceder</h5>
                </div>
                <form action="" className="form-login">
                    <label name="usuario">Nombre de usuario o correo electrónico <small>*</small> </label>
                    <input name="usuario" className="form-control" type="text" />
                    <label name="password">Contraseña <small>*</small></label>
                    <input name="password" className="form-control" type="text" />
                    <div className='d-flex justify-content-start align-items-baseline'>
                        <input name="rememberMe" type="checkbox" />
                        <label htmlFor='rememberMe' name="rememberMe" className='px-2'>Recuérdame</label>
                    </div>
                    <div>
                        <button type='submit' className='btn-toAccess' >Acceder</button>
                    </div>
                    <div>
                        <small className='info-password'>¿Olvidaste tu contraseña?</small>
                    </div>
                    <div>
                        <small >¿Sos nuevo? <span className='info-register' onClick={() =>setViewRegister(false)} >¡Registrate!</span></small>
                    </div>
                </form>
            </div>
        </div>
    )
}
