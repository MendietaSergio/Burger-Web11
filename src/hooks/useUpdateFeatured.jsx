import axios from "axios";
import { getAPI } from "../config/getRoutes";

export const useUpdateFeatured = () => {
    const config = {
        headaers: {
            "Content-Type": "multipart/form-data",
        },
    };
    const sendUpdateFeatured = async ({ updateProduct, setSuccess, setUpdateProduct }) => {
        Swal.fire({
            title: "¿Avanzar?",
            text: "¿Estas seguro que quieres sacarlo de la sección 'Destacados'?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, sacarlo!",
        }).then(async (result) => {
            // setSuccess(false);
            if (result.isConfirmed) {
                await axios
                    .put(getAPI.products.featureProduct, {
                        updateProduct,
                        config,
                    })
                    .then((resp) => {
                        setSuccess(true);
                        Swal.fire("Listo!", `${resp.data.msg}`, "success");
                    }).finally(() => setUpdateProduct([]))
            }
        })
    }
    return ({
        sendUpdateFeatured
    })
}
