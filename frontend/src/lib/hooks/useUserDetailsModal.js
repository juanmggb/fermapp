import { useState } from "react";

export const useUserDetailsModal = (users) => {
  const [userDetailsModal, setUserDetailsModal] = useState({});
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);

  const handleShowUserDetailsModal = (userId) => {
    const userDetailsModalSelected = users.find((user) => user.id === userId);

    setUserDetailsModal(userDetailsModalSelected);
    setShowUserDetailsModal(true);
  };

  const handleHideUserDetailsModal = () => setShowUserDetailsModal(false);

  return {
    userDetailsModal,
    showUserDetailsModal,
    handleShowUserDetailsModal,
    handleHideUserDetailsModal,
  };
};
