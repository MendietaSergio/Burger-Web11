import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './ViewOptions.css'
export const ViewOptions = ({ widthImg, admin,
}) => {
    const navigate = useNavigate()
    const selectOption = (value) => {
        navigate(`/micuenta/${value}`)
    }
    if ('768' >= widthImg) {
        return (
            <>
                <select name="filter" className='form-select select-option-account' onChange={(e) => selectOption(e.target.value)}>
                    {admin[0].name === 'admin' ? (
                        <>
                            <option value="datos-personales">Datos personales</option>
                            <option value="orden-de-compras">Ord. de compras</option>
                            <option value="nuevo-usuario">Nuevo usuario</option>
                            <option value="nuevo-articulo">Nuevo articulo</option>
                            <option value="lista-de-articulos">Lista de articulos</option>
                            <option value="articulos-destacados">Prod. destacados</option>
                            <option value="lista-de-clientes">Lista de clientes</option>
                        </>
                    ) : (
                        <>
                            <option value="datos-personales">Datos personales</option>
                            <option value="historial-de-pedidos">Historial</option>
                        </>
                    )}
                </select>
            </>
        )
    } else {
        return (
            <div className='container-user-menu'>
                {admin[0].name === 'admin' ? (
                    <>

                        <NavLink exact to={'/micuenta/datos-personales'} >Datos personales <i className="fas fa-chevron-right"></i></NavLink>
                        <NavLink exact to={'/micuenta/orden-de-compras'} >Ord. de compras <i className="fas fa-chevron-right"></i></NavLink>
                        <NavLink exact to={'/micuenta/nuevo-usuario'} >Nuevo usuario <i className="fas fa-chevron-right"></i></NavLink>
                        <NavLink exact to={'/micuenta/nuevo-articulo'} >Nuevo articulo <i className="fas fa-chevron-right"></i></NavLink>
                        <NavLink exact to={'/micuenta/lista-de-articulos'} >Lista articulos <i className="fas fa-chevron-right"></i></NavLink>
                        <NavLink exact to={'/micuenta/articulos-destacados'} >Prod. Destacados<i className="fas fa-chevron-right"></i></NavLink>
                        <NavLink exact to={'/micuenta/lista-de-clientes'}  >Lista de clientes<i className="fas fa-chevron-right"></i></NavLink>
                    </>
                ) : (
                    <>
                        <NavLink exact to={'/micuenta/datos-personales'} >Datos personales <i className="fas fa-chevron-right"></i></NavLink>
                        <NavLink exact to={'/micuenta/historial-de-pedidos'} >Historial <i className="fas fa-chevron-right"></i></NavLink>
                    </>
                )}
            </div>
        )
    }
}