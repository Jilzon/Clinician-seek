import {
  featuredIcon,
  availableIcon,
  shortWaitingList,
  longWaitingList
} from "@/app/icons";
import Badge from "./Badge/badge";
import { useRouter } from "next/navigation";
export default function SimpleCard({ cardList }) {
  const router = useRouter();
  return (
    <div
      onClick={() =>
        cardList?.profile ? router.push(`providers/${cardList?.slug}`) : {}
      }
      className={`card min-w-[306px] min-h-[482px] bg-white border border-solid border-[#018893] rounded-lg px-6 pb-9 pt-5 ${
        cardList?.profile ? `cursor-pointer` : ``
      }`}
    >
      <div
        className={`flex ${
          cardList?.status ? `justify-between` : `justify-end`
        }`}
      >
        {/* {cardList?.status && (
          <Badge
            status={cardList.status}
          />
        )} */}
        <Badge status="featured" />
      </div>
      <div className=" text-center flex flex-col items-center h-full min-h-[329px] justify-around">
        {cardList?.image && cardList.image !== "" ? (
          <div
            className={`${
              cardList?.profile ? `` : `h-[109px] mt- flex items-center mb-5`
            }`}
          >
            <figure
              className={`${
                cardList?.profile
                  ? `p-1 mb-3.5 overflow-hidden w-[109px] h-[109px] inline-block rounded-full bg-white border border-solid border-[#018893] mt-[14px]`
                  : `max-w-[109px] mx-auto`
              }`}
            >
              <img
                src={cardList.image}
                alt=""
                className={`overflow-hidden w-full h-full object-cover ${
                  cardList?.profile ? `rounded-full` : ``
                }`}
              />
            </figure>
          </div>
        ) : (
          <figure
            className="p-1 mb-[13px] mt-[14px] overflow-hidden w-[109px] h-[109px] inline-block rounded-full bg-white border border-solid border-[#018893] mt-[14px]`
            "
          >
            <img
              src="images/place-holder.png"
              alt=""
              className="rounded-full"
            />
          </figure>
        )}
        <div>
          {cardList?.cardTitle && (
            <h3 className="font-bold text-xl leading-5 text-[#018893]">
              {cardList.cardTitle}
            </h3>
          )}
          {cardList?.cardSubTitle && (
            <h4 className="font-normal text-base leading-[1.4rem] text-[#018893] pt-[9px] pb-3">
              {cardList.cardSubTitle}
            </h4>
          )}
          {cardList?.cardDescription && (
            <p
              className={`font-normal text-base leading-[1.21rem] md:leading-[1.4rem] text-[#828282] ${
                cardList?.profile
                  ? `max-h-10 line-clamp-2`
                  : `max-h-[66px] line-clamp-3`
              }`}
            >
              {cardList.cardDescription}
            </p>
          )}
          <div className="border-t broder-t-solid border-t-[#EDEDED] mt-5">
            {cardList?.list && (
              <div>
                <span className="text-[#018893] font-normal text-base pt-3 block">
                  Specialty
                </span>

                <div className="badge-wrapper mt-4 flex flex-wrap gap-[1.063rem] justify-center max-h-[27px] overflow-hidden">
                  {cardList.list.map((item, i) => (
                    <div
                      key={i}
                      className="bg-[#D8E7EB] px-3 py-1 rounded-[0.875rem] font-medium text-[#018893] text-xs leading-[1.159rem]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {cardList?.isButtonActive && (
              <button
                onClick={() => router.push(`clinics/${cardList.slug}`)}
                className="mx-auto mt-[51px] font-bold text-base text-white bg-[#82C29B] rounded-[1.563rem] py-[9px] px-[15px]"
              >
                Meet Our Dietitians
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
