import React, { useEffect, useState } from 'react'
import { UpdateProduct } from '../../containerProfile/UpdateProduct/UpdateProduct'
import { Card } from '../Card/Card'

export const ItemListProducts = ({ products, admin, viewListProducts, setView,setIdProduct }) => {
    
    if (viewListProducts && admin) {
        return (
            <div className='mx-auto my-auto'>
                <ul className='list-group'>
                    {
                        products.map(product => (
                            <Card product={product} admin={admin}
                                viewListProducts={viewListProducts}
                                key={product._id}
                                setView={setView}
                                setIdProduct={setIdProduct}
                            />
                        ))
                    }
                </ul>
            </div>
        )
    } else { 
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
}
