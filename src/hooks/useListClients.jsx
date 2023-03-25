import axios from "axios";
import { useState } from "react";
import { getAPI } from "../config/getRoutes";
export const useListClients = () => {
    const [clientsList, setClientsList] = useState([]);
    const [total, setTotal] = useState();
    const [loading, setLoading] = useState(true);
    const [viewMessage, setViewMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const getListClient = async (user, newRegister) => {
        await axios
            .get(`${getAPI.user.allUser}`)
            .then((res) => {
                setTotal(res.data.total);
                setClientsList(res.data.data);
            })
            .catch((error) => console.log(error))
            .finally(() => {
                setTimeout(() => setLoading(false), 5000);
            });
    };
    const handleDelete = (user) => {
        Swal.fire({
            title: `Vas a eliminar al usuario ${user.usuario}`,
            text: "¿Estás seguro que lo queres eliminar?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminalo!",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteUser(user._id);
            }
        });
    };
    const deleteUser = async (idUser) => {
        await axios
            .delete(`${getAPI.user.delteUser}/${idUser}`)
            .then((resp) => {
                setViewMessage(true);
                if (resp.data.ok) {
                    setSuccess(true);
                    setMessage(resp.data.msg);
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `${resp.data.msg}`,
                        showConfirmButton: true,
                        timer: 5000
                    });
                    getListClient();
                } else {
                    setSuccess(false);
                    setMessage(resp.data.msg);
                }
            })
            .finally(() => setTimeout(() => setViewMessage(false), 3000));
    };
    return ({
        getListClient,
        clientsList,
        total,
        setTotal,
        loading,
        setLoading,
        handleDelete,
        deleteUser,
        setSuccess,
        success,
        setMessage,
        message,
        viewMessage,
        setViewMessage
    })
}
