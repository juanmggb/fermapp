import axios from "../axiosConfig"; // Import your axios instance
import {
  EXPERIMENT_DELETE_FAIL,
  EXPERIMENT_DELETE_REQUEST,
  EXPERIMENT_DELETE_SUCCESS,
  EXPERIMENT_DETAILS_FAIL,
  EXPERIMENT_DETAILS_REQUEST,
  EXPERIMENT_DETAILS_SUCCESS,
  EXPERIMENT_LIST_FAIL,
  EXPERIMENT_LIST_REQUEST,
  EXPERIMENT_LIST_RESET,
  EXPERIMENT_LIST_SUCCESS,
  EXPERIMENT_UPDATE_FAIL,
  EXPERIMENT_UPDATE_REQUEST,
  EXPERIMENT_UPDATE_SUCCESS,
  REGISTER_EXPERIMENT_FAIL,
  REGISTER_EXPERIMENT_REQUEST,
  REGISTER_EXPERIMENT_SUCCESS,
} from "../../constants/experimentConstants";

export const fetchExperimentList =
  (search = "") =>
  async (dispatch) => {
    dispatch({ type: EXPERIMENT_LIST_REQUEST });

    try {
      const { data } = await axios.get(`experiments${search}`);

      dispatch({ type: EXPERIMENT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: EXPERIMENT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const fetchExperimentDetails = (experimentId) => async (dispatch) => {
  dispatch({ type: EXPERIMENT_DETAILS_REQUEST });

  try {
    const { data } = await axios.get(`experiments/${experimentId}`);

    dispatch({ type: EXPERIMENT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EXPERIMENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const postExperiment = (experimentData) => async (dispatch) => {
  dispatch({ type: REGISTER_EXPERIMENT_REQUEST });

  try {
    // Making a POST request to the '/experiments/' endpoint of your DRF API
    const { data } = await axios.post("/experiments/", experimentData);

    dispatch({
      type: REGISTER_EXPERIMENT_SUCCESS,
      payload: data, // you can store the returned data in your Redux state if needed
    });
    // Reset experiment list
    dispatch({ type: EXPERIMENT_LIST_RESET });
  } catch (error) {
    dispatch({
      type: REGISTER_EXPERIMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteExperiment = (experimentId) => async (dispatch) => {
  dispatch({ type: EXPERIMENT_DELETE_REQUEST });

  try {
    const { data } = await axios.delete(`experiments/${experimentId}/`);

    dispatch({ type: EXPERIMENT_DELETE_SUCCESS, payload: data });

    // Reset experiment list
    dispatch({ type: EXPERIMENT_LIST_RESET });
  } catch (error) {
    dispatch({
      type: EXPERIMENT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateExperiment =
  (experimentData, experimentId) => async (dispatch) => {
    dispatch({ type: EXPERIMENT_UPDATE_REQUEST });

    try {
      const { data } = await axios.put(
        `experiments/${experimentId}/`,
        experimentData
      );
      dispatch({ type: EXPERIMENT_UPDATE_SUCCESS, payload: data });
      dispatch({ type: EXPERIMENT_LIST_RESET });
    } catch (error) {
      dispatch({
        type: EXPERIMENT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
