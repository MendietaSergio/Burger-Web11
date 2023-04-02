import React from 'react'

export const DetailClient = ({ viewClient }) => {
    const { usuario, nombre, email, domicilio, createdAt } = viewClient

    return (
        <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Datos del cliente</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className='d-flex justify-content-between'>
                            <h6>Nombre: {nombre}</h6>
                            <small>{createdAt}</small>
                        </div>
                        <h6>Usuario: {usuario}</h6>
                        <h6>Email: {email}</h6>
                        <h6>Domicilio: {domicilio}</h6>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
