import React from 'react'
import { ViewOptions } from '../OptionProfile/ViewOptions/ViewOptions'
import './ImgProfile.css'

export const ImgProfile = ({
    avatar,
    nombre,
    usuario,
    widthImg,
    user,
    view }) => {

    return (
        // <div className="col-12 col-md-4">
        <>
            <div className='container-profile m-3 py-5 '>
                <img src={avatar} alt="perfil" />
                <h4>{usuario}</h4>
                <span>{nombre}</span>
            </div>
            <div className="container-optionsprofile">
                <div className='row'>
                    <div className={`d-flex justify-content-center`}>
                        <ViewOptions
                            widthImg={widthImg} admin={user.rol} view={view}
                        />
                    </div>
                </div>
            </div>
        </>
        // </div>

    )
}
