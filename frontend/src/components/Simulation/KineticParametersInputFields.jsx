import {
  biomassYieldMinValue,
  biomassYieldMaxValue,
  inhibitionConstMaxValue,
  inhibitionConstMinValue,
  muMaxValue,
  muMinValue,
  productYieldMaxValue,
  productYieldMinValue,
  satConstMaxValue,
  satConstMinValue,
} from "../../constants/kineticParamConstants";
import { useKineticParamsSimulation } from "../../lib/hooks/useKineticParams";
import { useContext } from "react";
import KineticParameterSimulation from "./KineticParameterSimulation";
import { Col, Row } from "react-bootstrap";
import { SimulationFormContext } from "../../lib/context/SimulationFormContext";

const KineticParametersInputFields = () => {
  const { model } = useContext(SimulationFormContext);

  // Create kinetic parameter states
  const {
    muValue,
    biomassYieldValue,
    productYieldValue,
    satConstValue,
    inhibitionConstValue,
    handleMuChange,
    handleBiomassYieldChange,
    handleProductYieldChange,
    handleSatConstChange,
    handleInhibitionConstChange,
  } = useKineticParamsSimulation();

  return (
    <div className="mb-5">
      <Row>
        <Col md={4}>
          <KineticParameterSimulation
            symbol={"mu"}
            minValue={muMinValue}
            maxValue={muMaxValue}
            value={muValue}
            step={0.01}
            handleChange={handleMuChange}
          />
        </Col>

        <Col md={4}>
          <KineticParameterSimulation
            symbol={"Y"}
            minValue={biomassYieldMinValue}
            maxValue={biomassYieldMaxValue}
            value={biomassYieldValue}
            step={0.01}
            handleChange={handleBiomassYieldChange}
          />
        </Col>

        <Col md={4}>
          <KineticParameterSimulation
            symbol={"Yp"}
            minValue={productYieldMinValue}
            maxValue={productYieldMaxValue}
            value={productYieldValue}
            step={1}
            handleChange={handleProductYieldChange}
          />
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <KineticParameterSimulation
            symbol={"Ks"}
            minValue={satConstMinValue}
            maxValue={satConstMaxValue}
            value={satConstValue}
            step={1}
            handleChange={handleSatConstChange}
          />
        </Col>
        {model === "inhibition" && (
          <Col md={4}>
            <KineticParameterSimulation
              symbol={"Ki"}
              minValue={inhibitionConstMinValue}
              maxValue={inhibitionConstMaxValue}
              value={inhibitionConstValue}
              step={0.01}
              handleChange={handleInhibitionConstChange}
            />
          </Col>
        )}
      </Row>
    </div>
  );
};
export default KineticParametersInputFields;
