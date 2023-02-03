import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Auth/AuthContext'
import { ImgProfile } from '../components/containerProfile/Imgprofile/ImgProfile'
import { OptionProfile } from '../components/containerProfile/OptionProfile/OptionProfile'
import { optionsProfile } from '../utils/OptionsProfile'

export const Myaccount = () => {
  const { user, dispatch } = useContext(AuthContext)
  const { nombre, usuario, avatar } = user;
  const [widthImg, setWidthImg] = useState(window.innerWidth)
  const [selectClic, setSelectClic] = useState("personal")

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);

  const handleResize = () => {
    setWidthImg(window.innerWidth);
  };
  const [estados, setEstados] = useState(optionsProfile);

  const changeOption = (opcion, estado) => {
    let updateState = [...estados];
    updateState.map((item) => {
      if (item.name === opcion) {
        item.option = true;
        setSelectClic(item.name)
      } else {
        item.option = false;
      }
    });
    setEstados(updateState);
  };
  return (
    <div>
      <div className='container'>
        <div className="row">
          <div className="col-12 col-md-4">
            <ImgProfile
              changeOption={changeOption}
              avatar={avatar}
              nombre={nombre}
              usuario={usuario}
              widthImg={widthImg}
              user={user}
              dispatch={dispatch}
              selectClic={selectClic}
            />

          </div>
          <OptionProfile
            estados={estados}
            user={user}
            dispatch={dispatch}
          />
        </div>

      </div>
    </div>
  )
}
