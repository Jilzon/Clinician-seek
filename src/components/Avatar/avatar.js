import "./_avatar.scss";
export default function Avatar({ image, name }) {
  return (
    <>
      {image && name ? (
        <div className="avatar flex gap-1 items-center cursor-pointer">
          <span className="text-[#018893]">{name}</span>
          <div className=" overflow-hidden rounded-full p-2 bg-[#82C29B]">
            {image}
          </div>
        </div>
      ) : (
        image
      )}
    </>
  );
}
