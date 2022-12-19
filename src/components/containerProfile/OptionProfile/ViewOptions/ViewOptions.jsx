import React, { useState } from 'react'
import './ViewOptions.css'
export const ViewOptions = ({ widthImg, admin, view }) => {
    const [selectClic, setSelectClic] = useState("personal")
    const changeSelect = (e) => {
        console.log(e);
        setSelectClic(e)
        view(e)
    }
    if ('768' >= widthImg) {
        return (
            <>
                <select name="filter" className='form-select select-option-account' onChange={(e) => view(e.target.value)}>
                    {admin[0].name === 'admin' ? (
                        <>
                            <option value="personal">Datos personales </option>
                            <option value="order">Ord. de compras</option>
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
                        <li className={`${selectClic === "personal" && 'option_select'} list-inline-item  `} onClick={(e) => changeSelect("personal")}>Datos personales <i className="fas fa-chevron-right"></i></li>
                        <li className={`${selectClic === "order" && 'option_select'} list-inline-item  `} onClick={(e) => changeSelect("order")}>Ord. de compras <i className="fas fa-chevron-right"></i></li>
                        <li className={`${selectClic === "usuario" && 'option_select'} list-inline-item  `} onClick={(e) => changeSelect('usuario')}>Nuevo usuario <i className="fas fa-chevron-right"></i></li>
                        <li className={`${selectClic === "articulo" && 'option_select'} list-inline-item  `} onClick={(e) => changeSelect('articulo')}>Nuevo articulo <i className="fas fa-chevron-right"></i></li>
                        <li className={`${selectClic === "clientes" && 'option_select'} list-inline-item  `} onClick={(e) => changeSelect('clientes')}>Lista de clientes<i className="fas fa-chevron-right"></i></li>
                    </>
                ) : (
                    <>
                        <li className='list-inline-item' onClick={() => view("personal")}>Datos personales <i className="fas fa-chevron-right"></i></li>
                        <li className='list-inline-item' onClick={() => view('history')}>Historial <i className="fas fa-chevron-right"></i></li>
                    </>
                )}
            </ul>
        )
    }
}
