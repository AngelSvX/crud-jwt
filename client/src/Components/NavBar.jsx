import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaProjectDiagram, FaUsers } from "react-icons/fa";
import { IoLogOut } from 'react-icons/io5'
import { Button } from "@nextui-org/react";

function NavBar() {

  const navigate = useNavigate()

  const hoverStyle =
    "hover:bg-indigo-600 w-full h-10 ease-soft-spring duration-700 rounded-md flex items-center justify-start pl-4 flex flex-row";
  const clickStyle =
    "bg-slate-600 text-indigo-200 rounded-md w-full h-10 ease-soft-spring duration-500 flex flex-row items-center justify-start pl-4";
  const liStyle = "font-navFont text-lg w-3/4 flex items-center flex-row";

  return (
    <div className="w-1/6 fixed">
      <ul className="flex flex-col h-screen w-full bg-black items-center justify-evenly">
        <li className={liStyle}>
          <NavLink
            className={({ isActive }) => (isActive ? clickStyle : hoverStyle)}
            to={"/Main"} /** Cada enrutamiento deberá ser rodeado de un NavLink.
            Home */
          >
            <FaHome size="1.2em" className="mr-3" />
            Main
          </NavLink>
        </li>
        <li className={liStyle}>
          <NavLink
            className={({ isActive }) => (isActive ? clickStyle : hoverStyle)}
            to={"/Projects"}
          >
            <FaProjectDiagram size="1.2em" className="mr-3" />
            My Projects
          </NavLink>
        </li>
        <li className={liStyle}>
          <NavLink
            className={({ isActive }) => (isActive ? clickStyle : hoverStyle)}
            to={"/Crud"}
          >
            <FaUsers size={"1.2em"} className="mr-3" />
            My Users
          </NavLink>
        </li>
        <li className={liStyle}>
          <Button 
          className="w-full flex items-center justify-start text-lg"
          variant="light"
          color="danger"
          startContent={<IoLogOut size='md'/>}
          radius="sm"
          onClick={() => {
              navigate("/");
            }}
          >
            Log out
          </Button>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
