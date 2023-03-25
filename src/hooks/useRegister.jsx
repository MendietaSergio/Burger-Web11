import axios from "axios"
import { useState, useEffect } from "react"
import { getAPI } from "../config/getRoutes"
import { handleLogin } from "../utils/handleLogin"


export const useRegister = () => {
    const [viewMessage, setViewMessage] = useState(false)
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [changeClassName, setChangeClassName] = useState(false)

    const sendNewUser = async ({ admin, data, dispatch, setNewRegister, reset }) => {
        await axios.post(getAPI.auth.register, {
            data
        })
            .then(res => {
                setLoading(true)
                if (res.data.ok) {
                    setChangeClassName(true)
                    if (!admin) {
                        handleLogin(res.data.logeado, dispatch)
                        setMessage(res.data.msg)
                        setViewMessage(true)
                        setTimeout(() => {
                            setSuccess(true)
                            setLoading(false)

                        }, 2000)
                    } else {
                        setNewRegister(true)
                        setMessage(res.data.msg)
                        setTimeout(() => {
                            setNewRegister(false)
                            setViewMessage(true)
                            setLoading(false)
                            reset()
                        }, 2000)
                    }
                } else {
                    setChangeClassName(false)
                    setViewMessage(true)
                    setMessage(res.data.msg)
                    setLoading(false)
                }
            })
    }
    useEffect(() => {
        if (viewMessage) {
            window.scroll({
                top: 0,
                letf: 0,
                behavior: 'smooth'
            });
            setTimeout(() => setViewMessage(false), 3000)
        }
    }, [viewMessage])
    return ({
        sendNewUser,
        message,
        setMessage,
        viewMessage,
        setViewMessage,
        loading,
        setLoading,
        setSuccess,
        success,
        changeClassName,
        setChangeClassName
    })
}
