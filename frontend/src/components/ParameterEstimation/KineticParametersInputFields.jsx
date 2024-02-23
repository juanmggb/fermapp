import { useContext } from "react";
import KineticParameterOptimization from "./KineticParameterOptimization";

import { OptimizationFormContext } from "../../lib/context/OptimizationFormContext";
import { useKineticParamsOptimization } from "../../lib/hooks/useKineticParamsOptimization";
import { Col, Row } from "react-bootstrap";

const KineticParametersInputFields = () => {
  const { model } = useContext(OptimizationFormContext);
  const { mu, biomassYield, productYield, satConst, inhibitionConst } =
    useKineticParamsOptimization();

  return (
    <>
      <Row className="mb-3">
        <Col md={6}>
          <KineticParameterOptimization
            symbol={"mu"}
            optimize={mu.optimize}
            setOptimize={mu.handleMuOptimizeChange}
            value={mu.value}
            setValue={mu.handleMuValueChange}
            minValue={mu.minValue}
            setMinValue={mu.handleMuMinChange}
            maxValue={mu.maxValue}
            setMaxValue={mu.handleMuMaxChange}
          />
        </Col>
        <Col md={6}>
          <KineticParameterOptimization
            symbol={"Y"}
            optimize={biomassYield.optimize}
            setOptimize={biomassYield.handleBiomassYieldOptimizeChange}
            value={biomassYield.value}
            setValue={biomassYield.handleBiomassYieldValueChange}
            minValue={biomassYield.minValue}
            setMinValue={biomassYield.handleBiomassYieldMinChange}
            maxValue={biomassYield.maxValue}
            setMaxValue={biomassYield.handleBiomassYieldMaxChange}
          />
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <KineticParameterOptimization
            symbol={"Yp"}
            optimize={productYield.optimize}
            setOptimize={productYield.handleProductYieldOptimizeChange}
            value={productYield.value}
            setValue={productYield.handleProductYieldValueChange}
            minValue={productYield.minValue}
            setMinValue={productYield.handleProductYieldMinChange}
            maxValue={productYield.maxValue}
            setMaxValue={productYield.handleProductYieldMaxChange}
          />
        </Col>
        <Col md={6}>
          <KineticParameterOptimization
            symbol={"Ks"}
            optimize={satConst.optimize}
            setOptimize={satConst.handleSatConstOptimizeChange}
            value={satConst.value}
            setValue={satConst.handleSatConstValueChange}
            minValue={satConst.minValue}
            setMinValue={satConst.handleSatConstMinChange}
            maxValue={satConst.maxValue}
            setMaxValue={satConst.handleSatConstMaxChange}
          />
        </Col>
      </Row>
      <Row>
        {model === "inhibition" && (
          <Col md={6}>
            <KineticParameterOptimization
              symbol={"Ki"}
              optimize={inhibitionConst.optimize}
              setOptimize={inhibitionConst.handleInhibitionConstOptimizeChange}
              value={inhibitionConst.value}
              setValue={inhibitionConst.handleInhibitionConstValueChange}
              minValue={inhibitionConst.minValue}
              setMinValue={inhibitionConst.handleInhibitionConstMinChange}
              maxValue={inhibitionConst.maxValue}
              setMaxValue={inhibitionConst.handleInhibitionConstMaxChange}
            />
          </Col>
        )}
      </Row>
    </>
  );
};
export default KineticParametersInputFields;
