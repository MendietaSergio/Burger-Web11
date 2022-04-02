import React from 'react'
import { Title } from '../../Title/Title'
import { ItemListProducts } from '../ItemListProducts/ItemListProducts'

export const RelatedProducts = () => {
    return (
        <>
            <Title title="Productos relacionados" bar={false} />
            <div className="row">
                <div className="col-6 col-md-3">
                    <ItemListProducts />
                </div>
                <div className="col-6 col-md-3">
                    <ItemListProducts />
                </div>
                <div className="col-6 col-md-3">
                    <ItemListProducts />
                </div>
            </div>
        </>
    )
}
