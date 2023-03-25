import axios from 'axios'
import { useEffect, useState } from 'react'
import { getAPI } from '../config/getRoutes'
import { newImg } from '../utils/LoadImg'

export const useConfig = () => {
    const [loading, setLoading] = useState(true)
    const config = {
        headaers: {
            "Content-Type": "multipart/form-data",
        },
    };
    const [dataConfig, setDataConfig] = useState(null)
    const getConfig = async () => {
        await axios.get(getAPI.main.data)
            .then(res => {
                if (res.data.ok) {
                    setDataConfig(res.data.configData)
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }
    const configLogo = async ({ newData, image, imgChange, imgOld, setStatus }) => {
        const img = newImg(image)
        if (imgChange) {
            await axios
                .post(getAPI.cloudinary.upload, img)
                .then((resp) => {
                    if (resp.status === 200) {
                        newData = {
                            ...newData,
                            logo: {
                                img: resp.data.url,
                                public_id: resp.data.public_id,
                                public_id_old: imgOld,
                            },
                            mostrarLogo: true
                        };
                        configData(newData, imgChange, setStatus)
                    }
                })
                .catch(error => console.log(error))
        } else {
            newData = {
                ...newData,
                mostrarLogo: true
            }
            configData(newData, imgChange, setStatus)
        }
    }
    const configData = async (newData, imgChange, setStatus) => {
        await axios.put(getAPI.user.config, { newData, config, imgChange })
            .then(res => {
                if (res.data.ok) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `${res.data.msg}`,
                        showConfirmButton: true,
                        timer: 5000
                    });
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: `${res.data.msg}`,
                        showConfirmButton: true,
                        timer: 5000
                    });
                }
            })
            .finally(() => setStatus(true))
    }
    useEffect(() => {
        if (status) return getConfig()
    }, [])
    return ({
        getConfig,
        configLogo,
        configData,
        setLoading,
        loading,
        dataConfig
    })
}