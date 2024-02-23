import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_RESET,
  USER_REGISTER_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_RESET,
  USER_DELETE_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
  USER_UPDATE_SUCCESS,
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_DETAIL_FAIL,
} from "../../constants/userConstants";

const userInitialState = {
  loading: false,
  users: null,
  error: null,
};

export const userListReducer = (state = userInitialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case USER_LIST_REQUEST:
      return { loading: true };

    case USER_LIST_SUCCESS:
      return { loading: false, users: payload };

    case USER_LIST_FAIL:
      return { loading: false, error: payload };

    case USER_LIST_RESET:
      return userInitialState;

    default:
      return state;
  }
};

const userDetailsInitialState = {
  loading: false,
  user: null,
  error: null,
};

export const userDetailsReducer = (state = userDetailsInitialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case USER_DETAIL_REQUEST:
      return { loading: true };

    case USER_DETAIL_SUCCESS:
      return { loading: false, user: payload };

    case USER_DETAIL_FAIL:
      return { loading: false, error: payload };

    case USER_LIST_RESET:
      return userDetailsInitialState;

    default:
      return state;
  }
};

const userUpdateInitialState = {
  loading: false,
  success: false,
  error: null,
};

export const userUpdateReducer = (state = userUpdateInitialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };

    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true };

    case USER_UPDATE_FAIL:
      return { loading: false, error: payload };

    case USER_UPDATE_RESET:
      return userUpdateInitialState;

    default:
      return state;
  }
};

const registerUserInitialState = {
  loading: false,
  success: false,
  error: null,
};

// Register user and member
export const userRegisterReducer = (
  state = registerUserInitialState,
  action
) => {
  const { payload, type } = action;

  switch (type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };

    case USER_REGISTER_SUCCESS:
      return { loading: false, success: true };

    case USER_REGISTER_FAIL:
      return { loading: false, error: payload };

    case USER_REGISTER_RESET:
      return registerUserInitialState;

    default:
      return state;
  }
};

// Delete user and member
const userDeleteInitialState = {
  loading: false,
  success: false,
  error: null,
};

export const userDeleteReducer = (state = userDeleteInitialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case USER_DELETE_REQUEST:
      return { loading: true };

    case USER_DELETE_SUCCESS:
      return { loading: false, success: true };

    case USER_DELETE_FAIL:
      return { loading: false, error: payload };

    case USER_DELETE_RESET:
      return userDeleteInitialState;

    default:
      return state;
  }
};
