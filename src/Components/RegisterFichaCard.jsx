import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { CascadeSelect } from "primereact/cascadeselect";
import { useEffect, useState, useRef } from "react";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import axios from "axios";

export default function RegisterFichaCard() {
  const toast = useRef(null);
  const [pacientes, setPacientes] = useState([]);
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [presupuesto, setPresupuesto] = useState();
  const [description, setDescription] = useState();
  const [receta, setReceta] = useState();
  const [tratamiento, setTratamiento] = useState();

  const getPacientes = async () => {
    try {
      const request = await fetch("http://192.168.192.10:8081/api/pacientes");
      const response = await request.json();
      console.log(response[0]);
      return response;
    } catch (error) {
      console.error("Error fetching pacientes:", error);
    }
  };

  useEffect(() => {
    getPacientes().then((data) => {
      setPacientes(data);
    });
  }, []);

  const handleSave = async () => {
    try {
      const request = await axios.post(
        "http://192.168.192.10:8080/api/fichas/add",
        {
          budget: presupuesto.value,
          paciente_id: selectedPaciente.id,
          medication: receta,
          tratamientos: tratamiento,
          description: description,
        }
      )
      .then((response) => {
        console.log(response.data);
        setPresupuesto("");
        setDescription("");
        setReceta("");
        setTratamiento("");
    })
      const response = await request.json();
      return response;
    } catch (error) {
      console.error("Error fetching pacientes:", error);
    }
    toast.current.show({
      severity: "success",
      summary: "ÉXITO",
      detail: `La operación se ha realizado con éxito`,
  });
  };

  const header = (
    <i
      style={{
        fontSize: "3rem",
        color: "rgb(110, 94, 58)",
        backgroundColor: "rgb(255, 220, 138)",
      }}
      className="pi pi-file-pdf p-5 flex justify-content-center align-content-center"
    ></i>
  );

  const footer = (
    <>
      <Button label="Guardar" icon="pi pi-check" onClick={handleSave} />
      <Button
        label="Cancel"
        severity="secondary"
        icon="pi pi-times"
        style={{ marginLeft: "0.5em" }}
      />
    </>
  );
  
  return (
    <>
    <Toast ref={toast} />
    <div
      style={{ height: "110hv" }}
      className="p-5 flex justify-content-center align-content-center"
    >
      <Card
        title="Registar una nueva ficha técnica"
        footer={footer}
        header={header}
        className="md:w-25rem"
      >
        <label className="flex field" htmlFor="budget">
          Paciente
        </label>
        <div className="card flex justify-content-center">
          <CascadeSelect
            value={selectedPaciente}
            onChange={(e) => setSelectedPaciente(e.value)}
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
        <div className="py-5 field">
          <label htmlFor="budget">Presupuesto</label>

          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">$</span>
            <InputNumber
              required
              mode="currency"
              currency="USD"
              locale="en-US"
              inputId="currency-us"
              id="budget"
              type="text"
              onChange={setPresupuesto}
            />
          </div>

          <label className="pt-5" htmlFor="description">
            Descripción
          </label>
          <InputTextarea
            required
            id="description"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
          />
          <label className="pt-5" htmlFor="treatment">
            Tratamientos
          </label>
          <InputTextarea
            required
            id="treatment"
            type="text"
            onChange={(e) => setTratamiento(e.target.value)}
            className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
          />
          <label className="pt-5" htmlFor="medication">
            Receta
          </label>
          <InputTextarea
            id="medication"
            type="text"
            onChange={(e) => setReceta(e.target.value)}
            className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
          />
        </div>
      </Card>
    </div>
    </>
  );
}
