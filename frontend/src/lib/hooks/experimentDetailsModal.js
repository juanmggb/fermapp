import { useState } from "react";

export const useExperimentDetailsModal = (experiments) => {
  const [experimentDetailsModal, setExperimentDetailsModal] = useState({});
  const [showExperimentDetailsModal, setShowExperimentDetailsModal] =
    useState(false);

  const handleShowExperimentDetailsModal = (experimentId) => {
    const experimentDetailsModalSelected = {
      ...experiments.find((exp) => exp.id === experimentId),
    };

    setExperimentDetailsModal(experimentDetailsModalSelected);
    setShowExperimentDetailsModal(true);
  };

  const handleHideExperimentDetailsModal = () =>
    setShowExperimentDetailsModal(false);

  return {
    experimentDetailsModal,
    showExperimentDetailsModal,
    handleShowExperimentDetailsModal,
    handleHideExperimentDetailsModal,
  };
};
