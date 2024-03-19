import axios from "axios";
import Swal from "sweetalert2";
import { createContext, useContext, useState } from "react";

const CrudContext = createContext();

export const MyCrudContext = ({ children }) => {
  const divStyle = "m-2 w-2/3 h-16 flex items-center justify-center mt-5";
  const labelStyle =
    "bg-indigo-300 w-1/6 h-full grid place-items-center text-xl text-stone-950 font-bold rounded-tl-xl rounded-bl-xl";
  const inputStyle =
    "w-5/6 h-full transition-all duration-200 ease-out rounded-tr-xl rounded-br-xl border-2 border-transparent bg-slate-900 outline-none text-xl font-medium pl-4 text-slate-400 hover:bg-gray-700 hover:border-indigo-300 hover:border-2 focus:text-white placeholder:text-slate-600";

  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState("");
  const [id, setId] = useState("");

  const [edit, setEdit] = useState(false);

  const [listClients, setListClients] = useState([]);

  const [actualPage, setActualPage] = useState(1);

  const [totalPage, setTotalPage] = useState(1);

  const limitPage = () => {
    if (actualPage === 1) {
      return (
        <div className="join">
          <button className="join-item btn w-16 text-xl font-textTable bg-gray-700 border-slate-900 hover:border-slate-900 hover:bg-gray-700 cursor-not-allowed">
            «
          </button>
          <button className="join-item btn w-32 text-lg font-textTable font-normal">
            Página {actualPage}
          </button>
          <button
            onClick={nextPage}
            className="join-item btn w-16 text-xl font-textTable"
          >
            »
          </button>
        </div>
      );
    } else {
      return (
        <div className="join">
          <button
            onClick={prevPage}
            className="join-item btn w-16 text-xl font-textTable b"
          >
            «
          </button>
          <button className="join-item btn w-32 text-lg font-textTable font-normal">
            Página {actualPage}
          </button>
          <button
            onClick={nextPage}
            className="join-item btn w-16 text-xl font-textTable"
          >
            »
          </button>
        </div>
      );
    }
  };

  const prevPage = () => {
    if (actualPage > 1) {
      setActualPage(actualPage - 1);
      getClient(actualPage - 1);
    }
  };

  const nextPage = () => {
    if (actualPage < totalPage) {
      setActualPage(actualPage + 1);
      getClient(actualPage + 1);
    }
  };

  const getClient = (page = 1) => {
    const pageSize = 5;
    axios.get(
      `http://localhost:3001/user/empleados?page=${page}&pageSize=${pageSize}`
    ).then((response) => {
      setListClients(response.data.users);
      setTotalPage(response.data.totalPages);
      setActualPage(page);
    });
  };

  const deleteClient = (client) => {
    Swal.fire({
      title: "<strong>Eliminar</strong>",
      html:
        "¿Realmente desea eliminar a <strong>" + client.nombre + "</strong>?",
      buttons: ["No", "Si"],
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, estoy segur@.",
      cancelButtonText: "No, deseo retroceder.",
    }).then((res) => {
      if (res.isConfirmed) {
        axios.delete(`http://localhost:3001/user/delete/${client.id}`).then(() => {
          getClient();
          finalized();
        });
        Swal.fire(
          "Completado!",
          "el usuario " +
            `<strong>${client.nombre}</strong>` +
            " ha sido eliminado",
          "success"
        );
      }
    });
  };

  const addClient = () => {
    getClient()
    axios.post("http://localhost:3001/user/create", {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios,
    }).then(() => {
      Swal.fire({
        title: "<strong>Finalizado!</strong>",
        html: `El usuario <strong>${nombre}</strong> fue registrado satisfactoriamente`,
        icon: "success",
        timer: 3000,
      });
    });
  };

  const updateClient = () => {
    axios.put("http://localhost:3001/user/update", {
      id: id,
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios,
    }).then(() => {
      getClient();
    });
  };

  const editClient = (val) => {
    setEdit(true);

    setNombre(val.nombre);
    setEdad(val.edad);
    setPais(val.pais);
    setCargo(val.cargo);
    setAnios(val.anios);
    setId(val.id);
  };

  const finalized = () => {
    setEdit(false);

    setNombre("");
    setEdad("");
    setPais("");
    setCargo("");
    setAnios("");
    setId("");
  };

  return (
    <CrudContext.Provider
      value={{
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
        totalPage,
        setTotalPage,
        limitPage,
        deleteClient,
        getClient,
        addClient,
        editClient,
        finalized,
        updateClient
      }}
    >
      {children}
    </CrudContext.Provider>
  );
};

export const useCrudContext = () => {
  return useContext(CrudContext);
};
