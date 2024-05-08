import React, { useState, useEffect } from "react";
import { DropdownIconAnimated } from "@/app/icons";
const ProfileDetails = ({ details }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };
  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const toggleAccordion = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };
  return (
    <div className="profile-dtls-inner">
      {details.map((detail, index) => (
        <div
          key={index}
          id={`provider-section-${index}`}
          className={`profile-dtls-inner-sub pb-10 ${
            index !== details.length - 1 ? "border-b border-[#BFECD0]" : ""
          }`}
        >
          <div
            className="provider-mob-accordion flex justify-between items-center"
            onClick={() => isMobile && toggleAccordion(index)}
          >
            <h4 className="text-[#018893] font-medium text-xl pb-5 pt-8">
              {detail.title}
            </h4>
            {isMobile ? (
              <DropdownIconAnimated isOpen={openIndex === index} />
            ) : null}
          </div>
          {!isMobile || openIndex === index ? detail.content : null}
        </div>
      ))}
    </div>
  );
};
export default ProfileDetails;
