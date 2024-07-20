import { BrowserRouter, Route, Routes } from "react-router-dom";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "./App.css";
import { LoginPage } from "./Pages/LoginPage";

import NavBar from "./Components/NavBar";
import MainPage from "./Pages/MainPage";
import FichaPage from "./Pages/FichaPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/index" element={<MainPage />}></Route>
          <Route path="/registrar-ficha" element={<FichaPage />}></Route>
          <Route path="/ver-ficha" element={<FichaPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
