import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

export const ViewPacient = () => {
  const [visible, setVisible] = useState(false);
  const toast = useRef(null);
  const [pacientes, setPacientes] = useState([]);

  const handleDeletePaciente = async (pacienteId) => {
    try {
      await axios.delete("http://localhost:8081/api/pacientes/delete", {
        data: { id: pacienteId },
      });

      window.location.reload();
      toast.current.show({
        severity: "success",
        summary: "ÉXITO",
        detail: `La operación se ha realizado con éxito`,
      });
    } catch (error) {
      toast.current.show({
        severity: "danger",
        summary: "Error",
        detail: `Ha ocurrido un error al realizar la solicitud`,
      });
    }
  };

  useEffect(() => {
    axios
      .get("http://192.168.192.10:8081/api/pacientes")
      .then((response) => {
        setPacientes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const [newNombrePaciente, setNewNombrePaciente] = useState("");
  const [newSurnamePaciente, setNewSurnamePaciente] = useState("");
  const [newEmailPaciente, setNewEmailPaciente] = useState("");
  const [newAddressPaciente, setNewAddressPaciente] = useState("");
  const [newPhonePaciente, setNewPhonePaciente] = useState("");

  const handleEditarPaciente = async (paciente) => {
    if (!visible) {
      setVisible(true);
      return;
    } else {
      try {
        await axios.put(`http://localhost:8081/api/pacientes/update`, {
          id: paciente[0].id,
          name: newNombrePaciente,
          surname: newSurnamePaciente,
          address: newAddressPaciente,
          phone: newPhonePaciente,
          email: newEmailPaciente,
        });
        console.log("Paciente actualizado con éxito.");
        setNewNombrePaciente("");
        setNewSurnamePaciente("");
        setNewAddressPaciente("");
        setNewEmailPaciente("");
        setNewPhonePaciente("");
        toast.current.show({
          severity: "success",
          summary: "Éxito",
          detail: `Has actualizado el paciente`,
        });
        window.location.reload();
      } catch (error) {
        console.error("Error al actualizar el paciente:", error);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: `Ha ocurrido un error al actualizar el paciente`,
        });
      }
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="card">
        <DataTable value={pacientes} tableStyle={{ minWidth: "50rem" }}>
          <Column field="name" header="Nombre" />
          <Column field="surname" header="Apellido" />
          <Column field="email" header="Email" />
          <Column field="phone" header="Telefono" />
          <Column field="address" header="Direccion" />
          <Column
            header="Accion"
            body={(pacientes) => (
              <div>
                <Button
                  onClick={() => handleDeletePaciente(pacientes.id)}
                  icon="pi pi-minus"
                  className="p-button-danger"
                  label="Eliminar"
                />
                <Button
                  onClick={() => handleEditarPaciente(pacientes.id)}
                  icon="pi pi-pencil"
                  className="p-button-warning"
                  label="Editar"
                  style={{ marginLeft: "10px" }}
                />
              </div>
            )}
          />
        </DataTable>
        <Dialog
          header="Actualizar datos"
          visible={visible}
          style={{ width: "50vw" }}
          onHide={() => {
            if (!visible) return;
            setVisible(false);
          }}
        >
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{ textAlign: "center" }}
          >
            <Toast ref={toast} />
            <h1>Editar Paciente</h1>
            <div>
              <InputText
                value={newNombrePaciente}
                onChange={(e) => setNewNombrePaciente(e.target.value)}
                type="text"
                placeholder="Nombre"
              />
            </div>
            <div>
              <InputText
                value={newSurnamePaciente}
                onChange={(e) => setNewSurnamePaciente(e.target.value)}
                type="text"
                placeholder="Apellido"
              />
            </div>
            <div>
              <InputText
                value={newEmailPaciente}
                onChange={(e) => setNewEmailPaciente(e.target.value)}
                type="email"
                placeholder="E-mail"
              />
            </div>
            <div>
              <InputText
                value={newAddressPaciente}
                onChange={(e) => setNewAddressPaciente(e.target.value)}
                type="text"
                placeholder="Direccion"
              />
            </div>
            <div>
              <InputText
                value={newPhonePaciente}
                onChange={(e) => setNewPhonePaciente(e.target.value)}
                type="text"
                placeholder="Telefono"
              />
            </div>
            <Button
              icon="pi pi-plus-circle"
              rounded
              outlined
              severity="success"
              onClick={() => handleEditarPaciente(pacientes)}
              style={{ marginLeft: "10px", marginTop: "10px" }}
            />
          </form>
        </Dialog>
      </div>
    </>
  );
};
