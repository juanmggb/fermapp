import {
  FAIL_LABORATORY_DELETE,
  FAIL_LABORATORY_DETAIL,
  FAIL_LABORATORY_LIST,
  FAIL_REGISTER_LABORATORY,
  FAIL_UPDATE_LABORATORY,
  REQUEST_LABORATORY_DELETE,
  REQUEST_LABORATORY_DETAIL,
  REQUEST_LABORATORY_LIST,
  REQUEST_REGISTER_LABORATORY,
  REQUEST_UPDATE_LABORATORY,
  RESET_LABORATORY_LIST,
  SUCCESS_LABORATORY_DELETE,
  SUCCESS_LABORATORY_DETAIL,
  SUCCESS_LABORATORY_LIST,
  SUCCESS_REGISTER_LABORATORY,
  SUCCESS_UPDATE_LABORATORY,
} from "../../constants/laboratoryConstants";
import axios from "../axiosConfig"; // Import your axios instance

export const fetchLaboratoryList =
  (search = "") =>
  async (dispatch) => {
    dispatch({ type: REQUEST_LABORATORY_LIST });

    try {
      const { data } = await axios.get(`laboratories${search}`);

      dispatch({ type: SUCCESS_LABORATORY_LIST, payload: data });
    } catch (error) {
      dispatch({
        type: FAIL_LABORATORY_LIST,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const fetchLaboratoryDetail = (laboratoryId) => async (dispatch) => {
  dispatch({ type: REQUEST_LABORATORY_DETAIL });

  try {
    const { data } = await axios.get(`laboratories/${laboratoryId}`);

    dispatch({ type: SUCCESS_LABORATORY_DETAIL, payload: data });
  } catch (error) {
    dispatch({
      type: FAIL_LABORATORY_DETAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const postLaboratory = (laboratoryData) => async (dispatch) => {
  dispatch({ type: REQUEST_REGISTER_LABORATORY });

  try {
    const { data } = await axios.post("laboratories/", laboratoryData);

    dispatch({ type: SUCCESS_REGISTER_LABORATORY, payload: data });

    // Reset laboratory list
    dispatch({ type: RESET_LABORATORY_LIST });
  } catch (error) {
    dispatch({
      type: FAIL_REGISTER_LABORATORY,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const putLaboratory =
  (laboratoryData, laboratoryId) => async (dispatch) => {
    dispatch({ type: REQUEST_UPDATE_LABORATORY });

    try {
      const { data } = await axios.put(
        `laboratories/${laboratoryId}/`,
        laboratoryData
      );

      dispatch({ type: SUCCESS_UPDATE_LABORATORY, payload: data });

      // Reset laboratory list
      dispatch({ type: RESET_LABORATORY_LIST });
    } catch (error) {
      dispatch({
        type: FAIL_UPDATE_LABORATORY,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteLaboratory = (laboratoryId) => async (dispatch) => {
  dispatch({ type: REQUEST_LABORATORY_DELETE });

  try {
    const { data } = await axios.delete(`laboratories/${laboratoryId}`);

    dispatch({ type: SUCCESS_LABORATORY_DELETE, payload: data });

    // Reset laboratory list
    dispatch({ type: RESET_LABORATORY_LIST });
  } catch (error) {
    dispatch({
      type: FAIL_LABORATORY_DELETE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
