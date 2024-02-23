import { useState } from "react";

export const useMicroorganismListFilter = () => {
  const [filters, setFilters] = useState({
    filterBy: "name",
    search: "",
    sortBy: "name",
    setFilterBy: "",
    setSearch: "",
    setSortBy: "",
  });

  const setFilterBy = (newFilterBy) =>
    setFilters((prevFilters) => ({ ...prevFilters, filterBy: newFilterBy }));

  const setSearch = (newSearch) =>
    setFilters((prevFilters) => ({ ...prevFilters, search: newSearch }));

  const setSortBy = (newSortBy) =>
    setFilters((prevFilters) => ({ ...prevFilters, sortBy: newSortBy }));

  return {
    ...filters,
    setFilterBy,
    setSearch,
    setSortBy,
  };
};
