import React from 'react'
import './ViewOptions.css'
export const ViewOptions = ({ widthImg, admin, changeOption, selectClic }) => {
    if ('768' >= widthImg) {
        return (
            <>
                <select name="filter" className='form-select select-option-account' onChange={(e) => changeOption(e.target.value)}>
                    {admin[0].name === 'admin' ? (
                        <>
                            <option value="personal">Datos personales </option>
                            <option value="order">Ord. de compras</option>
                            <option value="usuario">Nuevo usuario</option>
                            <option value="articulo">Nuevo articulo</option>
                            <option value="listaarticulo">Lista articulo</option>
                            <option value="destacados">Prod. destacados</option>
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
                        <li className={`${selectClic === "personal" && 'option_select'} list-inline-item  `} onClick={(e) => changeOption("personal")}>Datos personales <i className="fas fa-chevron-right"></i></li>
                        <li className={`${selectClic === "order" && 'option_select'} list-inline-item  `} onClick={(e) => changeOption("order")}>Ord. de compras <i className="fas fa-chevron-right"></i></li>
                        <li className={`${selectClic === "usuario" && 'option_select'} list-inline-item  `} onClick={(e) => changeOption('usuario')}>Nuevo usuario <i className="fas fa-chevron-right"></i></li>
                        <li className={`${selectClic === "articulo" && 'option_select'} list-inline-item  `} onClick={(e) => changeOption('articulo')}>Nuevo articulo <i className="fas fa-chevron-right"></i></li>
                        <li className={`${selectClic === "listaarticulo" && 'option_select'} list-inline-item  `} onClick={(e) => changeOption('listaarticulo')}>Lista articulos <i className="fas fa-chevron-right"></i></li>
                        <li className={`${selectClic === "destacados" && 'option_select'} list-inline-item  `} onClick={(e) => changeOption('destacados')}>Prod. Destacados<i className="fas fa-chevron-right"></i></li>
                        <li className={`${selectClic === "clientes" && 'option_select'} list-inline-item  `} onClick={(e) => changeOption('clientes')}>Lista de clientes<i className="fas fa-chevron-right"></i></li>
                    </>
                ) : (
                    <>
                        <li className='list-inline-item' onClick={() => changeOption("personal")}>Datos personales <i className="fas fa-chevron-right"></i></li>
                        <li className='list-inline-item' onClick={() => changeOption('history')}>Historial <i className="fas fa-chevron-right"></i></li>
                    </>
                )}
            </ul>
        )
    }
}
