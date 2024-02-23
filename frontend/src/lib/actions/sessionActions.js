import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from "../../constants/session";
import axios from "../axiosConfig";

export const login = (credentials) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const { data } = await axios.post("users/token/", credentials);

    dispatch({ type: LOGIN_SUCCESS, payload: data.access });

    console.log(data);

    localStorage.setItem("token", JSON.stringify(data.access));
    localStorage.setItem("name", JSON.stringify(data.name));
    // localStorage.setItem("refresh", JSON.stringify(data.refresh));
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => {
  localStorage.clear();

  window.location = "/login";
};
