import axios from 'axios';
import { useState, useEffect } from 'react';
import { getAPI } from '../config/getRoutes'
export const useDetailProduct = () => {
    const [product, setProduct] = useState({});
    const [tags, setTags] = useState([]);
    const [loadingView, setLoadingView] = useState(true);

    const getProductDetail = async (_id, setValue) => {
        await axios
            .get(`${getAPI.products.detailProduct}/${_id}`)
            .then((res) => {
                setProduct(res.data.productDetail);
                setTags(res.data.productDetail.tags)
                setLoadingView(false);
                if (res.data.productDetail.nombre_categoria.tipo !== "") {
                    setValue("categoria", "Bebidas");
                }
            });
    };

    return ({
        getProductDetail,
        setTags,
        product,
        tags,
        loadingView
    })
}
