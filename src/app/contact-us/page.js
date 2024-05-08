"use client";
import ContactForm from "@/components/ContactForm/ContactForm";
import ImageWithText from "@/components/imageWithText";
import LogoList from "@/components/logoList";
const contactUs = () => {
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
          <div className="relative">
            <div className="absolute -top-[10%] -left-[12%]">
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

            <div className="container lg:flex relative z-2 pt-[200px] pb-[100px] gap-x-[93px]">
              <div className="lg:w-1/2 flex flex-col justify-between">
                <div>
                  <h1 className="main-head text-[#018893] font-bold text-[52px] 2xl:text-[64px] leading-[5.688rem]">
                    Contact Us
                  </h1>
                  <p className="text-[#018893] font-normal text-xl leading-6 pt-[22px] max-w-[440px]">
                    We respect the privacy of our patients and will not share
                    your contact information.
                  </p>
                </div>

                <p className="big-para text-[#2B3D67] font-medium text-xl xl:text-2xl leading-6 pt-7 md:pt-0 md:leading-9 max-w-[522px]">
                  If this is a medical emergency, dial 911 or go to your nearest
                  emergency room.
                </p>
              </div>
              <div className="lg:w-1/2 mt-10 lg:mt-0">
                <ContactForm />
              </div>
            </div>
          </div>
          <div className="container mb-10 md:mb-[182px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3317.9431375334752!2d-118.29341252449771!3d33.7362864732776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dd362f0848c25f%3A0x1ec9e0bc39b5fb80!2sFirst%20Step%20Counseling%20-%20Therapist%20in%20San%20Pedro!5e0!3m2!1sen!2sin!4v1712834688461!5m2!1sen!2sin"
              style={{ border: 0, width: "100%", minHeight: 403 }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
      <section className="bg-[#ECFAF1]">
        <div className="flex flex-col-reverse lg:flex-row pt-[90px]">
          <img
            src="/images/plant.png"
            className="mt-16 max-w-[326px] lg:max-w-none"
          />
          <div className="lg:flex max-w-[942px] mx-auto xl:gap-[123px] h-fit items-start lg:mb-[87px] image-text-responsive">
            <ImageWithText
              // imageSrc="/images/plant.png"
              heading={
                <h3 className="font-medium text-[#2B3D67] text-[28px] md:text-4xl leading-[1.934rem] md:leading-[2.486rem] pt-0">
                  We’re trusted by top health systems
                </h3>
              }
              content={
                <p className="text-[#828282] lg:max-w-[352px] font-normal text-lg md:text-base pt-[19px]">
                  Our personalized and integrated approach inspires people to
                  commit to overcoming obstacles.
                </p>
              }
              showButton
              customClass="justify-start gap-[29px] partners"
              buttonProps={
                <button className="button-primary mt-[52px] hidden lg:block">
                  Partner with Us
                </button>
              }
            />
            <LogoList
              logos={logos}
              customClasses="grid grid-cols-2 gap-x-[76px] gap-y-7 lg:gap-x-[91px] lg:gap-y-[53px] xl:min-w-[445px] px-7 lg:px-0 pt-[59px] lg:pt-6"
            />
            <button className="button-primary mt-[52px] lg:hidden mb-[45px] block mx-auto">
              Partner with Us
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
export default contactUs;
