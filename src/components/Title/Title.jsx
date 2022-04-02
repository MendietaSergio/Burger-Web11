import React from 'react'
import './Title.css'
export const Title = ({ title="", bar=true }) => {
    return (
        <div className='row'>
            <div className='col-12'>
                <h1 className='text-center my-3'>{title}</h1>
                {
                    bar ? (
                        <hr className='title-bar' />
                    ):null
                }
            </div>
        </div>
    )
}
