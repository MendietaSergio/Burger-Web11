import React from 'react'
import { Card } from '../Card/Card'

export const ItemListProducts = ({ products}) => {

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
