import {
  FAIL_SIMULATION,
  REQUEST_SIMULATION,
  RESET_SIMULATION,
  SUCCESS_SIMULATION,
} from "../../constants/simulationConstants";

export const simulationDataReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_SIMULATION:
      return { loading: true };

    case SUCCESS_SIMULATION:
      return { loading: false, simulation: action.payload };

    case FAIL_SIMULATION:
      return { loading: false, error: action.payload };

    case RESET_SIMULATION:
      return {};

    default:
      return state;
  }
};
