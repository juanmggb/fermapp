import axios from "../axiosConfig"; // Import your axios instance
import {
  MICROORGANISM_DELETE_FAIL,
  MICROORGANISM_DELETE_REQUEST,
  MICROORGANISM_DELETE_SUCCESS,
  MICROORGANISM_DETAILS_FAIL,
  MICROORGANISM_DETAILS_REQUEST,
  MICROORGANISM_DETAILS_SUCCESS,
  MICROORGANISM_LIST_FAIL,
  MICROORGANISM_LIST_REQUEST,
  MICROORGANISM_LIST_RESET,
  MICROORGANISM_LIST_SUCCESS,
  MICROORGANISM_REGISTER_FAIL,
  MICROORGANISM_REGISTER_REQUEST,
  MICROORGANISM_REGISTER_SUCCESS,
  MICROORGANISM_UPDATE_FAIL,
  MICROORGANISM_UPDATE_REQUEST,
  MICROORGANISM_UPDATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_RESET,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_REGISTER_FAIL,
  PRODUCT_REGISTER_REQUEST,
  PRODUCT_REGISTER_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  SUBSTRATE_DELETE_FAIL,
  SUBSTRATE_DELETE_REQUEST,
  SUBSTRATE_DELETE_SUCCESS,
  SUBSTRATE_DETAILS_FAIL,
  SUBSTRATE_DETAILS_REQUEST,
  SUBSTRATE_DETAILS_SUCCESS,
  SUBSTRATE_LIST_FAIL,
  SUBSTRATE_LIST_REQUEST,
  SUBSTRATE_LIST_RESET,
  SUBSTRATE_LIST_SUCCESS,
  SUBSTRATE_REGISTER_FAIL,
  SUBSTRATE_REGISTER_REQUEST,
  SUBSTRATE_REGISTER_SUCCESS,
  SUBSTRATE_UPDATE_FAIL,
  SUBSTRATE_UPDATE_REQUEST,
  SUBSTRATE_UPDATE_SUCCESS,
} from "../../constants/elementConstants";

export const fetchMicroorganismList =
  (search = "") =>
  async (dispatch) => {
    dispatch({ type: MICROORGANISM_LIST_REQUEST });

    try {
      const { data } = await axios.get(`microorganisms${search}`);

      dispatch({ type: MICROORGANISM_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: MICROORGANISM_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const fetchMicroorganismDetails =
  (microorganismId) => async (dispatch) => {
    dispatch({ type: MICROORGANISM_DETAILS_REQUEST });

    try {
      const { data } = await axios.get(`microorganisms/${microorganismId}`);

      dispatch({ type: MICROORGANISM_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: MICROORGANISM_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateMicroorganism =
  (microorganismData, microorganismId) => async (dispatch) => {
    dispatch({ type: MICROORGANISM_UPDATE_REQUEST });

    try {
      const { data } = await axios.put(
        `microorganisms/${microorganismId}/`,
        microorganismData
      );

      dispatch({ type: MICROORGANISM_UPDATE_SUCCESS, payload: data });
      // Reset microorganism list
      dispatch({ type: MICROORGANISM_LIST_RESET });
    } catch (error) {
      dispatch({
        type: MICROORGANISM_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const postMicroorganism = (microorganismData) => async (dispatch) => {
  dispatch({ type: MICROORGANISM_REGISTER_REQUEST });

  try {
    const { data } = await axios.post("microorganisms/", microorganismData);

    dispatch({ type: MICROORGANISM_REGISTER_SUCCESS, payload: data });
    // Reset microorganism list
    dispatch({ type: MICROORGANISM_LIST_RESET });
  } catch (error) {
    dispatch({
      type: MICROORGANISM_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteMicroorganism = (microorganismId) => async (dispatch) => {
  dispatch({ type: MICROORGANISM_DELETE_REQUEST });

  try {
    const { data } = await axios.delete(`microorganisms/${microorganismId}/`);

    dispatch({ type: MICROORGANISM_DELETE_SUCCESS, payload: data });

    // Reset microorganism list
    dispatch({ type: MICROORGANISM_LIST_RESET });
  } catch (error) {
    dispatch({
      type: MICROORGANISM_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Substrate

export const fetchSubstrateList =
  (search = "") =>
  async (dispatch) => {
    dispatch({ type: SUBSTRATE_LIST_REQUEST });

    try {
      const { data } = await axios.get(`substrates${search}`);

      dispatch({ type: SUBSTRATE_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: SUBSTRATE_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const fetchSubstrateDetails = (substrateId) => async (dispatch) => {
  dispatch({ type: SUBSTRATE_DETAILS_REQUEST });

  try {
    const { data } = await axios.get(`substrates/${substrateId}/`);

    dispatch({ type: SUBSTRATE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SUBSTRATE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateSubstrate =
  (substrateData, substrateId) => async (dispatch) => {
    dispatch({ type: SUBSTRATE_UPDATE_REQUEST });

    try {
      const { data } = await axios.put(
        `substrates/${substrateId}/`,
        substrateData
      );

      dispatch({ type: SUBSTRATE_UPDATE_SUCCESS, payload: data });
      // Reset substrate list
      dispatch({ type: SUBSTRATE_LIST_RESET });
    } catch (error) {
      dispatch({
        type: SUBSTRATE_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const postSubstrate = (substrateData) => async (dispatch) => {
  dispatch({ type: SUBSTRATE_REGISTER_REQUEST });

  try {
    const { data } = await axios.post("substrates/", substrateData);

    dispatch({ type: SUBSTRATE_REGISTER_SUCCESS, payload: data });
    // Reset substrate list
    dispatch({ type: SUBSTRATE_LIST_RESET });
  } catch (error) {
    dispatch({
      type: SUBSTRATE_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteSubstrate = (substrateId) => async (dispatch) => {
  dispatch({ type: SUBSTRATE_DELETE_REQUEST });

  try {
    const { data } = await axios.delete(`substrates/${substrateId}/`);

    dispatch({ type: SUBSTRATE_DELETE_SUCCESS, payload: data });
    // Reset substrate list
    dispatch({ type: SUBSTRATE_LIST_RESET });
  } catch (error) {
    dispatch({
      type: SUBSTRATE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Products

export const fetchProductList =
  (search = "") =>
  async (dispatch) => {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    try {
      const { data } = await axios.get(`products${search}`);

      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const fetchProductDetails = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST });

  try {
    const { data } = await axios.get(`products/${productId}/`);

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const postProduct = (productData) => async (dispatch) => {
  dispatch({ type: PRODUCT_REGISTER_REQUEST });

  try {
    const { data } = await axios.post("products/", productData);
    dispatch({ type: PRODUCT_REGISTER_SUCCESS, payload: data });
    // Reset product list
    dispatch({ type: PRODUCT_LIST_RESET });
  } catch (error) {
    dispatch({
      type: PRODUCT_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProduct = (productData, productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_UPDATE_REQUEST });

  try {
    const { data } = await axios.put(`products/${productId}/`, productData);

    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    // Reset product list
    dispatch({ type: PRODUCT_LIST_RESET });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DELETE_REQUEST });

  try {
    const { data } = await axios.delete(`products/${productId}/`);

    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data });
    // Reset product list
    dispatch({ type: PRODUCT_LIST_RESET });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
