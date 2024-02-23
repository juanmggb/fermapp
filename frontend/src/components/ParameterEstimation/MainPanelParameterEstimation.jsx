import { useEffect } from "react";
import { toast } from "react-hot-toast";
import Plot from "react-plotly.js";
import { useSelector } from "react-redux";

const LAYOUT = {
  title: "Experimental data",
  xaxis: {
    title: "Time (h)",
  },
  yaxis: {
    title: "Concentration (g/L)",
  },
};

function MainPanelParameterEstimation({ kineticData }) {
  const parameterOptimization = useSelector(
    (state) => state.parameterOptimization
  );
  const { loading, simulatedData, model_type, error } = parameterOptimization;

  useEffect(() => {
    let toastId;
    if (loading) {
      toastId = toast.loading("Peforming parameter estimation");
    }

    if (error) {
      toast.dismiss(toastId);
      toast.error("An error ocurred when performing paramter estimation");
    }

    if (simulatedData) {
      toast.dismiss(toastId);
      toast.success("Parameter Estimation Performed Successfully");
    }
  }, [loading, error, simulatedData]);

  if (!kineticData) return <Plot layout={LAYOUT} />;

  const data = simulatedData
    ? getCombinedPlotData(kineticData, simulatedData)
    : getPlotExperimentalData(kineticData);

  const layout = simulatedData
    ? {
        ...LAYOUT,
        title: `Experimental Data and Simulation with Optimal Parameters using ${model_type} Model`,
      }
    : LAYOUT;

  return <Plot data={data} layout={layout} />;
}

export default MainPanelParameterEstimation;

const getPlotExperimentalData = (data) => {
  const plotData = [
    {
      x: data.t,
      y: data.x,
      type: "scatter",
      mode: "markers",
      name: "X vs t",
      marker: { color: "blue" },
    },
    {
      x: data.t,
      y: data.s,
      type: "scatter",
      mode: "markers",
      name: "S vs t",
      marker: { color: "red" },
    },
    {
      x: data.t,
      y: data.p,
      type: "scatter",
      mode: "markers",
      name: "P vs t",
      marker: { color: "green" },
    },
  ];

  return plotData;
};

const getCombinedPlotData = (kineticData, simulatedData) => {
  console.log("kineticData", kineticData);
  console.log(" simulatedData", simulatedData);
  const kineticPlotData = [
    {
      x: kineticData.t,
      y: kineticData.x,
      type: "scatter",
      mode: "markers",
      name: "Experimental X vs t",
      marker: { color: "blue" },
    },
    {
      x: kineticData.t,
      y: kineticData.s,
      type: "scatter",
      mode: "markers",
      name: "Experimental S vs t",
      marker: { color: "red" },
    },
    {
      x: kineticData.t,
      y: kineticData.p,
      type: "scatter",
      mode: "markers",
      name: "Experimental P vs t",
      marker: { color: "green" },
    },
  ];

  const simulatedPlotData = [
    {
      x: simulatedData.time,
      y: simulatedData.x,
      type: "scatter",
      mode: "lines",
      name: "Simulated X vs t",
      line: { color: "blue", dash: "dot" },
    },
    {
      x: simulatedData.time,
      y: simulatedData.s,
      type: "scatter",
      mode: "lines",
      name: "Simulated S vs t",
      line: { color: "red", dash: "dot" },
    },
    {
      x: simulatedData.time,
      y: simulatedData.p,
      type: "scatter",
      mode: "lines",
      name: "Simulated P vs t",
      line: { color: "green", dash: "dot" },
    },
  ];

  return [...kineticPlotData, ...simulatedPlotData];
};
