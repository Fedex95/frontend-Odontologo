import { BrowserRouter, Route, Routes } from "react-router-dom";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import './App.css'
import { LoginPage } from "./Pages/LoginPage";
import { MainPage } from "./Pages/MainPage";
import { AddPacient } from "./Pages/AddPacient";
import { ViewPacient } from "./Pages/ViewPacient";
import { EditPaciente } from "./Pages/EditPacient";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/index" element={<MainPage/>}></Route>
          <Route path="/index/registrar_paciente" element={<AddPacient/>}></Route>
          <Route path="/index/visualizar_paciente" element={<ViewPacient/>}></Route>
          <Route path="/index/editar_paciente/:id" element={<EditPaciente/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
