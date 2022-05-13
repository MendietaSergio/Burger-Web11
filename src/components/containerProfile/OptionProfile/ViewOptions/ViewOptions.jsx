import React from 'react'
import './ViewOptions.css'
export const ViewOptions = ({widthImg, admin,view}) => {

    if ('550' >= widthImg) {
    return (
        <>
            <select name="filter" className='form-select select-option-account' onChange={(e) => view(e.target.value)}>
                <option value="personal">Datos personales</option>
                <option value="history">Historia</option>
                {admin ? (
                    <>
                        <option value="order">Ordenes de compras</option>
                        <option value="usuario">Nuevo usuario</option>
                        <option value="clientes">Lista de clientes</option>
                    </>
                ) : null}
            </select>
        </>
    )
    } else {
        return (
            <ul className='list-inline mb-0'>
                <li className='list-inline-item' onClick={() => view("personal")}>Datos personales</li>
                <li className='list-inline-item' onClick={() => view('history')}>Historial</li>
                {admin ? (
                    <>
                        <li className='list-inline-item' onClick={() => view('order')}>Ordenes de compras</li>
                        <li className='list-inline-item' onClick={() => view('usuario')}>Nuevo usuario</li>
                        <li className='list-inline-item' onClick={() => view('articulo')}>Nuevo articulo</li>
                        <li className='list-inline-item' onClick={() => view('clientes')}>Lista de clientes</li>
                    </>
                ) : (null)}
            </ul>
        )
    }
}
