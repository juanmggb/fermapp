import {
  MICROORGANISM_DELETE_FAIL,
  MICROORGANISM_DELETE_REQUEST,
  MICROORGANISM_DELETE_RESET,
  MICROORGANISM_DELETE_SUCCESS,
  MICROORGANISM_DETAILS_FAIL,
  MICROORGANISM_DETAILS_REQUEST,
  MICROORGANISM_DETAILS_RESET,
  MICROORGANISM_DETAILS_SUCCESS,
  MICROORGANISM_LIST_FAIL,
  MICROORGANISM_LIST_REQUEST,
  MICROORGANISM_LIST_RESET,
  MICROORGANISM_LIST_SUCCESS,
  MICROORGANISM_REGISTER_FAIL,
  MICROORGANISM_REGISTER_REQUEST,
  MICROORGANISM_REGISTER_RESET,
  MICROORGANISM_REGISTER_SUCCESS,
  MICROORGANISM_UPDATE_FAIL,
  MICROORGANISM_UPDATE_REQUEST,
  MICROORGANISM_UPDATE_RESET,
  MICROORGANISM_UPDATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_RESET,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_RESET,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_RESET,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_REGISTER_FAIL,
  PRODUCT_REGISTER_REQUEST,
  PRODUCT_REGISTER_RESET,
  PRODUCT_REGISTER_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_SUCCESS,
  SUBSTRATE_DELETE_FAIL,
  SUBSTRATE_DELETE_REQUEST,
  SUBSTRATE_DELETE_RESET,
  SUBSTRATE_DELETE_SUCCESS,
  SUBSTRATE_DETAILS_FAIL,
  SUBSTRATE_DETAILS_REQUEST,
  SUBSTRATE_DETAILS_RESET,
  SUBSTRATE_DETAILS_SUCCESS,
  SUBSTRATE_LIST_FAIL,
  SUBSTRATE_LIST_REQUEST,
  SUBSTRATE_LIST_RESET,
  SUBSTRATE_LIST_SUCCESS,
  SUBSTRATE_REGISTER_FAIL,
  SUBSTRATE_REGISTER_REQUEST,
  SUBSTRATE_REGISTER_RESET,
  SUBSTRATE_REGISTER_SUCCESS,
  SUBSTRATE_UPDATE_FAIL,
  SUBSTRATE_UPDATE_REQUEST,
  SUBSTRATE_UPDATE_RESET,
  SUBSTRATE_UPDATE_SUCCESS,
} from "../../constants/elementConstants";

// Microorganism
const microorganismInitialState = {
  loading: false,
  microorganisms: null,
  error: null,
};

export const microorganismListReducer = (
  state = microorganismInitialState,
  action
) => {
  const { payload, type } = action;

  switch (type) {
    case MICROORGANISM_LIST_REQUEST:
      return { loading: true };

    case MICROORGANISM_LIST_SUCCESS:
      return { loading: false, microorganisms: payload };

    case MICROORGANISM_LIST_FAIL:
      return { loading: false, error: payload };

    case MICROORGANISM_LIST_RESET:
      return microorganismInitialState;

    default:
      return state;
  }
};

const microorganismDetailsInitialState = {
  loading: false,
  microorganisms: null,
  error: null,
};

export const microorganismDetailsReducer = (
  state = microorganismDetailsInitialState,
  action
) => {
  const { payload, type } = action;

  switch (type) {
    case MICROORGANISM_DETAILS_REQUEST:
      return { loading: true };

    case MICROORGANISM_DETAILS_SUCCESS:
      return { loading: false, microorganism: payload };

    case MICROORGANISM_DETAILS_FAIL:
      return { loading: false, error: payload };

    case MICROORGANISM_DETAILS_RESET:
      return microorganismDetailsInitialState;

    default:
      return state;
  }
};

const microorganismUpdateInitialState = {
  loading: false,
  success: false,
  error: null,
};

export const microorganismUpdateReducer = (
  state = microorganismUpdateInitialState,
  action
) => {
  const { payload, type } = action;

  switch (type) {
    case MICROORGANISM_UPDATE_REQUEST:
      return { loading: true };

    case MICROORGANISM_UPDATE_SUCCESS:
      return { loading: false, success: true };

    case MICROORGANISM_UPDATE_FAIL:
      return { loading: false, error: payload };

    case MICROORGANISM_UPDATE_RESET:
      return microorganismUpdateInitialState;

    default:
      return state;
  }
};

const microorganismRegisterInitialState = {
  loading: false,
  success: false,
  error: null,
};

export const microorganismRegisterReducer = (
  state = microorganismRegisterInitialState,
  action
) => {
  const { payload, type } = action;

  switch (type) {
    case MICROORGANISM_REGISTER_REQUEST:
      return { loading: true };

    case MICROORGANISM_REGISTER_SUCCESS:
      return { loading: false, success: true };

    case MICROORGANISM_REGISTER_FAIL:
      return { loading: false, error: payload };

    case MICROORGANISM_REGISTER_RESET:
      return microorganismRegisterInitialState;

    default:
      return state;
  }
};

const microorganismDeleteInitialState = {
  loading: false,
  success: false,
  error: null,
};

