import { useState } from "react";

export const useExperimentVariables = () => {
  const [experimentVariables, setExperimentVariables] = useState({
    variableNames: [],
    variableValues: {},
  });

  const handleFileChange = (file) => {
    // Initialize a new FileReader instance
    const reader = new FileReader();

    // Define what happens when the file has been successfully read
    reader.onload = (e) => {
      // Get the text content of the file
      const contents = e.target.result;

      // Destructure the content into header and rows
      // Trim to remove any extra whitespace or new lines at the end of the file
      const [header, ...rows] = contents.trim().split("\n");

      // Extract column names from the header and trim each one
      const variableNames = header.split(",").map((str) => str.trimEnd());

      // Update state with the extracted column names
      // setColNames(columnNames);

      // Initialize an array to store measures for each column
      // Each measure object contains a variable name and an empty values array
      const measures = variableNames.reduce((acc, curr) => {
        acc[curr] = [];
        return acc;
      }, {});

      // Loop through each row to populate the measures
      rows.forEach((row) => {
        // Split the row into individual values
        const values = row.split(",");

        // Populate the 'values' array in each measure
        values.forEach((value, index) => {
          // Convert the value to a number
          const numericValue = parseFloat(value);

          // If the value is not a number, store null, else store the numeric value
          measures[variableNames[index]].push(
            isNaN(numericValue) ? null : numericValue
          );
        });
      });

      // Update state with the populated measures
      // setVariableMeasures(measures);
      setExperimentVariables({
        variableNames: variableNames,
        variableValues: measures,
      });
    };

    // Start reading the file content as text
    reader.readAsText(file);
  };

  const renameVariable = (oldVarName, newVarName) => {
    setExperimentVariables((prevState) => {
      // Update the variableNames array
      const newVariableNames = prevState.variableNames.map((varName) =>
        varName === oldVarName ? newVarName : varName
      );

      // Create a new variableValues object with the new key
      const newVariableValues = { ...prevState.variableValues };
      newVariableValues[newVarName] = newVariableValues[oldVarName];
      delete newVariableValues[oldVarName]; // Remove the old key

      return {
        ...prevState,
        variableNames: newVariableNames,
        variableValues: newVariableValues,
      };
    });
  };

  return { ...experimentVariables, handleFileChange, renameVariable };
};
