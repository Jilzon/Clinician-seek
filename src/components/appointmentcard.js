import React, { useEffect, useRef, useState, useContext } from "react";
import Popup from "./Popup/popup";
import { contextParams } from "./contextCreator/contextCreator";
import axios from "@/helpers/axios";
const Appointmentcard = ({ customClass, closePopup }) => {
  const [savedLocations, setSavedLocations] = useState([]);
  const [loading, setloading] = useState(true);
  const initialFormRender = useRef(true);
  const {
    openModal,
    setOpenModal,
    clinicianName,
    setClinicianName,
    openSuccessModal,
    setOpenSuccessModal
  } = useContext(contextParams);

  const handleformsubmitsuccess = () => {
    setOpenSuccessModal(true);
    if (closePopup) {
      closePopup();
    }
  };
  useEffect(() => {
    axios
      .get(`provider/get-saved-locations`)
      .then(function (response) {
        setSavedLocations(
          response?.data?.data?.state?.map((item) => item.name)
        );
        setloading(false);
      })
      .catch(function (error) {
        setloading(false);
        console.log(error);
      });
  }, []);
  useEffect(() => {
    if (initialFormRender.current && !loading) {
      formsleads.render({
        wrapperId: "fl-form",
        notch: "N2k2aFVhZGd1REhIRXdvTzZJc1pCZz09",
        hideSuccessMessage: true,
        afterSubmit: handleformsubmitsuccess,
        customOptions: [
          {
            index: 4,
            options: savedLocations
          }
        ],
        hiddenFields: [
          {
            index: 5,
            value: (clinicianName && clinicianName) || "Not Available"
          }
        ],
        customStyle: {
          formTitle: "display:none;",
          form: "",
          fieldWrapper: "margin-bottom:0;",
          input:
            "font-weight: 500;font-size: 16px;color:#828282; margin-bottom:20px; border-color:#018893;outline: 2px solid transparent;outline-offset: 2px;padding: 14px 10px 15px 30px;border-radius: 25px;",
          select:
            "height:auto;font-weight: 500;font-size: 16px;color:#828282;border-color:#018893;outline: 2px solid transparent;outline-offset: 2px;padding: 14px 10px 15px 30px;border-radius: 25px;",
          label: "display:none;",
          recaptchaWrapper: "",
          buttonWrapper: "",
          aboveSubmitText: "text-align: center;font-size:13px;color:#393939;",
          button:
            "background-color:rgb(130, 194, 155);width: 100%;line-height: 1.361rem;padding: 20px 40px;font-weight: 700;font-size: 1.125rem;border-radius: 33px; margin-top:50px;transition: background-color 0.3s ease;",
          dropdown: {
            wrapper: "",
            select:
              "font-family:'poppins';padding:10px;width: 100%;height:100%;font-weight: 500;font-size: 14px;color:black;",
            list: "",
            firstOption:
              "font-family:'poppins';font-weight:400;margin:10px;background:green;color:white;padding:5px;",
            option:
              "font-family:'poppins';font-family:'poppins';color:black;font-weight:400;font-size:14px;padding: 5px 15px;",
            optionHover: "background-color:#ECF8D4",
            placeholder:
              "font-family:'poppins';font-style: normal;font-weight: 500;font-size: 16px;color: gray;border-radius:0;"
          }
        }
      });
      initialFormRender.current = false;
    }
  }, [loading]);
  return (
    <>
      <div
        className={`appointment-card min-w-[350px] max-w-[350px] drop-shadow-2xl py-10 px-11 bg-white self-start ${
          customClass ? customClass : ``
        }`}
      >
        <h3 className="text-[#018893] font-normal text-[20px] pb-[39px]">
          Request an Appointment
        </h3>

        <div id="fl-form"></div>
      </div>
    </>
  );
};

export default Appointmentcard;
