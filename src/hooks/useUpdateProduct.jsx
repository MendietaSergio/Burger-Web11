import axios from 'axios';
import { useState } from 'react'
import { getAPI } from '../config/getRoutes';
import { scrollToTop } from '../utils/ScrollToTop';

export default function useUpdateProduct() {
    const [viewMessage, setViewMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [showImgViewLoad, setShowImgViewLoad] = useState(true);
    const config = {
        headaers: {
            "Content-Type": "multipart/form-data",
        },
    };
    const updateProducto = async (newData, setSuccess, product) => {
        try {

            await axios
                .put(`${getAPI.products.updateProduct}/${product._id}`, {
                    newData,
                    config,
                })
                .then((resp) => {
                    if (resp.data.ok) {
                        setMessage(resp.data.msg);
                        setSuccess(true);
                    } else {
                        setMessage(resp.data.msg);
                        setSuccess(false);
                    }
                })
                .catch(error => console.log(error))
                .finally(() => {
                    scrollToTop();
                    setViewMessage(true);
                    setShowImgViewLoad(true);
                });
        } catch (error) {
            console.log(error);
        }
    };
    return ({
        updateProducto,
        viewMessage,
        setViewMessage,
        message,
        setMessage,
        showImgViewLoad,
        setShowImgViewLoad
    })
}
