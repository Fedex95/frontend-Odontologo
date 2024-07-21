import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";

export default function FichasList() {
  const [fichas, setFichas] = useState([]);

  const getFichasWithPacientes = async () => {
    try {
      const request = await fetch("http://192.168.192.10:8080/api/fichas");
      const fichasResponse = await request.json();
      const enrichedFichas = await Promise.all(
        fichasResponse.map(async (ficha) => {
          const pacienteRequest = await fetch(
            `http://192.168.192.10:8081/api/pacientes/${ficha.paciente_id}`
          );
          const pacienteData = await pacienteRequest.json();
          return { ...ficha, paciente: pacienteData };
        })
      );
      return enrichedFichas;
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getFichasWithPacientes().then((enrichedFichas) => {
      setFichas(enrichedFichas);
    });
  }, []);

  return (
    <DataTable
      className="p-6"
      value={fichas}
      showGridlines
      tableStyle={{ minWidth: "50rem" }}
    >
      <Column
        field={(rowData) => rowData.paciente.name}
        header="Nombre del Paciente"
      ></Column>
      <Column field="budget" header="Presupuesto"></Column>
      <Column field="description" header="Descripción"></Column>
      <Column field="tratamientos" header="Tratamientos"></Column>
      <Column field="_paid" header="Pagado"></Column>
    </DataTable>
  );
}
