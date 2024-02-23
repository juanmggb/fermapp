export const getExperimentalVariables = (
  data,
  variableNames,
  variableValues
) => {
  // If any data[`${varName}-variable_name`] is empty ruturn null, don't do anything else

  const values = [];

  // Check if any variableName is empty, if so, return an empty array
  if (variableNames.some((varName) => !data[`${varName}-variable_name`])) {
    return [];
  }

  variableNames.forEach((varName) => {
    const variableName = data[`${varName}-variable_name`] || "";

    const variableUnits = data[`${varName}-variable_units`] || "";
    const detectionMethod = data[`${varName}-detection_method`] || "";

    const obj = {
      variable_name: variableName,
      variable_units: variableUnits,
      detection_method: detectionMethod,
      values: variableValues[variableName], // when I hange the variableName then I can't access the values. So I will need to change the variableName key in the VariableValues object when I change the variableName
    };

    values.push(obj);
  });

  return values;
};
