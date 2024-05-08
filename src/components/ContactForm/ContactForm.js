import React, { useEffect, useRef, useState } from "react";

const ContactForm = ({ setsuccessModal }) => {
  const initialFormRender = useRef(true);
  const [message, setMessage] = useState("");

  const handleformsubmitsuccess = () => {
    setMessage("Thank you! we will contact you soon.");
  };
  useEffect(() => {
    if (initialFormRender.current) {
      formsleads.render({
        wrapperId: "fl-form",
        notch: "UVpCZXJGRXNTRTNQZnozUVZaV1pFUT09",
        hideSuccessMessage: true,
        afterSubmit: handleformsubmitsuccess,
        changeInput: [
          {
            index: 4,
            to: "textarea",
            styles:
              "font-weight: 500;font-size: 16px;color:#828282; margin-bottom:20px; border-color:#018893;outline: 2px solid transparent;outline-offset: 2px;padding: 14px 10px 15px 30px;border-radius: 25px;resize:none"
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
            "background-color:rgb(130, 194, 155);width: 100%;line-height: 1.361rem;padding: 20px 40px;font-weight: 700;font-size: 1.125rem;border-radius: 33px; margin-top:50px;"
        }
      });
      initialFormRender.current = false;
    }
  }, []);

  return (
    <>
      <div className="contact-form lg:w-[475px] drop-shadow-2xl py-10 px-11 bg-white self-start">
        <div id="fl-form"></div>
        {message.length > 0 && (
          <h4 className="text-[#018893] font-semibold text-lg py-3 text-center ">
            {message}
          </h4>
        )}
      </div>
    </>
  );
};

export default ContactForm;
