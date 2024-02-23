import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import ParametersOptimizationResultsModal from "./ParametersOptimizationResultsModal";
import GAParametersModal from "./GAParametersModal";
import { handleFileChange } from "../../lib/utilis/parameterEstimation";
import { OptimizationFormContext } from "../../lib/context/OptimizationFormContext";
import { performOptParms } from "../../lib/actions/optimizationActions";
import OptimizationModelInputField from "./OptimizationModelInputField";
import KineticParametersInputFields from "./KineticParametersInputFields";

// Component #########################################################################################################
function SidebarOptimization({ kineticData, setKineticData }) {
  const dispatch = useDispatch();

  // Get parameter optimization results from the Redux Store
  const parameterOptimization = useSelector(
    (state) => state.parameterOptimization
  );
  const { best_params, minError, simulatedData } = parameterOptimization;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showGAParams, setShowGAParams] = useState(false);
  const handleCloseGAParams = () => setShowGAParams(false);
  const handleShowGAParams = () => setShowGAParams(true);

  // Use useForm to perform validation in the form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      // GA parameters
      max_num_iteration: 50,
      population_size: 50,
      mutation_probability: 0.1,
      elit_ratio: 0.01,
      crossover_probability: 0.8,
      crossover_type: "two_point",
      max_iteration_without_improv: 50,
    },
  });

  useEffect(() => {
    if (errors.model) {
      toast.dismiss();
      toast.error(errors.model.message);
    }
  }, [errors.model, errors.experimentalData]);

  // Submit simulation input to perform the simulation
  const onSubmit = (data) => {
    if (kineticData) {
      const kineticData_ = prepareKineticData(data);

      if (!kineticData_) {
        toast.dismiss();
        toast.error("At least one kinetic parameter must be optimized");
        return null;
      }

      const model = kineticData_.model;
      console.log("model", model);

      if (model === "monod") {
        delete kineticData_.Ki;
      }

      // Obtain GA parameters
      const GAParams = getGAParams(data);

      dispatch(
        performOptParms({
          kineticData: kineticData_,
          experimentalData: kineticData,
          GAParams,
        })
      );
    } else {
      toast.dismiss();
      toast.error(
        "Please, introduce experimental data to perform the parameter optimization"
      );
    }
  };

  // Get the model value from the form
  const model = watch("model");

  console.log("model", model);

  return (
    <>
      <Form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Choose a file</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => handleFileChange(e, setKineticData, dispatch)}
          />
        </Form.Group>

        <hr />
        <OptimizationFormContext.Provider value={{ register, model }}>
          {/* Simulation model */}
          <OptimizationModelInputField />
          <hr />
          {/* Kinetic Parameters */}
          <KineticParametersInputFields />
          {/* <KineticParametersInputFields /> */}
        </OptimizationFormContext.Provider>
        <hr />

        <div className="d-flex justify-content-center gap-3">
          <Button type="submit">Perform Estimation</Button>
          {best_params && <Button onClick={handleShow}>Show Results</Button>}
        </div>
      </Form>

      <hr />
      <div className="d-flex justify-content-center gap-3">
        <Button onClick={handleShowGAParams}>Show GA Parameters</Button>
        {simulatedData && (
          <Button
            onClick={() =>
              downloadCSV(convertToCSV(simulatedData), "simulation.csv")
            }
          >
            Download CSV
          </Button>
        )}
      </div>
      {best_params && (
        <ParametersOptimizationResultsModal
          show={show}
          handleClose={handleClose}
          best_params={best_params}
          minError={minError}
        />
      )}

      <OptimizationFormContext.Provider value={{ register }}>
        {showGAParams && (
          <GAParametersModal
            show={showGAParams}
            handleClose={handleCloseGAParams}
          />
        )}
      </OptimizationFormContext.Provider>
    </>
  );
}

export default SidebarOptimization;

function prepareKineticData(data) {
  let shouldOptimize = false; // Flag to check if at least one parameter should be optimized
  const preparedData = {};

  // Iterate through each key-value pair in the object
  for (const [key, value] of Object.entries(data)) {
    // Check if the key ends with '_optimize'
    if (key.endsWith("_optimize")) {
      const prefix = key.split("_")[0]; // Extract the prefix like 'Ks', 'Y', 'Yp', 'mu'
      preparedData[prefix] = {};

      if (value === true) {
        shouldOptimize = true;
        preparedData[prefix]["optimize"] = true;
        preparedData[prefix]["min"] = parseFloat(data[`${prefix}_min`]);
        preparedData[prefix]["max"] = parseFloat(data[`${prefix}_max`]);
      } else {
        preparedData[prefix]["optimize"] = false;
        preparedData[prefix]["fixed"] = parseFloat(data[`${prefix}_fixed`]); // Assuming fixed value is stored in max
      }
    }
  }

  // Add the model to the prepared data
  preparedData["model"] = data.model;

  // If no parameters are set to be optimized, return null
  if (!shouldOptimize) return null;

  return preparedData;
}

const getGAParams = (data) => {
  const {
    max_num_iteration,
    population_size,
    mutation_probability,
    elit_ratio,
    crossover_probability,
    crossover_type,
    max_iteration_without_improv,
  } = data;

  return {
    max_num_iteration,
    population_size,
    mutation_probability,
    elit_ratio,
    crossover_probability,
    crossover_type,
    max_iteration_without_improv,
  };
};

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