export const microorganismDeleteReducer = (
  state = microorganismDeleteInitialState,
  action
) => {
  const { payload, type } = action;

  switch (type) {
    case MICROORGANISM_DELETE_REQUEST:
      return { loading: true };

    case MICROORGANISM_DELETE_SUCCESS:
      return { loading: false, success: true };

    case MICROORGANISM_DELETE_FAIL:
      return { loading: false, error: payload };

    case MICROORGANISM_DELETE_RESET:
      return microorganismDeleteInitialState;

    default:
      return state;
  }
};

// Substrates

const substrateInitialState = {
  loading: false,
  substrates: null,
  error: null,
};

export const substrateListReducer = (state = substrateInitialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case SUBSTRATE_LIST_REQUEST:
      return { loading: true };

    case SUBSTRATE_LIST_SUCCESS:
      return { loading: false, substrates: payload };

    case SUBSTRATE_LIST_FAIL:
      return { loading: false, error: payload };

    case SUBSTRATE_LIST_RESET:
      return substrateInitialState;

    default:
      return state;
  }
};

const substrateDetailsInitialState = {
  loading: false,
  substrate: null,
  error: null,
};

export const substrateDetailsReducer = (
  state = substrateDetailsInitialState,
  action
) => {
  const { payload, type } = action;

  switch (type) {
    case SUBSTRATE_DETAILS_REQUEST:
      return { loading: true };

    case SUBSTRATE_DETAILS_SUCCESS:
      return { loading: false, substrate: payload };

    case SUBSTRATE_DETAILS_FAIL:
      return { loading: false, error: payload };

    case SUBSTRATE_DETAILS_RESET:
      return substrateDetailsInitialState;

    default:
      return state;
  }
};

const substrateUpdateInitialState = {
  loading: false,
  success: false,
  error: null,
};

export const substrateUpdateReducer = (
  state = substrateUpdateInitialState,
  action
) => {
  const { payload, type } = action;

  switch (type) {
    case SUBSTRATE_UPDATE_REQUEST:
      return { loading: true };

    case SUBSTRATE_UPDATE_SUCCESS:
      return { loading: false, success: true };

    case SUBSTRATE_UPDATE_FAIL:
      return { loading: false, error: payload };

    case SUBSTRATE_UPDATE_RESET:
      return substrateUpdateInitialState;

    default:
      return state;
  }
};

const substrateRegisterInitialState = {
  loading: false,
  success: false,
  error: null,
};

export const substrateRegisterReducer = (
  state = substrateRegisterInitialState,
  action
) => {
  const { payload, type } = action;

  switch (type) {
    case SUBSTRATE_REGISTER_REQUEST:
      return { loading: true };

    case SUBSTRATE_REGISTER_SUCCESS:
      return { loading: false, success: true };

    case SUBSTRATE_REGISTER_FAIL:
      return { loading: false, error: payload };

    case SUBSTRATE_REGISTER_RESET:
      return substrateRegisterInitialState;

    default:
      return state;
  }
};

const substrateDeleteInitialState = {
  loading: false,
  success: false,
  error: null,
};

export const substrateDeleteReducer = (
  state = substrateDeleteInitialState,
  action
) => {
  const { payload, type } = action;

  switch (type) {
    case SUBSTRATE_DELETE_REQUEST:
      return { loading: true };

    case SUBSTRATE_DELETE_SUCCESS:
      return { loading: false, success: true };

    case SUBSTRATE_DELETE_FAIL:
      return { loading: false, error: payload };

    case SUBSTRATE_DELETE_RESET:
      return substrateDeleteInitialState;

    default:
      return state;
  }
};

// Products
const productInitialState = {
  loading: false,
  products: null,
  error: null,
};

export const productListReducer = (state = productInitialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };

    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: payload };

    case PRODUCT_LIST_FAIL:
      return { loading: false, error: payload };

    case PRODUCT_LIST_RESET:
      return productInitialState;

    default:
      return state;
  }
};

const productDetailsInitialState = {
  loading: false,
  product: null,
  error: null,
};

export const productDetailsReducer = (
  state = productDetailsInitialState,
  action
) => {
  const { payload, type } = action;

  switch (type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };

    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: payload };

    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: payload };

    case PRODUCT_DETAILS_RESET:
      return productDetailsInitialState;

    default:
      return state;
  }
};

const productUpdateInitialState = {
  loading: false,
  success: false,
  error: null,
};

export const productUpdateReducer = (
  state = productUpdateInitialState,
  action
) => {
  const { payload, type } = action;
  switch (type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };

    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true };

    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: payload };

    case PRODUCT_UPDATE_RESET:
      return productUpdateInitialState;

    default:
      return state;
  }
};

const productRegisterInitialState = {
  loading: false,
  success: false,
  error: null,
};

export const productRegisterReducer = (
  state = productRegisterInitialState,
  action
) => {
  const { payload, type } = action;

  switch (type) {
    case PRODUCT_REGISTER_REQUEST:
      return { loading: true };

    case PRODUCT_REGISTER_SUCCESS:
      return { loading: false, success: true };

    case PRODUCT_REGISTER_FAIL:
      return { loading: false, error: payload };

    case PRODUCT_REGISTER_RESET:
      return productRegisterInitialState;

    default:
      return state;
  }
};

const productDeleteInitialState = {
  loading: false,
  success: false,
  error: null,
};

export const productDeleteReducer = (
  state = productDeleteInitialState,
  action
) => {
  const { payload, type } = action;

  switch (type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };

    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };

    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: payload };

    case PRODUCT_DELETE_RESET:
      return productDeleteInitialState;

    default:
      return state;
  }
};
