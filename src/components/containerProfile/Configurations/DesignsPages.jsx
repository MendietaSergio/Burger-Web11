import React, { useState } from 'react'
import { Logo } from './Logo'
import './DesingsPages.css'
import { InfoWhatsapp } from './InfoWhatsapp'
export const DesignsPages = ({setStatus}) => {
    const [options, setOptions] = useState('Logo')
    return (
        <div className='container-desings'>
            <div className='row'>
                <div className='col-12 container-desings-btn'>
                    <button className='btn btn-success' onClick={() => setOptions('Logo')}>Logo</button>
                    <button className='btn btn-primary' onClick={() => setOptions('Whatsapp')}>Whatsapp</button>
                </div>
            </div>
            <Logo options={options} setStatus={setStatus} />
            <InfoWhatsapp options={options} setStatus={setStatus}/>
        </div>
    )
}
