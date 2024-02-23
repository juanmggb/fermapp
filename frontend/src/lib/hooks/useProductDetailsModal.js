import { useState } from "react";

export const useProductDetailsModal = (products) => {
  const [productDetailsModal, setProductDetailsModal] = useState({});
  const [showProductDetailsModal, setShowProductDetailsModal] = useState(false);

  const handleShowProductDetailsModal = (productId) => {
    const productDetailsModalSelected = products.find(
      (prod) => prod.id === productId
    );

    setProductDetailsModal(productDetailsModalSelected);
    setShowProductDetailsModal(true);
  };

  const handleHideProductDetailsModal = () => setShowProductDetailsModal(false);

  return {
    productDetailsModal,
    showProductDetailsModal,
    handleShowProductDetailsModal,
    handleHideProductDetailsModal,
  };
};
