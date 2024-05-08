import React from "react";

const AboutSpotlight = () => {
  return (
    <div className="bg-[#E0FEE1]">
      <div className="max-w-full overflow-hidden overflow-y-visible relative min-h-[720px]">
        <div className="container relative">
          <div className="absolute -top-[26%] -left-[55%] sm:-left-[25%] sm:-top-[10%]">
            <svg
              width="1065"
              height="737"
              viewBox="0 0 1065 737"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M552.755 596.299C848.152 515.389 876.923 -142.316 596.142 -274.753C329.205 -400.659 -142.081 -31.509 -91.7988 242.021C-45.5099 493.826 369.405 646.519 552.755 596.299Z"
                fill="#D1F5C7"
              />
              <path
                d="M782.779 -125.265C619.781 -344.682 63.5522 -155.487 44.409 120.907C26.2098 383.672 485.884 655.947 697.041 525.503C891.427 405.419 883.951 10.9242 782.779 -125.265Z"
                stroke="#82C29B"
              />
            </svg>
          </div>
          {/* spotlight content */}
          <div className="pt-[150px] md:pt-[230px] md:pb-[74px] relative lg:flex justify-between gap-10">
            <div className="lg:w-1/2">
              <h2 className="main-head text-[#018893] text-[52px] 2xl:text-[64px] font-bold leading-tight lg:leading-[91px]">
                About Us
              </h2>
              <p className="text-[#808082] pt-5 lg:pt-7 pb-12 lg:pb-[112px] font-medium text-lg lg:text-xl leading-7 max-w-[528px]">
                Our dedicated clinicians are specifically trained and prepared
                to meet your needs.
              </p>
              <p className="pb-[30px] text-[#2B3D67] font-medium text-[26px] 2xl:text-[32px] leading-tight lg:leading-9 max-w-[528px]">
                Take the next step to learn more about our qualified team of
                mental health experts!
              </p>
              <p className="text-[#808082] text-lg lg:text-xl font-medium leading-7">
                We honor the mind, body, and heart in each individual.
              </p>
            </div>
            <div className="lg:w-1/2 flex flex-col items-end my-10 lg:my-0 about-spotlight-img-block"></div>
          </div>
          {/* spotlight content ends*/}
        </div>
      </div>
    </div>
  );
};

export default AboutSpotlight;
