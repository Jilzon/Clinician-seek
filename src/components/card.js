import React, { useContext } from "react";
import "../styles/_card.scss";
import Badge from "./Badge/badge";
import { useRouter } from "next/navigation";
import { contextParams } from "./contextCreator/contextCreator";
export default function Card({ cardList }) {
  const router = useRouter();
  const { openModal, setOpenModal, clinicianName, setClinicianName } =
    useContext(contextParams);

  const openRequestForm = (name) => {
    setClinicianName(name);
    setOpenModal(true);
  };
  return (
    <div className="card md:min-w-[350px] md:min-h-[703px] max-h-[750px] bg-white border border-solid border-[#018893] rounded-lg pt-[27px] px-7 pb-[30px]">
      <div
        className="cursor-pointer inner-card md:min-h-[600px]"
        onClick={() => router.push(`/providers/${cardList?.slug}`)}
      >
        <div className="flex gap-[19px] text-[#018893] text-sm font-medium mb-[22px]">
          {cardList?.clinicianImage && cardList?.clinicianImage !== "" ? (
            <figure className="overflow-hidden p-1 w-[132px] h-[132px] rounded-full bg-white border border-solid border-[#018893] -mt-16">
              <img
                src={cardList.clinicianImage}
                className="overflow-hidden rounded-full w-full h-full object-cover"
              />
            </figure>
          ) : (
            <figure className="overflow-hidden w-[132px] h-[132px] rounded-full bg-white border border-solid border-[#018893] -mt-16">
              {/* <div className="overflow-hidden rounded-full m-1"> */}
              <img
                src="images/place-holder.png"
                className="overflow-hidden rounded-full w-full h-full object-cover"
              />
              {/* </div> */}
            </figure>
          )}
          {cardList?.status && <Badge status={cardList.status} />}
          {/* {cardList?.status && (
          <div className="bg-[#D8E7EB] h-9 rounded-[20px] py-[7px] pr-[18px] pl-[15px] flex items-center gap-1 mt-[27px]">
            {cardList.status == "Available"
              ? availableIcon
              : cardList.status == "Short Wait List"
              ? shortWaitingList
              : cardList.status == "Long Wait List"
              ? longWaitingList
              : ""}
            <span className="text-nowrap">{cardList.status}</span>
          </div>
        )} */}
        </div>

        {cardList?.cardTitle && (
          <h3 className="font-bold text-xl leading-5 text-[#018893] line-clamp-1">
            {cardList.cardTitle}
          </h3>
        )}
        {cardList?.cardSubTitle && (
          <h4 className="font-normal text-base leading-[1.4rem] text-[#828282] pt-[9px] pb-[25px] inline-flex">
            <span className="text-[#018893] font-normal text-base leading-[1.4rem] pr-[14px]">
              Designation:
            </span>
            <span className="max-h-11 line-clamp-2">
              {cardList.cardSubTitle}
            </span>
          </h4>
        )}

        {cardList?.cardDescription && (
          <div className="border-t border-solid border-t-[#EDEDED] font-normal text-base leading-[1.21rem] md:leading-[1.4rem] text-[#828282] py-[16px]">
            <p className="max-h-[133px] md:max-h-[90px] line-clamp-4">
              {cardList.cardDescription}
            </p>
          </div>
        )}
        {cardList?.list &&
          cardList.list.map((item, i) => (
            <div
              key={i}
              className="border-t border-solid border-t-[#EDEDED] py-4"
            >
              <span className="text-[#018893] font-normal text-base block">
                {item?.title && item.title}
              </span>
              {item?.type && item.type == "list" ? (
                <ul>
                  {item?.data?.slice(0, 2)?.map((item, i) => (
                    <li
                      key={i}
                      className="capitalize text-[#828282] font-normal text-base leading-[1.4rem] pt-1"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                item.type == "badge" && (
                  <div className="badge-wrapper mt-4 pb-[19px] border-b border-solid border-b-[#EDEDED]">
                    <div className="max-h-[27px] flex flex-wrap gap-[1.063rem] overflow-hidden">
                      {item?.data?.map((item, i) => (
                        <div
                          key={i}
                          className="capitalize bg-[#D8E7EB] px-3 py-1 rounded-[0.875rem] font-medium text-[#018893] text-xs leading-[1.159rem]"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          ))}
      </div>
      <button
        className="block mx-auto mt-[32px] font-bold text-base text-white bg-[#82C29B] rounded-[1.563rem] pt-[15px] pr-[15px] pb-[14px] pl-4"
        onClick={() => openRequestForm(cardList?.name)}
      >
        Request An Appointment
      </button>
    </div>
  );
}
