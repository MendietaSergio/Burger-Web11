import axios from 'axios'
import React, { useState, useEffect } from 'react'
import './ListClients.css'
export const ListClients = ({ viewClients }) => {
  const [clientsList, setClientsList] = useState()
  const [total, setTotal] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const getListClient = async () => {

      await axios.get('http://localhost:3001/api/user')
        .then(res => {
          console.log(res);
          setTotal(res.data.total)
          setClientsList(res.data.data)
          // setLoading(true)
        })
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    }

    getListClient()
  }, [])
  
  if (viewClients) {
    return (
      <>
        <h1 className='text-center'>Lista de clientes</h1>
        {loading ? (<i>Cargando...</i>) : (
          <div className='container-listClients w-100'>
            <table class="table-striped table-hover ">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Usuario</th>
                  <th scope="col">Nombre</th>
                </tr>
              </thead>
              <tbody>
                {clientsList.map((list,index) => (
                  <tr key={list._id} onClick={() =>console.log('click')}>
                    <th>{index+1}</th>
                    <td className='px-2'>{list.usuario}</td>
                    <td>{list.nombre}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </>
    )
  } else {
    return null
  }
}
