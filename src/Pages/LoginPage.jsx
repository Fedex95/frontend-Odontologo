import { InputText } from "primereact/inputtext";
import { Styles } from "../assets/Styles";
import { Tag } from "primereact/tag";
import { useEffect, useState } from "react";

import { CascadeSelect } from "primereact/cascadeselect";

export const LoginPage = () => {
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [info, setInfo] = useState([]);
  const [selectedInfo, setSelectedInfo] = useState(null);

  const handleToggle = (e) => {
    e.preventDefault();
    setIsSignUpActive(!isSignUpActive);
  };

  const getRecepcion = async () => {
    try {
      const request = await fetch("http://localhost:8081/api/recepcion");
      const response = await request.json();
      return response;
    } catch (error) {
      console.error("Error fetching pacientes:", error);
    }
  };
  const getOdontologos = async () => {
    try {
      const request = await fetch("http://localhost:8081/api/odontologos");
      const response = await request.json();
      return response;
    } catch (error) {
      console.error("Error fetching pacientes:", error);
    }
  };
  useEffect(() => {
    getRecepcion().then((data) => {
      getOdontologos().then((data2) => {
        const formattedRecepcionData = data.map((item) => ({
          id: item.id,
          ...item,
        }));
        const formattedOdontologosData = data2.map((item) => ({
          id: item.id,
          ...item,
        }));
        const combinedData = [
          ...formattedRecepcionData,
          ...formattedOdontologosData,
        ];
        setInfo(combinedData);
      });
    });
  }, []);

  const [password, setPassword] = useState("");
  const [incorrect, SetIncorrect] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();

    if (selectedInfo.contraseña == password) {
      SetIncorrect(false);
      window.location.href = "/index";
    } else {
      SetIncorrect(true);
    }
  };

  return (
    <>
      <div className="gradient-background "></div>

      <style>{Styles}</style>
      <div
        className={`container ${isSignUpActive ? "right-panel-active" : ""}`}
      >
        <div className="form-container sign-up-container"></div>
        <div className="form-container sign-in-container">
          <form onSubmit={handleSignIn}>
            <h1>Ingreso</h1>
            <CascadeSelect
              value={selectedInfo}
              onChange={(e) => setSelectedInfo(e.value)}
              options={info}
              optionLabel="nombre"
              optionGroupLabel="nombre"
              optionGroupChildren={["states", "cities"]}
              className="w-full md:w-14rem mt-5 mb-3"
              breakpoint="767px"
              placeholder="SELECCIONA UN USUARIO"
              style={{ minWidth: "10rem" }}
            />
            <InputText
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Contraseña"
            />
            <div className="pt-5"></div>

            <button onClick={handleSignIn}>Ingresar</button>
            <div className="pt-5"></div>
            {incorrect ? (
              <Tag
                icon="pi pi-times"
                severity="danger"
                value="Datos incorrectos. Intenta de nuevo"
              />
            ) : (
              <div></div>
            )}
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1>Bienvenido</h1>
              <p>
                ¿Tienes problemas? ¡Consulta con el departamento de
                administración!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
