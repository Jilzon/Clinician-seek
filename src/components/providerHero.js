import React, { useState, useContext } from "react";
import ImageWithText from "./imageWithText";
import Badge from "./Badge/badge";
import Popup from "./Popup/popup";
import Appointmentcard from "./appointmentcard";
import { contextParams } from "./contextCreator/contextCreator";
const ProviderHero = ({ data }) => {
  const { openModal, setOpenModal } = useContext(contextParams);

  return (
    <>
      <div className="provider-hero relative">
        <div className="max-w-full overflow-hidden overflow-y-visible relative min-h-[720px]">
          <div className="container relative">
            <div className="absolute -top-[26%] -left-[55%] sm:-left-[12%] sm:-top-[10%]">
              <svg
                width="576"
                height="588"
                viewBox="0 0 576 588"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M420.595 581.226c191.437-52.435 210.083-478.672 28.118-564.5C275.72-64.868-29.705 174.366 2.881 351.63 32.88 514.817 301.772 613.772 420.595 581.226Z"
                  fill="#D1F5C7"
                />
              </svg>
            </div>
            <div className="pt-[150px] md:pt-[230px] relative">
              <div className="mx-auto md:container provider-hero-profile-pic-block">
                <ImageWithText
                  customClass="items-center"
                  imageSrc={
                    data?.profile_pic_url && data.profile_pic_url !== ""
                      ? data.profile_pic_url
                      : `../images/place-holder.png`
                  }
                  heading={
                    <div>
                      <div className="provider-hero-badge-block flex items-center gap-4 pb-[34px] pt-[45px] md:pt-0">
                        {/* {data?.provider?.tag == "featured" && (
                          <Badge status="featured" width="w-[130px]" />
                        )} */}
                        {/* {
                          <Badge
                            status={
                              data?.status == "active"
                                ? "available"
                                : data?.status
                            }
                            width="w-[130px]"
                          />
                        } */}
                        {data?.provider?.tag && (
                          <Badge status={data.provider.tag} width="w-[130px]" />
                        )}
                      </div>

                      <div className="provider-hero-location-block flex items-center gap-2 pb-2">
                        <img
                          src="/images/location-icon.svg"
                          alt="location icon"
                        />
                        <span className="text-[#828282] text-lg">
                          {data?.provider?.city && `${data.provider.city},`}
                          {data?.provider?.state && data.provider.state}
                          {/* New York, Florida */}
                        </span>
                      </div>

                      <h3 className="provider-name-block font-bold text-4xl leading-5 text-[#018893] pb-2 capitalize">
                        {data?.name && `${data.name},`}
                        {data?.provider?.qualification &&
                          data.provider.qualification}
                        {/* Brooke Aschidamini, MS, RD, CISSN */}
                      </h3>
                      <p className="provider-desig-block text-[22px] md:max-w-[500px] text-[#018893] capitalize">
                        {data?.provider?.designation &&
                          data.provider.designation}
                        {/* Nutrition Therapist */}
                      </p>
                      <div className="mt-[65px] provider-details-tab-block">
                        <ul className="flex items-center gap-14 pt-5 pb-6 border-t border-b border-[#BFECD0]">
                          <li className="text-[#018893] hover:text-[#82C29B] text-lg font-semibold uppercase cursor-pointer">
                            <a href="#provider-section-0"> About </a>
                          </li>
                          <li className="text-[#018893] hover:text-[#82C29B] text-lg font-semibold uppercase cursor-pointer">
                            <a href="#provider-section-1"> Payment </a>
                          </li>
                          <li className="text-[#018893] hover:text-[#82C29B] text-lg font-semibold uppercase cursor-pointer">
                            <a href="#provider-section-2"> Specialization </a>
                          </li>
                          <li className="text-[#018893] hover:text-[#82C29B] text-lg font-semibold uppercase cursor-pointer">
                            <a href="#provider-section-3"> Age </a>
                          </li>
                        </ul>
                      </div>
                      {/* appointment button(only for mobile) */}
                      <div className="provider-appointment-button-block">
                        <button
                          onClick={() => {
                            setOpenModal(true);
                          }}
                          className="mx-auto mt-[51px] font-bold text-base text-white bg-[#82C29B] rounded-[1.563rem] pt-[15px] pr-[15px] pb-[14px] pl-4"
                        >
                          Request An Appointment
                        </button>
                      </div>
                    </div>
                  }
                  gapSize="gap-16"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProviderHero;
