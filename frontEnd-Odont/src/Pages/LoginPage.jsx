import axios from "axios";
import { InputText } from "primereact/inputtext";
import { Styles } from "../assets/Styles";
import { Tag } from "primereact/tag";
import { useState } from "react";

export const LoginPage = () => {
    const [isSignUpActive, setIsSignUpActive] = useState(false);

    const handleToggle = (e) => {
        e.preventDefault();
        setIsSignUpActive(!isSignUpActive);
    };
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [incorrect, SetIncorrect] = useState("");

    const handleSignIn = (e) => {
        e.preventDefault();
        axios.get("http://192.168.192.10:8080/user").then((response) => {
            for (let index = 0; index < response.data.length; index++) {
                if (
                    response.data[index].email == email &&
                    response.data[index].password == password
                ) {
                    SetIncorrect(false);
                    console.log(response.data[index]);
                    window.location.href = "/index";
                    break;
                } else SetIncorrect(true);
            }
        });
    };

    return (
        <>
            <div className="gradient-background "></div>

            <style>{Styles}</style>
            <div
                className={`container ${isSignUpActive ? "right-panel-active" : ""}`}
            >
                <div className="form-container sign-up-container">
                </div>
                <div className="form-container sign-in-container">
                    <form onSubmit={handleSignIn}>
                        <h1>Ingreso</h1>
                        <InputText
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Correo"
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
                            <p>¿Tienes problemas? ¡Consulta con el departamento de administración!</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}