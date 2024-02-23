import {
  FAIL_LINEAR_REGRESSION,
  FAIL_OPT_PARMS,
  REQUEST_LINEAR_REGRESSION,
  REQUEST_OPT_PARMS,
  RESET_LINEAR_REGRESSION,
  RESET_OPT_PARMS,
  SUCCESS_LINEAR_REGRESSION,
  SUCCESS_OPT_PARMS,
} from "../../constants/optimizationConstants";

export const parameterOptimizationReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case REQUEST_OPT_PARMS:
      return { loading: true };

    case SUCCESS_OPT_PARMS:
      return {
        loading: false,
        simulatedData: {
          time: payload.time,
          x: payload.x,
          s: payload.s,
          p: payload.p,
        },
        best_params: payload.best_params,
        minError: payload.error,
        model_type: payload.model_type,
      };

    case FAIL_OPT_PARMS:
      return { loading: false, error: payload };

    case RESET_OPT_PARMS:
      return {};

    default:
      return state;
  }
};

export const linearRegressionReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case REQUEST_LINEAR_REGRESSION:
      return { loading: true };

    case SUCCESS_LINEAR_REGRESSION:
      return {
        loading: false,
        response_surface: payload.response_surface,
        model_params: payload.model_params,
        model_metrics: payload.model_metrics,
        data_split: payload.data_split,
        features: payload.features,
        preprocessing: payload.preprocessing,
      };

    case FAIL_LINEAR_REGRESSION:
      return { loading: false, error: payload };

    case RESET_LINEAR_REGRESSION:
      return {};

    default:
      return state;
  }
};
