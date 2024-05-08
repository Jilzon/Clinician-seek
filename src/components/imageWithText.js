import Image from "next/image";
export default function ImageWithText({
  imageSrc,
  heading,
  content,
  showButton,
  customClass,
  buttonProps,
  gapSize = "gap-[92px]"
}) {
  return (
    <div
      className={`image-with-text container lg:flex ${gapSize} text-center md:text-left px-11 md:p-0 ${customClass}`}
    >
      {imageSrc && (
        <figure>
          <img src={imageSrc} alt="image" className=" w-full mx-auto" />
        </figure>
      )}
      <div className=" text-container text-center lg:text-left">
        {heading && heading}
        {content && content}
        {showButton && buttonProps}
      </div>
    </div>
  );
}
