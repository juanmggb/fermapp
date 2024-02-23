import Table from "react-bootstrap/Table";

function ExperimentVariableTable({ variables }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Variable Name</th>
          <th>Variable Units</th>
        </tr>
      </thead>
      <tbody>
        {variables.map((variable, index) => (
          <tr key={index}>
            <td>{variable.variable_name}</td>
            <td>{variable.variable_units}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ExperimentVariableTable;
