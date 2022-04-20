import React,{useState} from 'react'
import { Login } from '../components/Login/Login'
import { Register } from '../components/Register/Register'

export const MyAccount = () => {
    const [viewRegister, setViewRegister] = useState('pepe')
    return (
        <div className='container'>
            {viewRegister ? (
            <Login setViewRegister={setViewRegister} />
            ):(<Register setViewRegister={setViewRegister}/>)}
        </div>
    )
}
