import { BrowserRouter, Route, Routes } from "react-router-dom";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "./App.css";
import { LoginPage } from "./Pages/LoginPage";
import { AddPacient } from "./Pages/AddPacient";
import { ViewPacient } from "./Pages/ViewPacient";
import NavBar from "./Components/NavBar";
import FichaPage from "./Pages/FichaPage";
import FichaPageList from "./Pages/FichaPageList";
import OdontogramaPage from "./Pages/OdontogramaPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/index/registrar-ficha" element={<FichaPage />}></Route>
          <Route path="/index/ver-ficha" element={<FichaPageList />}></Route>
          <Route
            path="/index/registrar_paciente"
            element={<AddPacient />}
          ></Route>
          <Route
            path="/index/visualizar_paciente"
            element={<ViewPacient />}
          ></Route>
          <Route
            path="/index/odontograma"
            element={<OdontogramaPage />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
