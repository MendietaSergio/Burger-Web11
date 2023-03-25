import axios from "axios"
import { useState } from "react"
import { getAPI } from "../config/getRoutes"
import { handleLogin } from "../utils/handleLogin"

export const useLogin = () => {
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [changeClassName, setChangeClassName] = useState(false)
    const [viewMessage, setViewMessage] = useState(false)
    const [message, setMessage] = useState('')
    const sendLogin = async ({ data: { email, password }, dispatch }) => {
        await axios.post(getAPI.auth.login, {
            email,
            password
        })
            .then(res => {
                if (res.data.ok) {
                    localStorage.setItem('userBurger', JSON.stringify(res.data.logeado, null))
                    handleLogin(res.data.logeado, dispatch)
                    setMessage("Logeando...")
                    setChangeClassName(true)
                    setTimeout(() => setSuccess(true), 2000)
                } else {
                    setMessage(res.data.message)
                    setChangeClassName(false)
                }
            })
            .finally(() => {
                setLoading(false)
                setViewMessage(true)
                setTimeout(() => {
                    setViewMessage(false)
                    setMessage('')
                }, 5000)
            })
    }
    return ({
        sendLogin,
        success,
        loading,
        setLoading,
        changeClassName,
        setChangeClassName,
        viewMessage,
        setViewMessage,
        message,
        setMessage,
    })
}
