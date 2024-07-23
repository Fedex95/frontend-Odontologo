import { Button } from "primereact/button";
import axios from "axios";
import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";

export const AddPacient = () => {
  const toast = useRef(null);

  const [nombrePaciente, setNombrePaciente] = useState("");
  const [apellidoPaciente, setApellidoPaciente] = useState("");
  const [emailPaciente, setEmailPaciente] = useState("");
  const [telefonoPaciente, setTelefonoPaciente] = useState("");
  const [direccionPaciente, setDireccionPaciente] = useState("");

  const handleAgregarPacientes = () => {
    axios
      .post("http://localhost:8081/api/pacientes/create", {
        name: nombrePaciente,
        surname: apellidoPaciente,
        address: direccionPaciente,
        phone: telefonoPaciente,
        email: emailPaciente,
      })
      .then((response) => {
        console.log(response.data);
        setNombrePaciente("");
        setApellidoPaciente("");
        setEmailPaciente("");
        setTelefonoPaciente("");
        setDireccionPaciente("");
      })
      .catch((error) => {
        console.error("Hubo un error!", error);
      });

    toast.current.show({
      severity: "success",
      summary: "ÉXITO",
      detail: `La operación se ha realizado con éxito`,
    });
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <form
          onSubmit={(e) => e.preventDefault()}
          style={{ textAlign: "center" }}
        >
          <h1>Registro de Pacientes</h1>
          <div>
            <InputText
              value={nombrePaciente}
              onChange={(e) => setNombrePaciente(e.target.value)}
              type="text"
              placeholder="Nombre"
            />
          </div>
          <div>
            <InputText
              value={apellidoPaciente}
              onChange={(e) => setApellidoPaciente(e.target.value)}
              type="text"
              placeholder="Apellido"
            />
          </div>
          <div>
            <InputText
              value={emailPaciente}
              onChange={(e) => setEmailPaciente(e.target.value)}
              type="email"
              placeholder="E-Mail"
            />
          </div>
          <div>
            <InputText
              value={telefonoPaciente}
              onChange={(e) => setTelefonoPaciente(e.target.value)}
              type="text"
              placeholder="Telefono"
            />
          </div>
          <div>
            <InputText
              value={direccionPaciente}
              onChange={(e) => setDireccionPaciente(e.target.value)}
              type="text"
              placeholder="Direccion"
            />
          </div>
          <Toast ref={toast} />
          <Button
            icon="pi pi-plus-circle"
            rounded
            outlined
            severity="success"
            onClick={() => handleAgregarPacientes()}
            style={{ marginLeft: "10px", marginTop: "10px" }}
          />
        </form>
      </div>
    </>
  );
};
