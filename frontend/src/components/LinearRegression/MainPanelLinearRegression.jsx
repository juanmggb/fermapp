import { useContext } from "react";
import Plot from "react-plotly.js";
import { useSelector } from "react-redux";
import { PlotProcessDataContext } from "../../lib/context/PlotProcessDataContext";

const MainPanelLinearRegression = () => {
  const { processData, xAxisVar, yAxisVar, zAxisVar } = useContext(
    PlotProcessDataContext
  );

  const linearRegression = useSelector((state) => state.linearRegression);
  const { response_surface } = linearRegression;

  const LAYOUT = {
    scene: {
      xaxis: { title: xAxisVar },
      yaxis: { title: yAxisVar },
      zaxis: { title: zAxisVar },
    },
    width: 700,
    height: 700,
  };

  const data = response_surface
    ? getResponseSurfaceData(
      response_surface,
      processData,
      xAxisVar,
      yAxisVar,
      zAxisVar
    )
    : get3DPlotData(processData, xAxisVar, yAxisVar, zAxisVar);

  return <Plot data={data} layout={LAYOUT} />;
};

export default MainPanelLinearRegression;

const get3DPlotData = (experimentalMCData, xAxisVar, yAxisVar, zAxisVar) => {
  return [
    {
      x: experimentalMCData[xAxisVar],
      y: experimentalMCData[yAxisVar],
      z: experimentalMCData[zAxisVar],
      type: "scatter3d",
      mode: "markers",
      marker: { size: 5 },
      name: "Experimental Data",
    },
  ];
};

const getResponseSurfaceData = (
  response_surface,
  processData,
  xAxisVar,
  yAxisVar,
  zAxisVar
) => {
  // Assuming processData is an object with keys that are arrays of values
  const scatterData = {
    x: processData[xAxisVar],
    y: processData[yAxisVar],
    z: processData[zAxisVar],
    type: "scatter3d",
    mode: "markers",
    marker: { size: 5 },
    name: "Experimental Data",
  };

  // Use the arrays of arrays directly for the surface plot
  const surfaceData = {
    x: response_surface.x_surf,
    y: response_surface.y_surf,
    z: response_surface.z_surf,
    type: "surface",
    colorscale: "Viridis",
    name: "Response Surface",
    showscale: false,
  };

  // Return both datasets in an array
  return [scatterData, surfaceData];
};
