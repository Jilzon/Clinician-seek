"use client";
import LogoList from "@/components/logoList";
import ProviderRegister from "@/components/providerRegister";

const SignUp = () => {
  const logos = [
    "/images/bluecross.png",
    "/images/tricare.png",
    "/images/mhn.png",
    "/images/aetna.png"
  ];
  return (
    <>
      <section className="relative">
        <div className="max-w-full overflow-hidden">
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

            <div className="flex justify-center items-center min-h-screen relative z-2 mt-20 pt-[100px] pb-10 lg:pb-[100px]">
              <div className="w-full lg:px-4">
                <div className="lg:max-w-[90%] mx-auto">
                  <ProviderRegister />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Trusted partners logo section */}
      <section>
        <div className="mt-5 lg:my-20">
          <p className="text-[#2B3D67] font-medium text-xl text-center pb-6">We’re trusted by top health systems</p>
          <LogoList
              logos={logos}
              customClasses="grid grid-cols-2 md:grid-cols-4 justify-items-center items-center gap-7 lg:gap-14 px-7 lg:px-0 pt-3 lg:pt-6 lg:mb-[106px] mb-10 max-w-[700px] mx-auto"
            />
        </div>
      </section>
    </>
  );
};

export default SignUp;