"use client";
import "./_popup.scss";
import React, { useEffect, useState } from "react";
function Popup({ open, closePopup, customClass, children }) {
  const [openPopup, setOpenPoup] = useState(false);

  useEffect(() => {
    if (open) {
      setOpenPoup(true);
    } else {
      setOpenPoup(false);
    }
  }, [open]);
  const handleClose = () => {
    if (closePopup) {
      closePopup();
    }

  };
  
  return (
    <>
      {openPopup && (
        <div className={`popup-wrapper ${customClass}`}>
          <div className="bg-white pl-[31px] pr-[30px] pt-[33px] pb-[45px] max-w-[388px] mx-auto mt-[184px] md:mt-6">
            <div className="w-[100%] text-right mb-[30px]">
              <span
                className="text-[#018893] text-6xl leading-9 inline-block cursor-pointer"
                onClick={handleClose}
              >
                &times;
              </span>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
export default Popup;
