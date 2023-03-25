import axios from "axios"
import { getAPI } from "../config/getRoutes"
export const useChangePassword = () => {
    const handleChangePass = async (data, setLoading) => {
        const { email } = data
        await axios.get(`${getAPI.user.changePasswordUser}/${email}`)
            .then((resp) => {
                const { data } = resp;
                if (data.ok) {
                    return Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `${data.msg}`,
                        showConfirmButton: true,
                        timer: 5000
                    })
                } else {
                    return Swal.fire({
                        title: 'Error!',
                        text: `${data.msg}`,
                        icon: 'error',
                        confirmButtonText: 'Cool'
                    })
                }
            })
    }
    return ({
        handleChangePass
    })
}
