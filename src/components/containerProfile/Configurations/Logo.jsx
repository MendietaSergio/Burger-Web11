import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useConfig } from '../../../hooks/useConfig'
import { changeLogo } from '../../../utils/LoadImg'
import { ValidationAddProduct } from '../../../utils/ValidationAddProduct'
import { Header } from '../../Header/Header'
import { CheckboxLogo } from '../../Inputs/CheckboxLogo'

export const Logo = ({ options, setStatus }) => {
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm()
    const [imgChange, setImgChange] = useState(false)
    const [viewImg, setViewImg] = useState(null)
    const [viewTitleLogo, setViewTitleLogo] = useState(null)
    const [viewText, setViewText] = useState('')
    const {
        getConfig,
        configLogo,
        configData,
        dataConfig
    } = useConfig()
    useEffect(() => getConfig(), [])

    useEffect(() => {
        if (dataConfig !== null) {
            setViewImg(dataConfig[0].logo.img)
            setViewTitleLogo(dataConfig[0].mostrarLogo)
            setViewText(dataConfig[0].titulo)
        }
    }, [dataConfig])
    const submitLogo = (data) => {
        setStatus(false)
        let newData = {
            ...dataConfig[0],
        }
        if (viewTitleLogo) {
            let image = imgChange ? viewImg : ''
            let imgOld = dataConfig[0].logo.public_id
            configLogo({ newData, image, imgChange, imgOld, setStatus })
        } else {
            let NewData = {
                ...dataConfig[0],
                titulo: data.titulo,
                mostrarLogo: false
            }
            configData(NewData, imgChange, setStatus)
        }
    }
    if (!viewImg) return <span>cargando..</span>
    if (options === "Logo") {

        return (
            <>
                <Header
                    edit={true}
                    viewImg={viewImg}
                    imgChange={imgChange}
                    widthMin={1200}
                    dataConfig={dataConfig[0]}
                    viewTitleLogo={viewTitleLogo}
                    viewText={viewText} />
                <div className='container-desings-options'>
                    <form onSubmit={handleSubmit(submitLogo)}>
                        <div className='col-12 col-md-12 d-flex flex-column align-items-center'>
                            <div className="form-check d-flex align-items-center">
                                <CheckboxLogo
                                    className="form-control"
                                    type="checkbox"
                                    name="mostrarLogo"
                                    id="mostrarLogo"
                                    viewTitleLogo={viewTitleLogo}
                                    setViewTitleLogo={setViewTitleLogo} />
                            </div>
                            {viewTitleLogo ? (
                                <>
                                    <img className="img-modal" src={viewImg} name='img' />
                                    <label htmlFor="img"></label>
                                    <div>
                                        <input
                                            type="file"
                                            name="img"
                                            onChange={(e) => changeLogo(e, setViewImg, setImgChange, setValue)}
                                            accept=".png , .jpg, .jpeg"
                                            className="form-control-file"
                                            id="img"
                                        />
                                    </div>
                                    <div className={`container-errors w-100 text-start`}>
                                        <small>La imagen debe ser 360x360</small>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="col-12 ">
                                        <label name="titulo">
                                            Titulo: <small>*</small>{" "}
                                        </label>
                                        <input
                                            name="titulo"
                                            defaultValue={dataConfig[0].titulo}
                                            className={
                                                errors.titulo ? "form-control is-invalid" : "form-control"
                                            }
                                            type="text"
                                            {...register("titulo", ValidationAddProduct.titulo)}
                                            onChange={(e) => setViewText(e.target.value)}
                                        />
                                        <div className={`container-errors`}>
                                            {errors.titulo ? (
                                                <small className="text-danger">
                                                    {errors.titulo.message}
                                                </small>
                                            ) : null}
                                        </div>
                                    </div>
                                </>
                            )}
                            <div className='d-flex justify-content-between mt-5'>
                                <button type='submit' className='btn btn-success'>Guardar</button>
                            </div>
                        </div>
                    </form>
                </div >
            </>
        )
    }
    else {
        return null
    }
}
