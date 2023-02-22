import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Pagination } from "../../Container/Pagination/Pagination";
import deleteIcon from "../../../Img/delete.png";
import viewIcon from "../../../Img/view.svg";
import "./ListClients.css";
import { AuthContext } from "../../../Auth/AuthContext";
import { SkeletonCard } from "../../Skeleton/SkeletonCard";
import { Message } from "../../Message/Message";
import { DetailClient } from "./DetailClient/DetailClient";
export const ListClients = ({ cantPages, newRegister }) => {
  const [clientsList, setClientsList] = useState([]);
  const [total, setTotal] = useState();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPage] = useState(cantPages ? 8 : 5);
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [viewMessage, setViewMessage] = useState(false);
  const [viewClient, setViewClient] = useState({});
  const [success, setSuccess] = useState(false);
  const getListClient = async () => {
    await axios
      .get("http://localhost:3001/api/user")
      .then((res) => {
        setTotal(res.data.total);
        setClientsList(res.data.data);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setTimeout(() => setLoading(false), 5000);
      });
  };
  useEffect(() => {
    if (user.rol[0].name === "admin") {
      getListClient();
    }
    if (user.rol[0].name === "admin" && newRegister) {
      getListClient();
    }
  }, [user, newRegister]);
  const deleteUser = async (idUser) => {
    await axios
      .delete(`http://localhost:3001/api/user/${idUser}`)
      .then((resp) => {
        setViewMessage(true);
        if (resp.data.ok) {
          setSuccess(true);
          setMessage(resp.data.msg);
          getListClient();
        } else {
          setSuccess(false);
          setMessage(resp.data.msg);
        }
      })
      .finally(() => setTimeout(() => setViewMessage(false), 3000));
  };

  //PAGINACION
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  let indexOfLastPost = currentPage * clientsPage;
  let indexOfFirstPost = indexOfLastPost - clientsPage;
  let currentClients = clientsList.slice(indexOfFirstPost, indexOfLastPost);
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
        Swal.fire("Eliminado!", "Usuario eliminado.", "success");
        deleteUser(user._id);
      }
    });
  };
  const viewModal = (client) => {
    setViewClient(client);
  };
  return (
    <>
      <h1 className="text-center">Lista de clientes</h1>
      <div className={`container-title-client`}>
        <small>{!loading && `Total: ${total}`}</small>
      </div>
      <div className="container-message-client">
        {viewMessage && (
          <Message
            message={message}
            setViewMessage={setViewMessage}
            className={success ? "alert-success" : "alert-danger"}
          />
        )}
      </div>
      {loading ? (
        <SkeletonCard viewListClients={true} loading={loading} />
      ) : (
        <>
          <div className={`container-listClients w-100 `}>
            <div className="row">
              <table class="table-striped table-hover ">
                <thead>
                  <tr>
                    <th className="columnId" scope="col">
                      #
                    </th>
                    <th className="columnUser" scope="col">
                      Usuario
                    </th>
                    <th className="columnName" scope="col">
                      Nombre
                    </th>
                    <th className="columnOptions" scope="col">
                      Opciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentClients.map((list, index) => (
                    <tr className="contianer-clients" key={list._id}>
                      <th className="columnId">
                        {currentPage > 1 ? index + 1 + clientsPage : index + 1}{" "}
                      </th>
                      <td className="columnUser">{list.usuario}</td>
                      <td className="columnName">{list.nombre}</td>
                      <td className="columnName">
                        <div className="containerIconClients">
                          <img
                            src={viewIcon}
                            alt="editIcon"
                            data-toggle="modal"
                            data-target="#exampleModal"
                            className="optionIconClient"
                            onClick={() => viewModal(list)}
                          />
                          <img
                            src={deleteIcon}
                            alt="deleteIcon"
                            className="optionIconClient"
                            onClick={() => handleDelete(list)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <DetailClient viewClient={viewClient} />
            <div className="row">
              <div className="col-12 d-flex justify-content-center my-2">
                <Pagination
                  loading={loading}
                  clientsPage={clientsPage}
                  totalClients={total}
                  paginate={paginate}
                  viewClients={true}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
