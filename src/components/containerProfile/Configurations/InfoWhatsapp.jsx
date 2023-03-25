import React, { useRef, useState, useEffect } from 'react'
import './InfoWhatsapp.css'
import logo from '../../../Img/Logo_ok.png'
import { useConfig } from '../../../hooks/useConfig'
import { infoCliente, products } from '../../../utils/mockMsg'
import { useForm } from 'react-hook-form'
import { validations } from '../../../utils/ValidationTextWsp'
import { newHours } from '../../../utils/hours'
export const InfoWhatsapp = ({ options, setStatus }) => {
    const [viewStart, setViewStart] = useState('...')
    const [viewEnd, setViewEnd] = useState('...')
    const container = useRef(null)
    const [viewPhone, setViewPhone] = useState(null)
    const [newPhone, setNewPhone] = useState(null)
    const { handleSubmit, register, formState: { errors } } = useForm()
    const {
        getConfig,
        dataConfig,
        configData,
        loading,
        setLoading
    } = useConfig()
    const [viewHours, setHours] = useState(new Intl.DateTimeFormat(undefined, { timeStyle: "short" }).format(new Date()))
    useEffect(() => {
        getConfig()
    }, [loading])
    useEffect(() => {
        if (dataConfig !== null) {
            setViewStart(dataConfig[0].infoWsp.viewStart)
            setViewEnd(dataConfig[0].infoWsp.viewEnd)
            setViewPhone(dataConfig[0].infoWsp.numeroWsp)
        }
    }, [dataConfig])
    useEffect(() => {
        container.current?.scrollTo(0, container.current.scrollHeight)
    }, [viewEnd])
    useEffect(() => {
        container.current?.scrollTo(0, container.current.scrollToTop)
    }, [viewStart])
    const sendText = (data) => {
        setLoading(true)
        let newData = {
            ...dataConfig[0],
            infoWsp: {
                viewStart,
                viewEnd,
                numeroWsp: newPhone != null ? parseInt(newPhone) : dataConfig[0].infoWsp.numeroWsp
            }
        }
        let imgChange = false;
        configData(newData, imgChange, setStatus)
        document.getElementById('newNumber').value = null
    }
    setInterval(() => newHours(setHours), 10000)
    if (options === "Whatsapp") {
        return (<>
            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Cambia el numero de telefono:</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label for="telefono" className="col-form-label">Telefono actual:</label>
                                <input type="number" className="form-control" value={viewPhone} />
                            </div>
                            <div className="form-group">
                                <label for="telefono" className="col-form-label">Telefono nuevo:</label>
                                <input
                                    type="number"
                                    name='newNumber'
                                    id='newNumber'
                                    className="form-control"
                                    onChange={(e) => setNewPhone(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button> */}
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-dismiss="modal"
                            // onClick={() => savePhone()}
                            >Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container-infoWhatsapp'>
                <div className='header-wsp'>
                    <div className='col-9 header-img-info'>
                        <i className="fas fa-arrow-left px-2"></i>
                        <img src={logo} alt="logoWsp" className='logoWsp' />
                        <div className='d-flex flex-column px-2 header-title-info' data-toggle="modal" data-target="#exampleModal">
                            <h5 className='m-0'>Burger</h5>
                            <span className='info-linea'>En linea</span>
                        </div>
                    </div>
                    <div className='col-3'>
                        <i className="fas fa-video px-2"></i>
                        <i className="fas fa-phone px-2"></i>
                    </div>
                </div>
                <div className='container-info-msg'>
                    <div ref={container} className='contaier-msg-body'>
                        <div className='container-msg'>
                            {/* <span>{viewStart}{'\n'}{defaultText[0].text}{'\n'}{defaultText[1].text}{'\n'}{viewEnd}</span> */}
                            <span>{viewStart}{'\n'} </span>
                            <span>*PRODUCTOS*</span>
                            {products.map((item) => (
                                <span key={item.id}>• {item.producto} {item.cant}x${item.precio} = ${item.cant * item.precio}</span>
                            ))}
                            <span>{'\n'}*ENVIOS*</span>
                            <span>Nombre: {infoCliente.nombreCompleto}</span>
                            <span>Telefono: {infoCliente.telefono}</span>
                            <span>Direccion: {infoCliente.direccion}</span>
                            <span>Entre Calles: {infoCliente.entreCalles}</span>
                            <span>Paga con: {infoCliente.pagaCon}</span>
                            <span>Abona: {infoCliente.abona}</span>
                            <span>Envio: {infoCliente.envio}</span>
                            <span>Vuelto: {infoCliente.vuelto}</span>
                            <span>Detalles: {infoCliente.detalles}</span>
                            <span>{'\n'}{viewEnd}</span>
                            <small className='info-hours'>{viewHours} ✓✓</small>
                        </div>
                    </div>
                    <div className='footer-input-data'>
                        <form
                            onSubmit={handleSubmit(sendText)}
                            className='d-flex align-items-center px-2'
                        >
                            <div className=''>
                                <label htmlFor="textStart" className='m-0'>Inicio Mensaje:</label>
                                <textarea
                                    className='infoWspp'
                                    name="textStart"
                                    id="textStart"
                                    cols="30"
                                    rows="3"
                                    {...register('textStart', validations.textStart)}
                                    onChange={(e) => setViewStart(e.target.value)}
                                    value={viewStart}
                                ></textarea>
                                <div className={`container-errors d-flex justify-content-around`}>
                                    {errors.textStart ? (
                                        <small className="text-danger">
                                            {errors.textStart.message}
                                        </small>
                                    ) : null}
                                    <small>Cant: {viewStart.length}</small>
                                </div>
                            </div>
                            <div className=''>
                                <label htmlFor="Envio" className='m-0'>Cierre Mensaje:</label>
                                <textarea
                                    className='infoWspp'
                                    name="textEnd"
                                    id="textEnd"
                                    cols="30"
                                    value={viewEnd}
                                    {...register('textEnd', validations.textEnd)}
                                    rows="3"
                                    onChange={(e) => setViewEnd(e.target.value)}
                                ></textarea>
                                <div className={`container-errors d-flex justify-content-around`}>
                                    {errors.textEnd ? (
                                        <small className="text-danger">
                                            {errors.textEnd.message}
                                        </small>
                                    ) : null}
                                    <small>Cant: {viewEnd.length}</small>
                                </div>
                            </div>
                            <div className=''>
                                <button className='btn btn-success'>↩</button>
                            </div>
                        </form>

                        {/* </div> */}
                    </div>
                </div>
            </div>
        </>
        )
    } else {
        return null
    }
}
