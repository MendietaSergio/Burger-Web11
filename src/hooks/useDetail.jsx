import axios from "axios";
import { useEffect, useState } from "react";
import { getAPI } from "../config/getRoutes"
export const useDetail = () => {
    const [loading, setLoading] = useState(true);
    const [productDetail, setProductDetail] = useState({})
    const [success, setSuccess] = useState(true)
    const [status, setStatus] = useState(true)
    const getProductDetail = async ({ idDetail }) => {
        await axios.get(`${getAPI.products.detailProduct}/${idDetail}`)
            .then(res => {
                setStatus(res.data.ok)
                if (res.data.ok) {
                    setProductDetail(res.data.productDetail)
                } else {
                    setLoading(false)
                }
            })
    }
    useEffect(() => {
        if (productDetail) return setLoading(false);
    }, [productDetail])
    return ({
        getProductDetail,
        loading,
        setLoading,
        productDetail,
        success,
        setSuccess,
        status
    })
}
