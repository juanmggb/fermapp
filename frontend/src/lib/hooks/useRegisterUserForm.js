import { useState } from "react";
import axios from "../axiosConfig";
import _ from "lodash"; // Import lodash for debouncing
import toast from "react-hot-toast";

export const useEmailUserForm = () => {
  const [email, setEmail] = useState({
    loading: false,
    error: "",
    value: "",
  });

  const setEmailValue = (newEmail) => {
    // Validate email
    toast.dismiss();

    // Dismiss any existing toasts
    setEmail({
      loading: true,
      error: "",
      value: newEmail,
    });
  };

  const setEmailError = (errorMessage) => {
    setEmail((prevEmail) => ({
      loading: false,
      error: errorMessage,
      value: prevEmail.value,
    }));
  };

  return {
    email,
    setEmailValue,
    setEmailError,
  };
};

// Debounced function for username validation
export const validateEmail = _.debounce(
  async (emailValue, setEmailError, userId = "") => {
    // Replace this with your actual API call
    const errorMessage = await emailExistsApi(emailValue, userId);

    setEmailError(errorMessage);
  },
  500
); // 500ms debounce time

// API to verify whether email already exists
const emailExistsApi = async (emailValue, userId = "") => {
  try {
    const { data } = await axios.get(
      `username-validate/?email=${emailValue}&userId=${userId}`
    );

    if (data.message === "User with given email already exists")
      return "Email already exist";
  } catch (error) {
    return error.message;
  }
};
