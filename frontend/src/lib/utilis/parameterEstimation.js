import * as XLSX from "xlsx";
import { KINETIC_PARAMTERS_OPTIMIZATION_SYMBOLS } from "../../constants/kineticParamConstants";
import { RESET_OPT_PARMS } from "../../constants/optimizationConstants";

export const handleFileChange = (e, setKineticData, dispatch) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = (event) => {
    const binaryData = event.target.result;
    const workbook = XLSX.read(binaryData, { type: "binary" });
    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const jsonData = { t: [], x: [], s: [], p: [] };

    data.slice(1).forEach((row) => {
      jsonData.t.push(row[0]);
      jsonData.x.push(row[1]);
      jsonData.p.push(row[2]);
      jsonData.s.push(row[3]);
    });

    // jsonData
    setKineticData(jsonData);

    localStorage.setItem("kineticData", JSON.stringify(jsonData));
    dispatch({ type: RESET_OPT_PARMS });
  };
  reader.readAsBinaryString(file);
};

export const handledownloadReport = (best_params, minError) => {
  // Fetching user name and current date
  const username =
    JSON.parse(localStorage.getItem("username")) || "Unknown User";
  const currentDate = new Date().toLocaleDateString();

  // Constructing the report content
  let reportContent = `Report Generated by: ${username}\nDate: ${currentDate}\n\nOptimal Parameters:\n`;
  Object.keys(best_params).forEach((param) => {
    reportContent += `${KINETIC_PARAMTERS_OPTIMIZATION_SYMBOLS[param] || param
      }: ${best_params[param].toFixed(3)}\n`;
  });
  reportContent += `\nMean Squared Error: ${minError.toFixed(3)}`;

  // Creating a Blob from the report content
  const blob = new Blob([reportContent], {
    type: "text/plain;charset=utf-8",
  });

  // Creating a link element to download the Blob
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = `FermApp_AI_Report_${currentDate.replace(/\//g, "-")}.txt`;

  // Triggering the download
  document.body.appendChild(link);
  link.click();

  // Cleaning up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
