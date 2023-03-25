import axios from "axios";
import { getAPI } from "../config/getRoutes";

export const useDeleteProducts = () => {
    const deleteProduct = async (_id, setSuccess) => {
        Swal.fire({
            title: "¿Eliminarlo?",
            text: "¿Estas seguro que quieres eliminar el articulo?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminarlo!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios
                    .delete(`${getAPI.products.deleteProduct}/${_id}`)
                    .then((resp) => {
                        if (resp.data.ok) {
                            setSuccess(true);
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: `${resp.data.msg}`,
                                showConfirmButton: true,
                                timer: 5000
                            })
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: `${resp.data.msg}`,
                                footer: '<a href="">Why do I have this issue?</a>',
                            });
                        }
                    })
                    .catch(error => console.log(error))
                    .finally(() => setSuccess(true))
            }
        });
    };
    return ({
        deleteProduct
    })
}
