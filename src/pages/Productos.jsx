import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ItemListProducts } from '../components/Container/ItemListProducts/ItemListProducts'
import { Pagination } from '../components/Container/Pagination/Pagination'
import { Navigation } from '../components/Navigation/Navigation'
import { Title } from '../components/Title/Title'
import './Filter.css'
export const Productos = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [productsPage] = useState(12)
    const [filter, setFilter] = useState('')

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true)
            await axios.get(`http://localhost:3001/api/products`)
                .then(res => {
                    console.log(res.data);
                    setProducts(res.data)
                    setTotal(res.data.length)
                })
                .catch(error => console.log(error))
                .finally(() => {
                    setLoading(false)
                    setCurrentPage(1)
                })
        }
        getProducts()
    }, [])

    //FILTROS
    useEffect(() => {
        TopToLow(filter)
        setLoading(false)
        setFilter('')
    }, [filter])



    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const TopToLow = (filter) => {
        setLoading(true)
        if (filter === 'Ordenar por precios altos') {
            const newProduct = products.sort(function (a, b) {
                return b.precio - a.precio
            })
            setProducts(newProduct)
        }
        if (filter === 'Ordenar por precios bajos') {
            const newProduct = products.sort(function (a, b) {
                return a.precio - b.precio
            })
            setProducts(newProduct)
        }
        if (filter === 'Ordenar por los últimos') {
            const newProduct = products.sort(function (a, b) {
                var c = new Date(a.createdAt);
                var d = new Date(b.createdAt);
                return d - c;
            })
            setProducts(newProduct)
        }
        if (filter === 'Ordenar por popularidad') {
            const newProduct = products.sort(function (a, b) {
                return b.vistas - a.vistas
            })
            setProducts(newProduct)
        }
        paginate(1);
    }
    let indexOfLastPost = currentPage * productsPage;
    let indexOfFirstPost = indexOfLastPost - productsPage;
    let currentProducts = products.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <div className='container'>

            <Navigation to="/" title="" />
            <Title title="Productos" />
            <div className="row result-filter">
                <div className="col-12 col-md-6">
                    {loading ? (null) : (<span >Mostrando 1 - {currentProducts === undefined ? (null) : (<span>{currentProducts.length}</span>)} de {total} resultados</span>)}
                </div>
                <div className="col-12 col-md-6 ">
                    <select name="filter" className='form-select' onChange={(e) => setFilter(e.target.value)} >
                        <option>Ordenar por popularidad</option>
                        <option>Ordenar por calificaion media</option>
                        <option>Ordenar por los últimos</option>
                        <option>Ordenar por precios bajos</option>
                        <option>Ordenar por precios altos</option>
                    </select>
                </div>
            </div>
            <div className="row">
                <ItemListProducts products={currentProducts} loading={loading} />
            </div>
            <div className="row">
                <div className="col-12 d-flex justify-content-center">
                    <Pagination
                        loading={loading}
                        productsPage={productsPage}
                        totalProducts={products.length}
                        paginate={paginate}
                    />
                </div>
            </div>
        </div>
    )
}
