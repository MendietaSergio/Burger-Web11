import React, { useContext } from 'react'
import { AuthContext } from '../Auth/AuthContext'
import { ImgProfile } from '../components/containerProfile/Imgprofile/ImgProfile'
import { OptionProfile } from '../components/containerProfile/OptionProfile/OptionProfile'

export const Myaccount = () => {
  const { user, dispatch } = useContext(AuthContext)
  const { nombre, usuario, avatar} = user;
  return (
    <div>
      <div className='container'>
        <div className="row">
          <ImgProfile
            avatar={avatar}
            nombre={nombre}
            usuario={usuario} />
          <OptionProfile
            user={user}
            dispatch={dispatch}
          />
        </div>

      </div>
    </div>
  )
}
