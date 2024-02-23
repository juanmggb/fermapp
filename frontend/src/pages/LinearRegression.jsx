import { Col, Container, Row } from "react-bootstrap";
import SidebarLinearRegression from "../components/LinearRegression/SidebarLinearRegression";
import MainPanelLinearRegression from "../components/LinearRegression/MainPanelLinearRegression";
import { useState } from "react";
import { PlotProcessDataContext } from "../lib/context/PlotProcessDataContext";
import { useDispatch } from "react-redux";
import { RESET_LINEAR_REGRESSION } from "../constants/optimizationConstants";

const getProcessData = () => {
  const processData = JSON.parse(localStorage.getItem("processData")) || null;
  if (!processData)
    return {
      processData: {},
      xAxisVar: "",
      yAxisVar: "",
      zAxisVar: "",
    };

  const columnNames = Object.keys(processData);

  return {
    processData,
    xAxisVar: columnNames[0],
    yAxisVar: columnNames[1],
    zAxisVar: columnNames[2],
  };
};

const LinearRegression = () => {
  const [plotProcessData, setPlotProcessData] = useState(getProcessData);

  const dispatch = useDispatch();

  const handleChangeAxisVariable = (dimAxisVar, variableName) => {
    setPlotProcessData((prevData) => ({
      ...prevData,
      [dimAxisVar]: variableName,
    }));

    dispatch({ type: RESET_LINEAR_REGRESSION });
  };

  return (
    <Container>
      <Row>
        <PlotProcessDataContext.Provider
          value={{
            ...plotProcessData,
            setPlotProcessData,
            handleChangeAxisVariable,
          }}
        >
          <Col md={4}>
            <SidebarLinearRegression />
          </Col>

          <Col md={8}>
            <MainPanelLinearRegression />
          </Col>
        </PlotProcessDataContext.Provider>
      </Row>
    </Container>
  );
};
export default LinearRegression;
