import React from 'react'
import './ViewOptions.css'
export const ViewOptions = ({ widthImg, admin, view }) => {
    console.log("admin => ", admin[0].name);

    if ('550' >= widthImg) {
        return (
            <>
                <select name="filter" className='form-select select-option-account' onChange={(e) => view(e.target.value)}>
                    {admin[0].name === 'admin' ? (
                        <>
                            <option value="personal">Datos personales</option>
                            <option value="order">Ordenes de compras</option>
                            <option value="usuario">Nuevo usuario</option>
                            <option value="articulo">Nuevo articulo</option>
                            <option value="clientes">Lista de clientes</option>
                        </>
                    ) : (
                        <>
                            <option value="personal">Datos personales</option>
                            <option value="history">Historial</option>
                        </>
                    )}
                </select>
            </>
        )
    } else {
        return (
            <ul className='list-inline mb-0'>
                {admin[0].name === 'admin' ? (
                    <>
                        <li className='list-inline-item' onClick={() => view("personal")}>Datos personales</li>
                        <li className='list-inline-item' onClick={() => view('order')}>Ordenes de compras</li>
                        <li className='list-inline-item' onClick={() => view('usuario')}>Nuevo usuario</li>
                        <li className='list-inline-item' onClick={() => view('articulo')}>Nuevo articulo</li>
                        <li className='list-inline-item' onClick={() => view('clientes')}>Lista de clientes</li>
                    </>
                ) : (
                    <>
                        <li className='list-inline-item' onClick={() => view("personal")}>Datos personales</li>
                        <li className='list-inline-item' onClick={() => view('history')}>Historial</li>
                    </>
                )}
            </ul>
        )
    }
}
