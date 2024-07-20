import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { MainPage } from "./MainPage";
import React, { useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";


export const ViewPacient = () => {
    const navigate = useNavigate();
    
    const toast = useRef(null);
    const [pacientes, setPacientes] = useState([]);

    const handleDeletePaciente = async (pacienteId) => {
        try {
          await axios.delete("http://192.168.192.10:8081/api/pacientes/delete", {
            data: { id: pacienteId }
          })
         
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
        axios.get('http://192.168.192.10:8081/api/pacientes')
            .then(response => {
                setPacientes(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleEditarPaciente = (pacienteId) => {
        navigate(`/index/editar_paciente/${pacienteId}`);
    };

    return (
        <>
         <Toast ref={toast} />
            <MainPage></MainPage>
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
            </div>
        </>
    );
}