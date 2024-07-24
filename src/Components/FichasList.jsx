import axios from "axios";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";

export default function FichasList() {
  const [fichas, setFichas] = useState([]);
  const [visible, setVisible] = useState(false);
  const [budget, setBudget] = useState(0);
  const [description, setDescription] = useState(undefined);
  const [medication, setMedication] = useState(undefined);
  const [tratamientos, setTratamientos] = useState(undefined);
  const [paid, setPaid] = useState(false);
  const toast = useRef(null);

  const handleEditFicha = async (ficha) => {
    if (!visible) {
      setVisible(true);
      return;
    } else {
      try {
        const data = {
          id: ficha.id,
          budget: budget.value ?? ficha.budget,
          paciente_id: ficha.paciente_id,
          medication: medication ?? ficha.medication,
          description: description ?? ficha.description,
          tratamientos: tratamientos ?? ficha.tratamientos,
          _paid: paid ?? ficha._paid,
        };
        console.log(data);
        await axios.put(`http://localhost:8080/api/fichas/update`, data);
        console.log("Paciente actualizado con éxito.");
        setBudget("");
        setMedication("");
        setDescription("");
        setTratamientos("");
        setPaid("");
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
  const handleDeleteFicha = async (fichaId) => {
    try {
      await axios.delete("http://localhost:8080/api/fichas/delete", {
        data: { id: fichaId },
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

  const getFichasWithPacientes = async () => {
    try {
      const request = await fetch("http://localhost:8080/api/fichas");
      const fichasResponse = await request.json();
      const enrichedFichas = await Promise.all(
        fichasResponse.map(async (ficha) => {
          const pacienteRequest = await fetch(
            `http://localhost:8081/api/pacientes/${ficha.paciente_id}`
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
    <>
      <DataTable
        className="p-6"
        value={fichas}
        showGridlines
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column
          field={(rowData) => rowData?.paciente?.name || "No disponible"}
          header="Nombre del Paciente"
        ></Column>
        <Column field="budget" header="Presupuesto"></Column>
        <Column field="description" header="Descripción"></Column>
        <Column field="tratamientos" header="Tratamientos"></Column>
        <Column field="_paid" header="Pagado"></Column>
        <Column
          field="action"
          header="Acción"
          body={(ficha) => (
            <div>
              <Button
                onClick={() => handleDeleteFicha(ficha.id)}
                icon="pi pi-minus"
                className="p-button-danger"
                label="Eliminar"
              />
              <Button
                onClick={() => setVisible(true)}
                icon="pi pi-pencil"
                className="p-button-warning"
                label="Editar"
                style={{ marginLeft: "10px" }}
              />
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
                  <h1>Editar Ficha</h1>
                  <div>
                    <InputNumber
                      required
                      mode="currency"
                      currency="USD"
                      locale="en-US"
                      id="budget"
                      inputId="currency-us"
                      onChange={setBudget}
                      type="text"
                      placeholder="Presupuesto"
                    />
                  </div>
                  <div>
                    <InputText
                      value={medication}
                      onChange={(e) => setMedication(e.target.value)}
                      type="text"
                      placeholder="Medicación"
                    />
                  </div>
                  <div>
                    <InputText
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      type="text"
                      placeholder="Descripción"
                    />
                  </div>
                  <div>
                    <InputText
                      value={tratamientos}
                      onChange={(e) => setTratamientos(e.target.value)}
                      type="email"
                      placeholder="Tratamientos"
                    />
                  </div>

                  <div className="flex-col align-items-center my-5">
                    <Checkbox
                      inputId="is_paid"
                      name="paid"
                      value="paid"
                      onChange={() => setPaid(!paid)}
                      checked={paid}
                    />
                    <label htmlFor="paid" className="ml-2">
                      ¿Pagado?
                    </label>
                  </div>
                  <Button
                    icon="pi pi-plus-circle"
                    rounded
                    outlined
                    severity="success"
                    onClick={() => {
                      handleEditFicha(ficha);
                    }}
                    style={{ marginLeft: "10px", marginTop: "10px" }}
                  />
                </form>
              </Dialog>
            </div>
          )}
        />
      </DataTable>
    </>
  );
}
