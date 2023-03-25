import axios from 'axios';
import { useState } from 'react'
import { getAPI } from '../config/getRoutes';
import { scrollToTop } from '../utils/ScrollToTop';
export const useProducts = () => {
    const [message, setMessage] = useState("");
    const [viewMessage, setViewMessage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tags, setTags] = useState([]);

    const config = {
        headaers: {
            "Content-Type": "multipart/form-data",
        },
    };
    const sendProducto = async (data, setSuccess, reset) => {
        await axios
            .post(getAPI.products.newProduct, { data, config })
            .then((resp) => {
                if (resp.data.ok) {
                    setMessage(resp.data.msg);
                    setTimeout(() => {
                        setLoading(false);
                        scrollToTop();
                        reset();
                        setTags([])
                    }, 1500);
                } else {
                    setLoading(false);
                    scrollToTop();
                    setMessage(resp.data.msg);
                }
            })
            .finally(() => {
                setViewMessage(true);
                setSuccess(true);
            });
    };
    return ({
        sendProducto,
        loading,
        message,
        viewMessage,
        tags,
        setViewMessage,
        setMessage,
        setTags,
        setLoading
    })
}
