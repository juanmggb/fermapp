import {
  EXPERIMENT_DELETE_FAIL,
  EXPERIMENT_DELETE_REQUEST,
  EXPERIMENT_DELETE_RESET,
  EXPERIMENT_DELETE_SUCCESS,
  EXPERIMENT_DETAILS_FAIL,
  EXPERIMENT_DETAILS_REQUEST,
  EXPERIMENT_DETAILS_RESET,
  EXPERIMENT_DETAILS_SUCCESS,
  EXPERIMENT_LIST_FAIL,
  EXPERIMENT_LIST_REQUEST,
  EXPERIMENT_LIST_RESET,
  EXPERIMENT_LIST_SUCCESS,
  EXPERIMENT_UPDATE_FAIL,
  EXPERIMENT_UPDATE_REQUEST,
  EXPERIMENT_UPDATE_RESET,
  EXPERIMENT_UPDATE_SUCCESS,
  REGISTER_EXPERIMENT_FAIL,
  REGISTER_EXPERIMENT_REQUEST,
  REGISTER_EXPERIMENT_RESET,
  REGISTER_EXPERIMENT_SUCCESS,
} from "../../constants/experimentConstants";

const experimentsInitialState = {
  loading: false,
  experiments: null,
  error: null,
};

export const experimentListReducer = (
  state = experimentsInitialState,
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case EXPERIMENT_LIST_REQUEST:
      return { loading: true };

    case EXPERIMENT_LIST_SUCCESS:
      return { loading: false, experiments: payload };

    case EXPERIMENT_LIST_FAIL:
      return { loading: false, error: payload };

    case EXPERIMENT_LIST_RESET:
      return experimentsInitialState;

    default:
      return state;
  }
};

const experimentinitialState = {
  loading: false,
  experiment: null,
  error: null,
};
export const experimentDetailsReducer = (
  state = experimentinitialState,
  action
) => {
  const { payload, type } = action;

  switch (type) {
    case EXPERIMENT_DETAILS_REQUEST:
      return { loading: true };

    case EXPERIMENT_DETAILS_SUCCESS:
      return { loading: false, experiment: payload };

    case EXPERIMENT_DETAILS_FAIL:
      return { loading: false, error: payload };

    case EXPERIMENT_DETAILS_RESET:
      return experimentinitialState;

    default:
      return state;
  }
};

// Define initial state
const registerInitialState = {
  loading: false,
  success: false,
  error: null,
};

export const experimentRegisterReducer = (
  state = registerInitialState,
  action
) => {
  const { type, payload } = action; // Destructure action object
  switch (type) {
    // When a register experiment request is made, set loading to true
    case REGISTER_EXPERIMENT_REQUEST:
      return { loading: true };

    //   On successful register experiment, set loading to false and success to true
    case REGISTER_EXPERIMENT_SUCCESS:
      return { loading: false, success: true };

    //   On failure, set loading to false and update error message
    case REGISTER_EXPERIMENT_FAIL:
      return { loading: false, error: payload };

    //   Reset the state to initial state
    case REGISTER_EXPERIMENT_RESET:
      return registerInitialState;

    //   Default case return the current state
    default:
      return state;
  }
};

const experimentDeleteInitialState = {
  loading: false,
  success: false,
  error: null,
};

export const experimentDeleteReducer = (
  state = experimentDeleteInitialState,
  action
) => {
  const { payload, type } = action;

  switch (type) {
    case EXPERIMENT_DELETE_REQUEST:
      return { loading: true };

    case EXPERIMENT_DELETE_SUCCESS:
      return { loading: false, success: true };

    case EXPERIMENT_DELETE_FAIL:
      return { loading: false, error: payload };

    case EXPERIMENT_DELETE_RESET:
      return experimentDeleteInitialState;

    default:
      return state;
  }
};

const experimentUpdateInitialState = {
  loading: false,
  success: false,
  error: null,
};

export const experimentUpdateReducer = (
  state = experimentUpdateInitialState,
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case EXPERIMENT_UPDATE_REQUEST:
      return { loading: true };

    case EXPERIMENT_UPDATE_SUCCESS:
      return { loading: false, success: true };

    case EXPERIMENT_UPDATE_FAIL:
      return { loading: false, error: payload };

    case EXPERIMENT_UPDATE_RESET:
      return experimentUpdateInitialState;

    default:
      return state;
  }
};
