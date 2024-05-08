"use client";
import React, { createContext, useState } from "react";
export const contextParams = createContext(null);
function ContextCreator({ children }) {
  const [token, setToken] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [clinicianName, setClinicianName] = useState(null);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  return (
    <contextParams.Provider
      value={{
        token,
        setToken,
        openModal,
        setOpenModal,
        clinicianName,
        setClinicianName,
        openSuccessModal,
        setOpenSuccessModal
      }}
    >
      {children}
    </contextParams.Provider>
  );
}
export default ContextCreator;
