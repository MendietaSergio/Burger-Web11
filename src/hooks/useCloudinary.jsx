import axios from 'axios';
import { getAPI } from '../config/getRoutes';
import { newImg } from '../utils/LoadImg';
import { useProducts } from './useProducts';
export const useCloudinary = () => {
    const { sendProducto
        , loading,
        message,
        viewMessage,
        setViewMessage,
        setMessage,
        setTags,
        setLoading,
        tags
    } = useProducts()
    const uploadImage = async (newData, image, setSuccess, reset, imgChange, product, setImgUpdate) => {
        const img = newImg(image)
        let imgOld = product.images.public_id
        await axios
            .post(getAPI.cloudinary.upload, img)
            .then((resp) => {
                if (resp.status === 200) {
                    newData = {
                        ...newData,
                        img: resp.data.url, //despues sacarlo
                        images: {
                            img: resp.data.url,
                            public_id: resp.data.public_id,
                            public_id_old: imgChange ? imgOld : "",
                        },
                    };
                    if (imgChange) return setImgUpdate(newData)
                    { !imgChange && sendProducto(newData, setSuccess, reset); }
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return ({
        uploadImage
        , loading,
        message,
        viewMessage,
        setViewMessage,
        setMessage,
        setTags,
        setLoading,
        tags,

    })
}
