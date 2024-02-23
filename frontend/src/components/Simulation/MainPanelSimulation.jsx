import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Plot from "react-plotly.js";
import { useSelector } from "react-redux";

const LAYOUT = {
  title: "Simulation Data",
  xaxis: {
    title: "Time (h)",
  },
  yaxis: {
    title: "Concentration (g/L)",
  },
};

function MainPanelSimulation() {
  const simulationData = useSelector((state) => state.simulationData);
  const { loading, simulation, error } = simulationData;

  const [plotData, setPlotData] = useState([]);

  useEffect(() => {
    let toastId;
    if (loading) {
      // Loading toast (useful for async operations)
      toastId = toast.loading("Performing simulation");
    }

    if (error) {
      toast.dismiss(toastId);
      toast.error("Error during simulation");
    }

    if (simulation) {
      toast.dismiss(toastId);
      setPlotData([
        {
          x: simulation.time,
          y: simulation.x,
          type: "scatter",
          mode: "lines",
          name: "Biomass",
          marker: { color: "blue" },
        },
        {
          x: simulation.time,
          y: simulation.s,
          type: "scatter",
          mode: "lines",
          name: "Substrate",
          marker: { color: "red" },
        },
        {
          x: simulation.time,
          y: simulation.p,
          type: "scatter",
          mode: "lines",
          name: "Product",
          marker: { color: "green" },
        },
      ]);
    }
  }, [loading, error, simulation]);

  return <Plot data={plotData} layout={LAYOUT} />;
}

export default MainPanelSimulation;
