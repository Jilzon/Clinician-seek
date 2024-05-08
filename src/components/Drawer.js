"use client";
import "../styles/_drawer.scss";
import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle
} from "react";
function Drawer({ open, setOpen, customClass, fullWidth, children }) {
  const reference = useRef();
  // useImperativeHandle(ref, () => ({
  //   getAlert() {
  //     reference.current.style.width = 0;
  //   }
  // }));
  useEffect(() => {
    if (open) {
      if (fullWidth) {
        reference.current.classList.add("active-full-width");
      } else {
        reference.current.classList.add("active");
      }
    } else {
      if (fullWidth) {
        reference.current.classList.remove("active-full-width");
      } else {
        reference.current.classList.remove("active");
      }
    }
  }, [open]);
  const closeDrawer = () => {
    if (setOpen) {
      setOpen(false);
    }
    // reference.current.style.width = 0;
  };
  return (
    <div ref={reference} className={`mobile-nav ${customClass}`}>
      <div
        className={`absolute right-0 bg-white px-7 pb-14 ${
          !fullWidth ? `md:w-fit` : ``
        } w-[100%]`}
      >
        <div className="w-[100%] text-right pt-2">
          <span
            className="text-[#018893] text-6xl leading-9 p-0 inline-block cursor-pointer"
            onClick={closeDrawer}
          >
            &times;
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}
export default Drawer;
