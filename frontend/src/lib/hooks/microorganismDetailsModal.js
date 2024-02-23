import { useState } from "react";

export const useMicroorganismDetailsModal = (microorganisms) => {
  const [microorganismDetailsModal, setMicroorganismDetailsModal] = useState(
    {}
  );
  const [showMicroorganismDetailsModal, setShowMicroorganismDetailsModal] =
    useState(false);

  const handleShowMicroorganismDetailsModal = (microorganismId) => {
    const microorganismDetailsModalSelected = microorganisms.find(
      (exp) => exp.id === microorganismId
    );

    setMicroorganismDetailsModal(microorganismDetailsModalSelected);
    setShowMicroorganismDetailsModal(true);
  };

  const handleHideMicroorganismDetailsModal = () =>
    setShowMicroorganismDetailsModal(false);

  return {
    microorganismDetailsModal,
    showMicroorganismDetailsModal,
    handleShowMicroorganismDetailsModal,
    handleHideMicroorganismDetailsModal,
  };
};
