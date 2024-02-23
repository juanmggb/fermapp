import {
  FAIL_LINEAR_REGRESSION,
  FAIL_OPT_PARMS,
  REQUEST_LINEAR_REGRESSION,
  REQUEST_OPT_PARMS,
  SUCCESS_LINEAR_REGRESSION,
  SUCCESS_OPT_PARMS,
} from "../../constants/optimizationConstants";
import axios from "../axiosConfig"; // Import your axios instance

export const performOptParms = (formData) => async (dispatch) => {
  dispatch({ type: REQUEST_OPT_PARMS });

  try {
    const { data } = await axios.post("parameter-optimization/", formData);

    dispatch({ type: SUCCESS_OPT_PARMS, payload: data });
  } catch (error) {
    dispatch({
      type: FAIL_OPT_PARMS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const performLinearRegression = (formData) => async (dispatch) => {
  dispatch({ type: REQUEST_LINEAR_REGRESSION });

  try {
    const { data } = await axios.post("media-optimization/", formData);

    dispatch({ type: SUCCESS_LINEAR_REGRESSION, payload: data });
  } catch (error) {
    dispatch({
      type: FAIL_LINEAR_REGRESSION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
