import Image from "next/image";
export default function Welcome({
  imageSrc,
  heading,
  content,
  showButton,
  customClass,
  buttonProps
}) {
  return (
    <>
      <div
        className={`imageWithText container mx-auto flex gap-[108px] ${customClass}`}
      >
        <figure>
          <img src={imageSrc} alt="image" />
        </figure>
        <div>
          {heading && <h3 className="heading-primary">{heading}</h3>}
          {content && <p className="content-primary">{content}</p>}
          {showButton && buttonProps}
        </div>
      </div>
    </>
  );
}
