import React, { useState, useEffect, useContext } from "react";
import { Pagination } from "../../Container/Pagination/Pagination";
import deleteIcon from "../../../Img/delete.png";
import viewIcon from "../../../Img/view.svg";
import "./ListClients.css";
import { AuthContext } from "../../../Auth/AuthContext";
import { SkeletonCard } from "../../Skeleton/SkeletonCard";
import { Message } from "../../Message/Message";
import { DetailClient } from "./DetailClient/DetailClient";
import { useListClients } from "../../../hooks/useListClients";
export const ListClients = ({ newRegister }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPage] = useState(8);
  const { user } = useContext(AuthContext);
  const [viewClient, setViewClient] = useState({});
  const { getListClient,
    clientsList,
    total,
    loading,
    handleDelete,
    success,
    message,
    viewMessage,
    setViewMessage } = useListClients()
  useEffect(() => {
    if (user.rol[0].name === "admin") {
      getListClient();
    }
    if (user.rol[0].name === "admin" && newRegister) {
      getListClient();
    }
  }, [user, newRegister]);
  //PAGINACION
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  let indexOfLastPost = currentPage * clientsPage;
  let indexOfFirstPost = indexOfLastPost - clientsPage;
  let currentClients = clientsList.slice(indexOfFirstPost, indexOfLastPost);

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
              <table className="table-striped table-hover">
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
                    <tr className="contianer-clients" key={list._id} >
                      {log}
                      <th className="columnId">
                        {currentPage > 1 ? (index + 1) + clientsPage : (index + 1)}{" "}
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
