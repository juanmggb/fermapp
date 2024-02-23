import {
  ACCOUNT_DETAIL_FAIL,
  ACCOUNT_DETAIL_REQUEST,
  ACCOUNT_DETAIL_RESET,
  ACCOUNT_DETAIL_SUCCESS,
  ACCOUNT_UPDATE_FAIL,
  ACCOUNT_UPDATE_REQUEST,
  ACCOUNT_UPDATE_RESET,
  ACCOUNT_UPDATE_SUCCESS,
} from "../../constants/accountContants";

const accountDetailInitialState = {
  account: null,
  loading: false,
  error: null,
};

export const accountDetailReducer = (
  state = accountDetailInitialState,
  action
) => {
  const { payload, type } = action;

  switch (type) {
    case ACCOUNT_DETAIL_REQUEST:
      return { loading: true };

    case ACCOUNT_DETAIL_SUCCESS:
      return { loading: false, account: payload };

    case ACCOUNT_DETAIL_FAIL:
      return { loading: false, error: payload };

    case ACCOUNT_DETAIL_RESET:
      return accountDetailInitialState;

    default:
      return state;
  }
};

const accountUpdateInitialState = {
  loading: false,
  success: false,
  error: null,
};

export const accountUpdateReducer = (
  state = accountUpdateInitialState,
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case ACCOUNT_UPDATE_REQUEST:
      return { loading: true };

    case ACCOUNT_UPDATE_SUCCESS:
      return { loading: false, success: true };

    case ACCOUNT_UPDATE_FAIL:
      return { loading: false, error: payload };

    case ACCOUNT_UPDATE_RESET:
      return accountUpdateInitialState;

    default:
      return state;
  }
};
