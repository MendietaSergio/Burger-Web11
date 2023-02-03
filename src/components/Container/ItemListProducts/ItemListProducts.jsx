import React from 'react'
import { Card } from '../Card/Card'

export const ItemListProducts = ({ products, admin, estados, setView, setSuccess, setIdProduct }) => {

    if (estados === undefined) {
        return (
            <>
                {
                    products.map(product => (
                        <div className="col-12 col-md-3" key={product._id}>
                            <Card product={product} />
                        </div>
                    ))
                }
            </>
        )
    }
    if (estados[5].option && admin) {
        return (
            <div className='mx-auto my-auto'>
                <ul className='list-group'>
                    {
                        products.map(product => (
                            <Card product={product} admin={admin}
                                key={product._id}
                                estados={estados}
                                setView={setView}
                                setSuccess={setSuccess}
                                setIdProduct={setIdProduct}
                            />
                        ))
                    }
                </ul>
            </div>
        )
    }

}
