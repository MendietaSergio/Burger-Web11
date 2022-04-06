import React from 'react'
import './Title.css'
export const Title = ({ title="", bar=true, className="text-center" }) => {
    return (
        <div className='row'>
            <div className='col-12'>
                <h1 className={`${className} my-3`}>{title}</h1>
                {
                    bar ? (
                        <hr className='title-bar' />
                    ):null
                }
            </div>
        </div>
    )
}
