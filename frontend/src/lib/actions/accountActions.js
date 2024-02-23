import axios from "../axiosConfig"; // Import your axios instance

import {
  ACCOUNT_DETAIL_FAIL,
  ACCOUNT_DETAIL_SUCCESS,
  ACCOUNT_UPDATE_FAIL,
  ACCOUNT_UPDATE_REQUEST,
  ACCOUNT_UPDATE_SUCCESS,
} from "../../constants/accountContants";
import { USER_LIST_RESET } from "../../constants/userConstants";
import { RESET_LABORATORY_LIST } from "../../constants/laboratoryConstants";

export const fetchAccountDetails = () => async (dispatch) => {
  dispatch({ type: ACCOUNT_DETAIL_FAIL });

  try {
    const { data } = await axios.get("me/");

    dispatch({ type: ACCOUNT_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ACCOUNT_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateAccount = (accountData) => async (dispatch) => {
  dispatch({ type: ACCOUNT_UPDATE_REQUEST });

  try {
    const config = {
      headers: {
        "Content-type": "multipart/form-data", // este tipo de datos se usa para enviar media files, como imagenes
        // Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put("me/", accountData, config);

    dispatch({ type: ACCOUNT_UPDATE_SUCCESS, payload: data });
    // Reset user and user list
    dispatch({ type: USER_LIST_RESET });

    // Reset laboratory list to update the list of users in each laboratory
    dispatch({ type: RESET_LABORATORY_LIST });
  } catch (error) {
    dispatch({
      type: ACCOUNT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
