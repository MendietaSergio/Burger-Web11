import React from 'react'
import './CheckboxLogo.css'
export const CheckboxLogo = ({
    name,
    className,
    setViewTitleLogo,
    viewTitleLogo,
    // text
}) => {
    return (
        <>
            <span className="textCheckbox">{viewTitleLogo ? 'Mostrar logo' : 'Mostrar titulo'}:</span>
            <label className="switch">
                <input
                    className={className}
                    type="checkbox"
                    name={name}
                    defaultChecked={viewTitleLogo}
                    onClick={() => setViewTitleLogo(!viewTitleLogo)}
                />
                <div className="slider"></div>
            </label>
        </>
    )
}
