import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useCrudContext } from "../Provider/CrudContext";
import NavBar from "../Components/NavBar";

function Crud() {
  const navigate = useNavigate();

  const {
    divStyle,
    labelStyle,
    inputStyle,
    nombre,
    setNombre,
    edad,
    setEdad,
    pais,
    setPais,
    cargo,
    setCargo,
    anios,
    setAnios,
    id,
    setId,
    edit,
    setEdit,
    listClients,
    setListClients,
    actualPage,
    setActualPage,
    setTotalPage,
    limitPage,
    deleteClient,
    getClient,
    addClient,
    updateClient,
    finalized,
    editClient,
  } = useCrudContext();

  useEffect(() => {
    getClient();
  }, []);

  return (
    <div className="w-full">
      <NavBar/>
      <div className="bg-gray-900 w-5/6 float-right">
        <div className="grid place-items-center">
        </div>
        <div className="datos flex flex-col items-center text-center">
          <div className="bg-slate-600 flex flex-col w-9/12 items-center justify-center rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-2xl mt-5 mb-8">
            <div className="Title bg-slate-800 w-full h-24 flex items-center justify-center rounded-tl-2xl rounded-tr-2xl">
              <p className="text-3xl font-bold text-slate-400">
                Gestión de empleados
              </p>
            </div>

            <div className={divStyle}>
              <label className={labelStyle} htmlFor="name">
                {" "}
                Nombres:
              </label>
              <input
                className={inputStyle}
                placeholder="Coloca tus nombres"
                value={nombre}
                onChange={(e) => {
                  setNombre(e.target.value);
                }}
                type="text"
                id="name"
              />
            </div>

            <div className={divStyle}>
              <label className={labelStyle} htmlFor="age">
                Edad:{" "}
              </label>
              <input
                className={inputStyle}
                placeholder="Coloca tu edad"
                value={edad}
                onChange={(e) => {
                  setEdad(e.target.value);
                }}
                type="number"
                id="age"
              />
            </div>

            <div className={divStyle}>
              <label className={labelStyle} htmlFor="country">
                País:{" "}
              </label>
              <input
                className={inputStyle}
                placeholder="País de origen"
                value={pais}
                onChange={(e) => {
                  setPais(e.target.value);
                }}
                type="text"
                id="country"
              />
            </div>

            <div className={divStyle}>
              <label className={labelStyle} htmlFor="charge">
                Cargo:{" "}
              </label>
              <input
                className={inputStyle}
                placeholder="¿Cuál es tu cargo?"
                value={cargo}
                onChange={(e) => {
                  setCargo(e.target.value);
                }}
                type="text"
                id="charge"
              />
            </div>

            <div className={divStyle}>
              <label className={labelStyle} htmlFor="ageCharge">
                Años:
              </label>
              <input
                className={inputStyle}
                placeholder="Años de experiencia"
                value={anios}
                onChange={(e) => {
                  setAnios(e.target.value);
                }}
                type="number"
                id="ageCharge"
              />
            </div>

            <div className="Title bg-slate-800 w-full h-24 flex items-center justify-center rounded-bl-2xl rounded-br-2xl mt-3">
              {edit == true ? (
                <div className="w-1/3 flex items-center justify-evenly">
                  <button
                    onClick={() => {
                      updateClient();
                      finalized();
                      Swal.fire({
                        title: "Finalizado!",
                        text: "Usuario actualizado exitosamente",
                        icon: "success",
                        timer: 3000,
                      });
                    }}
                    className="btn btn-outline btn-info w-36 h-14"
                  >
                    Actualizar
                  </button>
                  <button
                    onClick={finalized}
                    className="btn btn-outline btn-error w-36 h-14"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    if (!nombre || !edad || !pais || !cargo || !anios) {
                      Swal.fire({
                        icon: "error",
                        title: "Ocurrió un error",
                        text: "Por favor, rellene todos los datos necesarios.",
                        timer: 3000,
                      });
                    } else {
                      addClient();
                      finalized();
                    }
                  }}
                  className="btn btn-outline btn-primary w-36 h-14"
                >
                  Registrar
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="clientes flex flex-col items-center justify-center rounded-xl ">
          <table className="w-9/12 table-auto flex flex-col ">
            <thead className="bg-slate-800 flex items-center justify-center">
              <tr className="w-full text-center h-14 text-md text-slate-400 flex items-center justify-center font-titleTable">
                <th className="w-1/12">#</th>
                <th className="w-3/12">Nombre</th>
                <th className="w-1/12">Edad</th>
                <th className="w-2/12">País</th>
                <th className="w-2/12">Cargo</th>
                <th className="w-1/12">Años</th>
                <th className="w-2/12">Acciones</th>
              </tr>
            </thead>
            <tbody className="flex items-center flex-col">
              {listClients.map((client, key) => {
                return (
                  <tr
                    key={client.id}
                    className="bg-base-200 w-full text-center h-auto flex items-center justify-center font-textTable text-lg "
                  >
                    <td className="w-1/12 h-20 grid place-items-center bg-slate-700">
                      {client.id}
                    </td>
                    <td className="w-3/12 h-20 grid place-items-center bg-slate-600">
                      {client.nombre}
                    </td>
                    <td className="w-1/12 h-20 grid place-items-center bg-slate-700">
                      {client.edad}
                    </td>
                    <td className="w-2/12 h-20 grid place-items-center bg-slate-600">
                      {client.pais}
                    </td>
                    <td className="w-2/12 h-20 grid place-items-center bg-slate-700">
                      {client.cargo}
                    </td>
                    <td className="w-1/12 h-20 grid place-items-center bg-slate-600">
                      {client.anios}
                    </td>
                    <td className="w-2/12 grid place-items-center bg-slate-700 h-20 grid-cols-1 lg:grid-cols-2">
                      <button
                        onClick={() => {
                          editClient(client);
                        }}
                        className="bg-blue-800 p-1 w-auto text-xs h-6 rounded-sm font-bold text-white hover:bg-blue-600 transition-all duration-200 ease-in-out lg:w-20 lg:h-10"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => {
                          deleteClient(client);
                        }}
                        className="bg-red-800 p-1 w-auto h-6 text-xs rounded-sm font-bold text-white hover:bg-red-600 transition-all duration-200 ease-in-out sm:text-xs sm:w-auto sm:h-6 lg:w-20 lg:h-10 "
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="bg-slate-800 w-9/12 flex items-center justify-center pt-6 pb-6">
            {limitPage()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Crud;
