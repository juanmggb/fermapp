import { useState } from "react";

export const useSubstrateDetailsModal = (substrates) => {
  const [substrateDetailsModal, setSubstrateDetailsModal] = useState({});
  const [showSubstrateDetailsModal, setShowSubstrateDetailsModal] =
    useState(false);

  const handleShowSubstrateDetailsModal = (substrateId) => {
    const substrateDetailsModalSelected = substrates.find(
      (sub) => sub.id === substrateId
    );

    setSubstrateDetailsModal(substrateDetailsModalSelected);
    setShowSubstrateDetailsModal(true);
  };

  const handleHideSubstrateDetailsModal = () =>
    setShowSubstrateDetailsModal(false);

  return {
    substrateDetailsModal,
    showSubstrateDetailsModal,
    handleShowSubstrateDetailsModal,
    handleHideSubstrateDetailsModal,
  };
};
