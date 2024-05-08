import {
  featuredIcon,
  availableIcon,
  shortWaitingList,
  longWaitingList
} from "@/app/icons";
function Badge({ status, featured, width, margin }) {
  return (
    <div
      className={`bg-[#D8E7EB] h-9 rounded-[20px] py-[7px] pr-[18px] pl-[15px] flex justify-center items-center gap-1  text-[#018893] font-medium ${width} ${
        margin ? margin : ""
      }`}
    >
      {status == "available"
        ? availableIcon
        : status == "Short Wait List"
        ? shortWaitingList
        : status == "Virtual Clinic"
        ? shortWaitingList
        : status == "Long Wait List"
        ? longWaitingList
        : status == "featured"
        ? featuredIcon
        : ""}
      {status == "featured" ? (
        <span className="text-nowrap">Featured</span>
      ) : (
        <span className="text-nowrap capitalize">{status}</span>
      )}
    </div>
  );
}
export default Badge;
