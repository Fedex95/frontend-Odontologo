import axios from "axios";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";

export default function FichasList() {
  const [fichas, setFichas] = useState([]);
  const [pacientes, setPacientes] = useState({});

  const getPacientes = async (data) => {
    try {
      const request = await fetch("http://192.168.192.10:8081/api/pacientes");
      const response = await request.json();
      for (let index = 0; index < response.length; index++) {
        if (data[index].paciente_id == response[index].id) {
          setPacientes(response[index]);
          console.log(pacientes);
        }
      }
      return response;
    } catch (error) {
      console.error("Error fetching pacientes:", error);
    }
  };

  const getFichas = async () => {
    try {
      const request = await fetch("http://localhost:8080/api/fichas");
      const response = await request.json();
      return response;
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getFichas().then((data) => {
      getPacientes(data);
      setFichas(data);
    });
  }, []);

  return (
    <DataTable
      className="p-6"
      value={fichas}
      showGridlines
      tableStyle={{ minWidth: "50rem" }}
    >
      <Column field={pacientes.name} header="Nombre del Paciente"></Column>
      <Column field="budget" header="Presupuesto"></Column>
      <Column field="description" header="Descripción"></Column>
      <Column field="tratamientos" header="Tratamientos"></Column>
      <Column field="_paid" header="Pagado"></Column>
    </DataTable>
  );
}
