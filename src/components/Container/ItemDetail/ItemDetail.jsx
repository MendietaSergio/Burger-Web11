import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import './ItemDetail.css'
import { Navigation } from '../../Navigation/Navigation'
import { Title } from '../../Title/Title'
export const ItemDetail = ({productDetail}) => {
    const {nombre, img_art, precio, descripcion, nombre_categoria, _id} = productDetail;
    const [ loading, setLoading ] = useState(false)
    const [cant,setCant] = useState(1);

    const handleAddCart = ( ) =>{
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 2500);
    }
    return (
        <div className='my-5'>
            <div className='row'>

                <div className="col-12 col-md-6">
                    <img className='img-detail' src={img_art} title={nombre} />
                </div>
                <div className="col-12 col-md-6">
                    <div className='detail-info'>

                        <Navigation 
                        categoria={nombre_categoria.nombre}
                        tipo={nombre_categoria.tipo}
                        />
                        <h5 className=''>{nombre}</h5>
                        <span className='price'>${precio},00</span>
                        {/* FALTA MOSTRAR LA DESCRIPCION, SACANDO LA INFO Y PASANDOLA COMO ARRAY PARA IR MOSTRANDO UNA LISTA */}
                        <div className='detail-list'>
                            <ul>
                                <li>mac cheese</li>
                                <li>panceta</li>
                                <li>salsa bbq</li>
                                <li>200g de carne</li>
                                <li>deep fried</li>
                            </ul>
                        </div>
                        <span className='detail-categorie'>{descripcion}</span>
                        <div className='d-flex justify-content-center'>
                            <input 
                                type="number"
                                className='form-control'
                                onChange={(e) =>setCant(e.target.value)}
                                defaultValue={cant}
                                min="1"
                                max="10"
                            />
                            <div className='btn-link'>
                                {/* SE PODRÍA AGREGAR ALGUN TIPO DE MENSAJE CON TIMEOUT, ART. AGREGADO AL CARRITO */}
                                <a 
                                    className='optionsLink'
                                    onClick={() =>handleAddCart(_id)}
                                >Pedime Ahora {loading ? (
                                    <i className="fas fa-spinner fa-pulse"></i>
                                    ):(
                                    <i className="fas fa-angle-right"></i>
                                    )}</a>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <span>Categoría: <Link to={`/productos/${nombre_categoria.nombre}/${nombre_categoria.categoria}`} className='detail-subItem'>{nombre_categoria.categoria}</Link></span>
                </div>
            </div>
        </div>
    )
}
