import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { DetectSize } from '../../../utils/DetectSize'
import { Header } from '../../Header/Header'

export const Logo = ({ options }) => {
    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm()
    const { widthImg, setWidthImg } = DetectSize()
    const [imgChange, setImgChange] = useState(false)
    const [checkSubmit, setCheckSubmit] = useState(false)
    const [viewImg, setViewImg] = useState("http://localhost:3000/src/img/imgDefault.png")
    let _URL = window.URL || window.webkitURL;
    const changeImg = (e) => {
        if (e !== undefined) {
            const reader = new FileReader();
            const img = new Image();
            img.onload = function () {
                if (img.width <= 360 && img.height <= 360) {
                    reader.onload = () => {
                        if (reader.readyState === 2) {
                            setViewImg(reader.result);
                            setCheckSubmit(true)
                        }
                    };
                    reader.readAsDataURL(e);
                } else {
                    alert("El tamaño de la imagen es de " + this.width + "x" + this.height);
                    setCheckSubmit(false)
                }
            };
            img.onerror = function () {
                alert("not a valid file: " + e.type);
            };
            img.src = _URL.createObjectURL(e);
        } else {
            setCheckSubmit(false)
        }
    };

    const submitLogo = (data) => {
        if (checkSubmit) {
            console.log("enviando...");
        } else {
            console.log("No se puede enviar");
        }
    }

    if (options === "Logo") {

        return (
            <>
                <Header setWidthImg={setWidthImg} widthImg={widthImg} edit={true} viewImg={viewImg} imgChange={imgChange} widthMin={1200} />
                <div className='container-desings-options'>
                    <form onSubmit={handleSubmit(submitLogo)}>
                        <div className='col-12 col-md-12 d-flex flex-column align-items-center'>

                            <img className="img-modal" src={viewImg} name='img' />
                            <label htmlFor="img"></label>
                            <div>
                                <input
                                    type="file"
                                    name="img"
                                    onChange={(e) => changeImg(e.target.files[0])}
                                    accept=".png , .jpg, .jpeg"
                                    className="form-control-file"
                                    id="img"
                                />
                            </div>
                            <div className={`container-errors`}>
                                {errors.img ? (
                                    <small className="text-danger">{errors.img.message}</small>
                                ) : null}
                            </div>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <button type='submit' className='btn btn-success'>Guardar</button>
                            <button type='button' className='btn btn-danger' onClick={() => setViewImg("http://localhost:3000/src/img/imgDefault.png")}>Cancelar</button>
                        </div>
                    </form>
                </div>
            </>
        )
    }
    else {
        return null
    }
}
