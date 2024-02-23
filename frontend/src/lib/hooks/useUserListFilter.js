import { useState } from "react";
import { getCurrentFormattedDate } from "../utilis/general";

export const useUserListFilter = () => {
  const [filters, setFilters] = useState({
    filterBy: "name",
    search: "",
    sortBy: "",
    initialDate: "",
    finalDate: getCurrentFormattedDate(),
  });

  const setFilterBy = (newFilterBy) =>
    setFilters((prevFilters) => ({ ...prevFilters, filterBy: newFilterBy }));

  const setSearch = (newSearch) =>
    setFilters((prevFilters) => ({ ...prevFilters, search: newSearch }));

  const setSortBy = (newSortBy) =>
    setFilters((prevFilters) => ({ ...prevFilters, sortBy: newSortBy }));

  const setDate = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [e.target.name]: e.target.value,
    }));
  };

  return {
    ...filters,
    setFilterBy,
    setSearch,
    setSortBy,
    setDate,
  };
};
