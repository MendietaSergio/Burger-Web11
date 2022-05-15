import React from 'react'
import './ImgProfile.css'
export const ImgProfile = ({avatar,nombre, usuario}) => {
    return (
        <div className="col-12 col-md-4">
            <div className='container-profile m-3 py-5 '>
                <img src={avatar} alt="perfil" />
                <h4>{usuario}</h4>
                <span>{nombre}</span>
            </div>
        </div>

    )
}
