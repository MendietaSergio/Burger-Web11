import React from 'react'

export const DetailClient = ({ viewClient }) => {
    const { usuario, nombre, email, domicilio, createdAt } = viewClient

    return (
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Datos del cliente</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div className='d-flex justify-content-between'>
                            <h6>Nombre: {nombre}</h6>
                            <small>{createdAt}</small>
                        </div>
                        <h6>Usuario: {usuario}</h6>
                        <h6>Email: {email}</h6>
                        <h6>Domicilio: {domicilio}</h6>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
