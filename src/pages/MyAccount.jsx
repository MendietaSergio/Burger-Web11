import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Auth/AuthContext'
import { ImgProfile } from '../components/containerProfile/Imgprofile/ImgProfile'
import { OptionProfile } from '../components/containerProfile/OptionProfile/OptionProfile'

export const Myaccount = ({setStatus}) => {
  const { user, dispatch } = useContext(AuthContext)
  const { nombre, usuario, avatar } = user;
  const [widthImg, setWidthImg] = useState(window.innerWidth)
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);

  const handleResize = () => {
    setWidthImg(window.innerWidth);
  };
  return (
    <div>
      <div className='container'>
        <div className="row">
          <div className="col-12 col-md-4">
            <ImgProfile
              avatar={avatar}
              nombre={nombre}
              usuario={usuario}
              widthImg={widthImg}
              user={user}
              dispatch={dispatch}
            />

          </div>
          <OptionProfile
            user={user}
            dispatch={dispatch}
            setStatus={setStatus}
          />
        </div>

      </div>
    </div>
  )
}
