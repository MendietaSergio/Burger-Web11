import React from 'react'
import { Title } from '../Title/Title'

export const Ubication = () => {
    return (
        <div className='container'>
            <Title title="Ubicación" />
            <iframe
                className='d-flex justify-concent-center my-4'
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1638.4715045172345!2d-58.31617022802333!3d-34.78220999653755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a32c660613cf61%3A0x94d9066bd2fb6ae!2zSm9zw6kgQW5kcsOpcyBMw7NwZXogMjY1Mw!5e0!3m2!1ses-419!2sar!4v1678152548329!5m2!1ses-419!2sar"
                width="600"
                height="450"
                allowFullScreen
                loading="lazy"
            ></iframe>
        </div>
    )
}
