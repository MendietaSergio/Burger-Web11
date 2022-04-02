import React from 'react'
import { useParams } from 'react-router-dom'
import { ItemListProducts } from '../components/Container/ItemListProducts/ItemListProducts'
import { Navigation } from '../components/Navigation/Navigation'
import { Title } from '../components/Title/Title'
import './Filter.css'
export const Productos = () => {
    const url = useParams()
    console.log("URL => ", url);
    return (
        <div className='container'>

            <Navigation to="/" title="" />
            <Title title="Productos" />
            <div className="row result-filter">
                <div className="col-12 col-md-6">
                    <span>Mostrando 1 - 9 de 39 resultados</span>
                </div>
                <div className="col-12 col-md-6 ">
                    <select name="filter" className='form-select'>
                        <option>Ordenar por popularidad</option>
                        <option>Ordenar por calificaion media</option>
                        <option>Ordenar por los últimos</option>
                        <option>Ordenar por precios bajos</option>
                        <option>Ordenar por precios altos</option>
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-3">
                    <ItemListProducts />

                </div>
                <div className="col-12 col-md-3">
                    <ItemListProducts />

                </div>
                <div className="col-12 col-md-3">
                    <ItemListProducts />

                </div>
                <div className="col-12 col-md-3">
                    <ItemListProducts />
                </div>
                <div className="col-12 col-md-3">
                    <ItemListProducts />
                </div>
                <div className="col-12 col-md-3">
                    <ItemListProducts />
                </div>
                <div className="col-12 col-md-3">
                    <ItemListProducts />
                </div>
            </div>
            <div className="row">
                <div className="col-12 d-flex justify-content-center">
                    <nav aria-label="...">
                        <ul class="pagination pagination-lg">
                            {/* disabled */}
                            <li class="page-item ">
                                <a class="page-link"  tabindex="-1">1</a>
                            </li>
                            <li class="page-item"><a class="page-link" >2</a></li>
                            <li class="page-item"><a class="page-link" >3</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}
