import { BrowserRouter, Route, Routes } from "react-router-dom";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import './App.css'
import { LoginPage } from "./Pages/LoginPage";
import { MainPage } from "./Pages/MainPage";


function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/index" element={<MainPage/>}></Route>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
