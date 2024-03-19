import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { Navigate } from 'react-router-dom'

const FormContext = createContext();

export const MyLoginContext = ({ children }) =>{

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [loginSuccess, setLoginSuccess] = useState(false)

  const handleLogin = async (data) => {
    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        name: data.name,
        password: data.password,
      });

      const token = response.data.token;

      if (token) {
        console.log(token);
        localStorage.setItem('token', token);
        setLoginSuccess(true);
      } else {
        setLoginSuccess(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(loginSuccess);
  }, [loginSuccess]);

  function parseJWT(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
  
    return JSON.parse(jsonPayload);
  }

  let tokenExistAndStillValid = (parseJWT(localStorage.getItem('token')).exp * 1000 > Date.now())

  return (
    <FormContext.Provider value={{setName, setPassword, name, password, handleLogin, loginSuccess, parseJWT}}>
      {children}
    </FormContext.Provider>
  )
}

export const useFormContext = () =>{
  return useContext(FormContext)
}