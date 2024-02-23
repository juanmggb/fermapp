import { RESET_LABORATORY_LIST } from "../../constants/laboratoryConstants";
import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  // USER_DETAIL_FAIL,
  // USER_DETAIL_REQUEST,
  // USER_DETAIL_RESET,
  // USER_DETAIL_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_DETAIL_FAIL,
} from "../../constants/userConstants";
import axios from "../axiosConfig";

// Users
export const fetchUserList = () => async (dispatch) => {
  dispatch({ type: USER_LIST_REQUEST });

  try {
    const { data } = await axios.get("users/");

    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchUserDetails = (userId) => async (dispatch) => {
  dispatch({ type: USER_DETAIL_REQUEST });

  try {
    const { data } = await axios.get(`users/${userId}`);

    dispatch({ type: USER_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUser = (userData, userId) => async (dispatch) => {
  dispatch({ type: USER_UPDATE_REQUEST });

  try {
    const config = {
      headers: {
        "Content-type": "multipart/form-data", // este tipo de datos se usa para enviar media files, como imagenes
        // Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(`users/${userId}/`, userData, config);

    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    // Reset user and member list
    dispatch({ type: USER_LIST_RESET });
    // dispatch({ type: MEMBER_LIST_RESET });

    // Reset laboratory list to update the list of members in each laboratory
    dispatch({ type: RESET_LABORATORY_LIST });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Register user and member
export const postUser = (user) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST });

  try {
    const config = {
      headers: {
        "Content-type": "multipart/form-data", // este tipo de datos se usa para enviar media files, como imagenes
        // Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post("users/create/", user, config);

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    // Reset user and member list
    dispatch({ type: USER_LIST_RESET });
    // dispatch({ type: MEMBER_LIST_RESET });

    // Reset laboratory list to update the list of members in each laboratory
    dispatch({ type: RESET_LABORATORY_LIST });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Delete user and member
export const deleteUser = (userId) => async (dispatch) => {
  dispatch({ type: USER_DELETE_REQUEST });

  try {
    const { data } = await axios.delete(`users/${userId}/`);

    dispatch({ type: USER_DELETE_SUCCESS, payload: data });
    // Reset user and member list
    dispatch({ type: USER_LIST_RESET });
    // dispatch({ type: MEMBER_LIST_RESET });

    // Reset laboratory list to update the list of members in each laboratory
    dispatch({ type: RESET_LABORATORY_LIST });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
