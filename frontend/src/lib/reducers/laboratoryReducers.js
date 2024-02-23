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
  RESET_LABORATORY_DELETE,
  RESET_LABORATORY_DETAIL,
  RESET_LABORATORY_LIST,
  RESET_REGISTER_LABORATORY,
  RESET_UPDATE_LABORATORY,
  SUCCESS_LABORATORY_DELETE,
  SUCCESS_LABORATORY_DETAIL,
  SUCCESS_LABORATORY_LIST,
  SUCCESS_REGISTER_LABORATORY,
  SUCCESS_UPDATE_LABORATORY,
} from "../../constants/laboratoryConstants";

export const laboratoryListReducer = (state = {}, action) => {
  const { payload, type } = action;

  switch (type) {
    case REQUEST_LABORATORY_LIST:
      return { loading: true };

    case SUCCESS_LABORATORY_LIST:
      return { loading: false, laboratories: payload };

    case FAIL_LABORATORY_LIST:
      return { loading: false, error: payload };

    case RESET_LABORATORY_LIST:
      return {};
    default:
      return state;
  }
};

export const laboratoryDetailsReducer = (state = {}, action) => {
  const { payload, type } = action;

  switch (type) {
    case REQUEST_LABORATORY_DETAIL:
      return { loading: true };

    case SUCCESS_LABORATORY_DETAIL:
      return { loading: false, laboratory: payload };

    case FAIL_LABORATORY_DETAIL:
      return { loading: false, error: payload };

    case RESET_LABORATORY_DETAIL:
      return {};

    default:
      return state;
  }
};

export const laboratoryUpdateReducer = (state = {}, action) => {
  const { payload, type } = action;

  switch (type) {
    case REQUEST_UPDATE_LABORATORY:
      return { loading: true };

    case SUCCESS_UPDATE_LABORATORY:
      return { loading: false, success: true };

    case FAIL_UPDATE_LABORATORY:
      return { loading: false, error: payload };

    case RESET_UPDATE_LABORATORY:
      return {};

    default:
      return state;
  }
};

export const laboratoryRegisterReducer = (state = {}, action) => {
  const { payload, type } = action;

  switch (type) {
    case REQUEST_REGISTER_LABORATORY:
      return { loading: true };

    case SUCCESS_REGISTER_LABORATORY:
      return { loading: false, success: true };

    case FAIL_REGISTER_LABORATORY:
      return { loading: false, error: payload };

    case RESET_REGISTER_LABORATORY:
      return {};

    default:
      return state;
  }
};

const laboratoryDeleteInitialState = {
  loading: false,
  success: false,
  error: null,
};

export const laboratoryDeleteReducer = (
  state = laboratoryDeleteInitialState,
  action
) => {
  const { payload, type } = action;

  switch (type) {
    case REQUEST_LABORATORY_DELETE:
      return { loading: true };

    case SUCCESS_LABORATORY_DELETE:
      return { loading: false, success: true };

    case FAIL_LABORATORY_DELETE:
      return { loading: false, error: payload };

    case RESET_LABORATORY_DELETE:
      return laboratoryDeleteInitialState;

    default:
      return state;
  }
};
