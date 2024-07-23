import Odontograma from "../Components/Odontograma";
import { Card } from "primereact/card";

import { CascadeSelect } from "primereact/cascadeselect";
import { useEffect, useState } from "react";
export default function OdontogramaPage() {
  const [pacientes, setPacientes] = useState([]);
  const [selectedPaciente, setSelectedPaciente] = useState(null);

  const getPacientes = async () => {
    try {
      const request = await fetch("http://localhost:8081/api/pacientes");
      const response = await request.json();
      return response;
    } catch (error) {
      console.error("Error fetching pacientes:", error);
    }
  };

  useEffect(() => {
    try {
      setSelectedPaciente(
        JSON.parse(localStorage.getItem("selectedPatient")).name
      );
    } catch (e) {
      console.log("no selected paciente");
    }

    getPacientes().then((data) => {
      setPacientes(data);
    });
  }, []);

  const header = (
    <i
      style={{
        fontSize: "3rem",
        color: "rgb(49, 88, 105)",
        backgroundColor: "rgb(111, 196, 232)",
      }}
      className="pi pi-face-smile p-5 flex justify-content-center align-content-center"
    ></i>
  );

  return (
    <div className="p-5">
      <div className="flex flex-wrap">
        <div style={{ width: "5rem" }}></div>
        <Odontograma className=" justify-content-start align-content-start" />
        <div style={{ width: "30rem" }}></div>
        <Card
          title="Ver odontograma"
          header={header}
          className="md:w-25rem mt-7"
        >
          <label className="flex field" htmlFor="budget">
            Paciente
          </label>
          <div className="card flex justify-content-center">
            <CascadeSelect
              value={selectedPaciente}
              onChange={(e) => {
                setSelectedPaciente(e.value);
                localStorage.setItem(
                  "selectedPatient",
                  JSON.stringify(e.value)
                );
                window.location.reload();
              }}
              options={pacientes}
              optionLabel="name"
              optionGroupLabel="name"
              optionGroupChildren={["states", "cities"]}
              className="w-full md:w-14rem"
              breakpoint="767px"
              placeholder="Selecciona un paciente"
              style={{ minWidth: "23rem" }}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
