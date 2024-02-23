import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_RESET,
  LOGIN_SUCCESS,
} from "../../constants/session";

const sessionInitialState = {
  loading: false,
  token: null,
  error: null,
};

export const loginReducer = (state = sessionInitialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case LOGIN_REQUEST:
      return { loading: true };

    case LOGIN_SUCCESS:
      return { loading: false, token: payload };

    case LOGIN_FAIL:
      return { loading: false, error: payload };

    case LOGIN_RESET:
      return sessionInitialState;

    default:
      return state;
  }
};
