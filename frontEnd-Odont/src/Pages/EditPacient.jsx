import { InputText } from "primereact/inputtext";
import { useRef, useState } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import axios from "axios";
import { MainPage } from "./MainPage";

export const EditPaciente = ({ pacienteId }) => {
    const [newNombrePaciente, setNewNombrePaciente] = useState("");
    const [newSurnamePaciente, setNewSurnamePaciente] = useState("");

    const toast = useRef(null);

    const handleEditarPaciente = async () => {
        try {
            await axios.put(`http://192.168.192.10:8081/api/pacientes/update`, {
                id: pacienteId,
                name: newNombrePaciente,
                surname: newSurnamePaciente
            });
            console.log("Paciente actualizado con éxito.");
            setNewNombrePaciente("");
            setNewSurnamePaciente("");
            toast.current.show({
                severity: "success",
                summary: "Éxito",
                detail: `Has actualizado el paciente`,
            });
        } catch (error) {
            console.error("Error al actualizar el paciente:", error);
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: `Ha ocurrido un error al actualizar el paciente`,
            });
        }
    };

    return (
        <>
            <MainPage />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <form onSubmit={(e) => e.preventDefault()} style={{ textAlign: 'center' }}>
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
                    <Button
                        icon="pi pi-plus-circle"
                        rounded
                        outlined
                        severity="success"
                        onClick={handleEditarPaciente}
                        style={{ marginLeft: "10px", marginTop: "10px" }}
                    />
                </form>
            </div>
        </>
    );
};
