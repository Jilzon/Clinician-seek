"use client";
import React,{useState,useEffect} from 'react'
import AboutOffer from '@/components/AboutPage/AboutOffer'
import OurVision from '@/components/AboutPage/OurVision'
import ImageWithText from '@/components/imageWithText'
import LogoList from '@/components/logoList'
import AboutSpotlight from '@/components/AboutPage/AboutSpotlight';
 
 const AboutUs = () => {
    const logos = [
        "/images/bluecross.png",
        "/images/tricare.png",
        "/images/mhn.png",
        "/images/aetna.png",
      ];

      const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    setOpenModal(openModal);
  }, [openModal]);
   return (
     <>
        <AboutSpotlight />
        <OurVision />
        <AboutOffer />
        <section className="bg-[#ECFAF1]">
            <div className="flex flex-col-reverse lg:flex-row pt-[90px]">
              <img
                src="/images/plant.png"
                className="mt-16 max-w-[326px] lg:max-w-none"
              />
              <div className="lg:flex max-w-[942px] mx-auto xl:gap-[123px] h-fit items-start lg:mb-[87px] image-text-responsive">
                <ImageWithText
                  heading={
                    <h3 className="font-medium text-[#2B3D67] text-[28px] md:text-4xl leading-[1.934rem] md:leading-[2.486rem] pt-0">
                      We’re trusted by top health systems
                    </h3>
                  }
                  content={
                    <p className="text-[#828282] lg:max-w-[352px] font-normal text-lg md:text-base pt-[19px]">
                      Our personalized and integrated approach inspires people
                      to commit to overcoming obstacles.
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
   )
 }
 
 export default AboutUs