"use client";
import React, { useEffect, useState, useRef, useContext } from "react";
import { contextParams } from "./contextCreator/contextCreator";
import Drawer from "./Drawer";
import Popup from "./Popup/popup";
import { menuIcon } from "@/app/icons";
import "../styles/_header.scss";
import Appointmentcard from "./appointmentcard";
const SiteHeader = () => {
  const { openModal, setOpenModal, openSuccessModal, setOpenSuccessModal } =
    useContext(contextParams);
  const [open, setOpen] = useState(false);
  // const childRef = useRef();
  useEffect(() => {}, []);
  const handlemenuClick = () => {
    setOpen(!open);
  };
  const closePopup = () => {
    setOpenModal(false);
  };
  const [successModal, setsuccessModal] = useState(false);
  const handleformsubmitsuccess = () => {
    closePopup();
    setOpenSuccessModal(true);
  };

  return (
    <>
      <Popup
        open={openSuccessModal}
        closePopup={() => setOpenSuccessModal(false)}
      >
        <h4 className="text-[#018893] font-semibold text-[28px] pb-3 text-center ">
          Thank You!
        </h4>
        <p className="text-[#828282] text-base text-center pb-1">
          You’re booked <span className="text-[#018893]">IN</span> for your
          appointment.
        </p>
        <p className="text-[#828282] text-center mb-20">
          A confirmation has been sent to your email address.{" "}
        </p>
        <div className="text-center pb-8">
          <a
            href="/"
            className="w-auto h-12 rounded-3xl py-4 px-6 text-white font-medium bg-[#82C29B]"
          >
            Continue to Homepage
          </a>
        </div>
      </Popup>
      <Popup open={openModal} closePopup={closePopup}>
        <h3 className="text-[#018893] font-normal text-[28px] pb-[47px]">
          Request an Appointment
        </h3>
        <Appointmentcard
          customClass="appointment-card-modal"
          closePopup={closePopup}
        />
      </Popup>
      <Drawer open={open} setOpen={setOpen}>
        <div className="text-right header-drawer">
          <div className="border-b border-solid border-b-[#9CD2E0]">
            <span className="text-[#018893] text-lg pb-[6px] pt-[63px] block">
              MENU
            </span>
          </div>
          <div className="mt-[30px]">
            <ul>
              <li>
                <a href="/about-us">About Us</a>
              </li>
              <li>
                <a href="">Order BW Scale</a>
              </li>
              <li>
                <a href="">FAQ</a>
              </li>
              <li>
                <a href="/contact-us">Contact Us</a>
              </li>
            </ul>
          </div>
          <button
            onClick={() => {
              setOpen(false);
              setOpenModal(true);
            }}
            className="mx-auto mt-[51px] font-bold text-lg leading-[1.361rem] text-white bg-[#82C29B] rounded-[1.563rem] pt-[17px] px-[27px] pb-4"
          >
            Request An Appointment
          </button>
        </div>
      </Drawer>
      <header className="py-[19px] md:py-10 absolute top-0 left-0 right-0 z-50">
        <div className="container flex items-center justify-between gap-10">
          <div>
            <a href="/" className="cursor-pointer">
              <img
                src="/images/clinician-seek-logo.svg"
                alt=""
                className="max-w-[225px] md:max-w-none"
              />
            </a>
          </div>
          <div className="lg:flex gap-7 items-center hidden flex-wrap">
            <nav>
              <ul className="md:flex gap-7 header-ul">
                <li>
                  <a href="/about-us">About Us</a>
                </li>
                <li>
                  <a href="">Order Blind Weight Scale</a>
                </li>
                <li>
                  <a href="">FAQ</a>
                </li>
                <li>
                  <a href="/contact-us">Contact Us</a>
                </li>
              </ul>
            </nav>
            <div className="ml-5 lg:m-0">
              <button className="btn" onClick={() => setOpenModal(true)}>
                Book now
              </button>
            </div>
          </div>
          <div
            className="nav-icon lg:hidden cursor-pointer"
            onClick={handlemenuClick}
          >
            {menuIcon}
          </div>
        </div>
      </header>
    </>
  );
};

export default SiteHeader;
