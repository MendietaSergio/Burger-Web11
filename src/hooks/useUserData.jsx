import axios from "axios"
import { useState } from "react"
import { getAPI } from "../config/getRoutes"
import { handleLogin } from "../utils/handleLogin"
export const useUserData = () => {
    const [viewMessage, setViewMessage] = useState(false)
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const sendDataUser = async (data, _id,dispatch) => {
        setViewMessage(false)
        setMessage('')
        const { nombre, usuario, email, domicilio, descripcion } = data;

        await axios.put(`${getAPI.user.updateUser}/${_id}`, {
            nombre,
            usuario,
            email,
            domicilio,
            descripcion
        })
            .then(res => {
                setLoading(true)
                if (res.data.ok) {
                    localStorage.setItem('userBurger', JSON.stringify(res.data.logeado, null))
                    handleLogin(res.data.logeado, dispatch)
                    setMessage('Datos actualizados..!')
                    setSuccess(true)
                    setTimeout(() => {
                        setLoading(false)
                        setViewMessage(true)
                    }, 2000)

                } else {
                    setLoading(!loading)
                    setMessage(res.data.message)
                    setMessage('Error al actualizar datos!')
                    setSuccess(false)

                    setTimeout(() => {
                        setViewMessage(true)
                        setLoading(false)
                    }, 2000)
                }
            })
            .finally(() => {
                setTimeout(() => {
                    setViewMessage(false)
                }, 5000)
            })

    }
    // const handleLogin = (data, dispatch) => {
    //     dispatch({
    //         type: types.login,
    //         payload: {
    //             ...data
    //         }
    //     })
    // }
    return ({
        sendDataUser,
        message,
        loading,
        success,
        setViewMessage,
        viewMessage
    })
}
