export const getCurrentFormattedDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const getDisplayNameById = (id, array, field) => {
  const numericId = Number(id);
  const foundObj = array.find((item) => Number(item.id) === numericId);
  if (foundObj && foundObj[field]) {
    return foundObj[field];
  }
  return "";
};

export const formatDateString = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
};
