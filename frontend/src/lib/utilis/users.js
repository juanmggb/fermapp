export const isValidPassword = (password) => {
  const re = /^[a-zA-Z0-9]+$/;

  // This regular expression checks for a minimum of 8 characters with at least one letter, one number and one special character
  // const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  return re.test(password);
};
