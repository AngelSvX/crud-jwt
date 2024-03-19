import React from "react";
import { useEffect } from "react";
import "../apply.css";
import { useNavigate } from "react-router-dom";
import { Button, Input, Checkbox, Link, Tooltip } from "@nextui-org/react";
import { useFormContext } from "../Provider/FormContext";
import { useForm } from "react-hook-form";
import Crud from "./Crud";

function Register() {
  const navigate = useNavigate();

  const {
    setName,
    setPassword,
    name,
    password,
    handleLogin,
    loginSuccess,
    parseJWT,
  } = useFormContext();

  useEffect(() => {
    if (loginSuccess) {
      navigate("/Main");

    }


  }, [loginSuccess, navigate]);

  const toLogin = () => {
    navigate("/Crud");
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    handleLogin(data);
  });

  return (
    <>
      <div className=" cont-main bg-cover bg-no-repeat w-full h-screen grid place-items-center">
        <form
          onSubmit={onSubmit}
          className="bg-neutral-950 bg-opacity-80 w-3/4 h-3/4 flex flex-col items-center justify-between p-5 rounded-2xl xl:w-2/6 xl:h-3/5 lg:w-2/6 lg:h-2/3 md:w-3/6 md:h-3/4 sm:w-2/4 sm:h-3/4"
        >
          <div className=" w-full h-1/5 flex items-center justify-center">
            <p className="text-3xl font-semibold font-archivo tracking-widest select-none">
              REGISTRATION
            </p>
          </div>
          <div className="w-full h-4/5 flex flex-col justify-between">
            <div className="w-full h-5/6 flex flex-col items-center justify-between">
              <Input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                label="Name"
                color=""
                variant="underlined"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Llenar el nombre es requerido",
                  },
                })}
              />
              <span className="text-red-500 w-full">
                {errors.name?.message}
              </span>
              <Input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                label="Password"
                color=""
                variant="underlined"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Llenar la contraseña es requerida",
                  },
                })}
              />
              <span className="text-red-500 w-full">
                {errors.password?.message}
              </span>
              <Button
                className="w-full h-14 font-archivo text-xl text-white font-bold"
                variant="ghost"
                radius="sm"
                color="success"
                type="submit"
              >
                SIGN UP
              </Button>
            </div>
            <div className=" flex flex-row items-end justify-between h-1/6 w-full pt-3">
              <div className="w-1/4 h-full flex items-center justify-start">
                <Checkbox radius="sm" size="md" color="success" />
              </div>
              <div className="w-3/4 h-full flex items-center justify-end">
                <Tooltip
                  placement="bottom-end"
                  content="Do you already have an account? log in"
                  color="success"
                  closeDelay={200}
                >
                  <Link
                    isBlock
                    onClick={toLogin}
                    showAnchorIcon
                    color="success"
                  >
                    Are you already registered?
                  </Link>
                </Tooltip>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
