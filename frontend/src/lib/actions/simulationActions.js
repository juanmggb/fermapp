import axios from "../axiosConfig";

import {
  FAIL_SIMULATION,
  REQUEST_SIMULATION,
  SUCCESS_SIMULATION,
} from "../../constants/simulationConstants";

export const postSimulation = (formData) => async (dispatch) => {
  dispatch({ type: REQUEST_SIMULATION });

  try {
    const { data } = await axios.post("simulation/", formData);

    dispatch({ type: SUCCESS_SIMULATION, payload: data });
  } catch (error) {
    dispatch({ type: FAIL_SIMULATION, payload: error.message });
  }
};
