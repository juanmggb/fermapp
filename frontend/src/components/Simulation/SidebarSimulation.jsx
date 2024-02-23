import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  biomassYieldDefaultValue,
  inhibitionConstDefaultValue,
  muDefaultValue,
  productYieldDefaultValue,
  satConstDefaultValue,
} from "../../constants/kineticParamConstants";
import { Button, Form } from "react-bootstrap";
import { SimulationFormContext } from "../../lib/context/SimulationFormContext";
import InitialConcentrationInputFields from "./InitialConcentrationInputFields";
import KineticParametersInputFields from "./KineticParametersInputFields";
import OperationParameterInputFields from "./OperationParameterInputFields";
import { postSimulation } from "../../lib/actions/simulationActions";
import SimulationModelInputField from "./SimulationModelInputField";

const SidebarSimulation = () => {
  const dispatch = useDispatch();

  const simulationData = useSelector((state) => state.simulationData);
  const { simulation } = simulationData;

  // Use useForm to perform validation in the form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      X0: 0.2, // default initial conditions
      S0: 40,
      P0: 0,
      mu: muDefaultValue, // default kinetic parameters
      Y: biomassYieldDefaultValue,
      Yp: productYieldDefaultValue,
      Ks: satConstDefaultValue,
      Ki: inhibitionConstDefaultValue,
    },
  });

  // This useEffect is to show messages to the user
  useEffect(() => {
    if (errors.X0) {
      toast.dismiss();
      toast.error(errors.X0.message);
    }

    if (errors.S0) {
      toast.dismiss();
      toast.error(errors.S0.message);
    }

    if (errors.P0) {
      toast.dismiss();
      toast.error(errors.P0.message);
    }

    if (errors.model) {
      toast.dismiss();
      toast.error(errors.model.message);
    }
  }, [errors.model, errors.X0, errors.S0, errors.P0]);

  // Submit simulation input to perform the simulation
  const onSubmit = (data) => {
    console.log(data);
    if (data.model === "monod") {
      delete data.Ki;
    }

    dispatch(postSimulation(data));
  };

  // I want a way to obtain model here to pass it as part of the context
  const model = watch("model");

  return (
    <Form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
      {/* I want to pass the value of model here */}
      <SimulationFormContext.Provider value={{ register, model }}>
        {/* Simulation model */}
        <SimulationModelInputField />

        <hr />

        {/* Initial concentration values */}
        <InitialConcentrationInputFields />

        <hr />

        {/* Kinetic Parameters */}
        <KineticParametersInputFields />

        <hr />

        {/* Time step and simulation time */}
        <OperationParameterInputFields />
      </SimulationFormContext.Provider>

      <hr />

      <div className="d-flex justify-content-center gap-3">
        <Button type="submit">Perform Simulation</Button>
        {simulation && (
          <Button
            onClick={() =>
              downloadCSV(convertToCSV(simulation), "simulation.csv")
            }
          >
            Download CSV
          </Button>
        )}
      </div>
    </Form>
  );
};

export default SidebarSimulation;

const convertToCSV = (simulation) => {
  const headers = ["Time(h)", "Biomass(g/L)", "Product(g/L)", "Substrate(g/L)"];
  const rows = simulation.time.map((_, idx) => [
    simulation.time[idx],
    simulation.x[idx],
    simulation.p[idx],
    simulation.s[idx],
  ]);

  const csvContent =
    headers.join(",") + "\n" + rows.map((e) => e.join(",")).join("\n");

  return csvContent;
};

const downloadCSV = (csvContent, fileName) => {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
