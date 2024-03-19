import Crud from "./Pages/Crud";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Register from "./Pages/Register";
import { MyLoginContext } from "./Provider/FormContext";
import { MyCrudContext } from "./Provider/CrudContext";
import Main from "./Pages/Main";
import Projects from "./Pages/Projects";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={"/Register"} />} />
        <Route
          path="/Register"
          element={
            <MyLoginContext>
              <Register />
            </MyLoginContext>
          }
        />
        <Route
          path="/Crud"
          element={
            <MyCrudContext>
              <Crud />
            </MyCrudContext>
          }
        />
        <Route
          path="/Main"
          element={
            <Main/>
          }
        />
        <Route
          path="/Projects"
          element= {
            <Projects/>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
