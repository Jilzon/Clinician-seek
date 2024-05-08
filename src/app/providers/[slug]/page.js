"use client";
import React, { useState, useEffect, useContext } from "react";
import ProviderSpotlight from "@/components/home_spotlight/providerSpotlight";
import ImageWithText from "@/components/imageWithText";
import LogoList from "@/components/logoList";
import Image from "next/image";
import Accordion from "@/components/Accordion/accordion";
import Popup from "@/components/Popup/popup";
import Appointmentcard from "@/components/appointmentcard";
import ProviderHero from "@/components/providerHero";
import ProfileDetails from "@/components/profileDetails";
import Loader from "@/components/Loader/Loader";
import axios from "@/helpers/axios";
import { contextParams } from "@/components/contextCreator/contextCreator";
const ProviderProfile = ({ params }) => {
  const logos = [
    "/images/bluecross.png",
    "/images/tricare.png",
    "/images/mhn.png",
    "/images/aetna.png"
  ];
  const { openModal, setOpenModal, clinicianName, setClinicianName } =
    useContext(contextParams);
  const [open, setOpen] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [loading, setloading] = useState(false);
  const [successModal, setsuccessModal] = useState(false);
  const [details, setDetails] = useState([]);
  const toggle = (index) => {
    if (open === index) {
      return setOpen(null);
    }
    setOpen(index);
  };

  const accordionData = [
    {
      title: "How soon can I make an appointment?",
      content:
        "Lorem ipsum dolor sit amet consectetur. Enim facilisis eu diam mus pellentesque elit tellus. Interdum a aliquam adipiscing neque ut. Suspendisse sed quam neque neque id laoreet."
    },
    {
      title: "How soon can I make an appointment?",
      content:
        "Lorem ipsum dolor sit amet consectetur. Enim facilisis eu diam mus pellentesque elit tellus. Interdum a aliquam adipiscing neque ut. Suspendisse sed quam neque neque id laoreet."
    },
    {
      title: "How soon can I make an appointment?",
      content:
        "Lorem ipsum dolor sit amet consectetur. Enim facilisis eu diam mus pellentesque elit tellus. Interdum a aliquam adipiscing neque ut. Suspendisse sed quam neque neque id laoreet."
    },
    {
      title: "How soon can I make an appointment?",
      content:
        "Lorem ipsum dolor sit amet consectetur. Enim facilisis eu diam mus pellentesque elit tellus. Interdum a aliquam adipiscing neque ut. Suspendisse sed quam neque neque id laoreet."
    },
    {
      title: "How soon can I make an appointment?",
      content:
        "Lorem ipsum dolor sit amet consectetur. Enim facilisis eu diam mus pellentesque elit tellus. Interdum a aliquam adipiscing neque ut. Suspendisse sed quam neque neque id laoreet."
    }
  ];

  // const details = [
  //   {
  //     title: "About Brooke",
  //     content: (
  //       <p className="text-[#828282] text-base">
  //         Eating disorders and body image are deep and personal topics. I
  //         provide a safe space so we can talk about these concerns without
  //         judgement. As a food and body-image healer, I would be honored to walk
  //         alongside you on your journey of recovery...
  //       </p>
  //     )
  //   },
  //   {
  //     title: "Accepted Payment",
  //     content: (
  //       <div className="flex items-center gap-6 provider-payment-button-group">
  //         <span className="text-[#018893] text-lg flex items-center font-medium bg-[#D8E7EB] h-9 rounded-[20px] py-[7px] px-[15px]">
  //           Self Pay (Cash)
  //         </span>
  //         <span className="text-[#018893] text-lg flex items-center font-medium bg-[#D8E7EB] h-9 rounded-[20px] py-[7px] px-[15px]">
  //           PRO
  //         </span>
  //       </div>
  //     )
  //   },
  //   {
  //     title: "Specialization",
  //     content: (
  //       <ul className="">
  //         <li className="text-[#828282] text-base flex items-center gap-2">
  //           <span className="text-[#018893] text-2xl">&#8226;</span>{" "}
  //           Binge-eating disorder
  //         </li>
  //         <li className="text-[#828282] text-base flex items-center gap-2">
  //           <span className="text-[#018893] text-2xl">&#8226;</span>{" "}
  //           Avoidant/Restrictive Food Intake Disorder (ARFID)
  //         </li>
  //         <li className="text-[#828282] text-base flex items-center gap-2">
  //           <span className="text-[#018893] text-2xl">&#8226;</span>{" "}
  //           Binge-eating disorder
  //         </li>
  //         <li className="text-[#828282] text-base flex items-center gap-2">
  //           <span className="text-[#018893] text-2xl">&#8226;</span>{" "}
  //           Avoidant/Restrictive Food Intake Disorder (ARFID)
  //         </li>
  //       </ul>
  //     )
  //   },
  //   {
  //     title: "Age",
  //     content: (
  //       <ul>
  //         <li className="text-[#828282] text-base flex items-center gap-2">
  //           <span className="text-[#018893] text-2xl">&#8226;</span>Adult
  //         </li>
  //         <li className="text-[#828282] text-base flex items-center gap-2">
  //           <span className="text-[#018893] text-2xl">&#8226;</span>Teenage
  //         </li>
  //       </ul>
  //     )
  //   }
  // ];

  useEffect(() => {
    setloading(true);
    if (params.slug) {
      axios
        .get(`provider/get-provider-by-slug/${params.slug}`)
        .then(function (response) {
          setClinicianName(response?.data?.user?.name);
          setProfileData(response?.data?.user);
          setDetails([
            {
              title: `About ${response?.data?.user?.name}`,
              content: (
                <p className="text-[#828282] text-base">
                  {response?.data?.user?.provider?.bio}
                </p>
              )
            },
            {
              title: "Accepted Payment",
              content: (
                <div className="flex items-center gap-6 provider-payment-button-group">
                  {response?.data?.user?.provider?.acceptable_pay_modes.map(
                    (item, i) => (
                      <span
                        key={i}
                        className="text-[#018893] text-lg flex items-center font-medium bg-[#D8E7EB] h-9 rounded-[20px] py-[7px] px-[15px]"
                      >
                        {item.name}
                      </span>
                    )
                  )}
                </div>
              )
            },
            {
              title: "Specialization",
              content: (
                <ul className="">
                  {response?.data?.user?.provider?.specialization.map(
                    (item, i) => (
                      <li
                        key={i}
                        className="text-[#828282] text-base flex items-center gap-2"
                      >
                        <span className="text-[#018893] text-2xl">&#8226;</span>{" "}
                        {item.name}
                      </li>
                    )
                  )}
                </ul>
              )
            },
            {
              title: "Age",
              content: (
                <ul>
                  {response?.data?.user?.provider?.age_category.map(
                    (item, i) => (
                      <li
                        key={i}
                        className="text-[#828282] text-base flex items-center gap-2"
                      >
                        <span className="text-[#018893] text-2xl">&#8226;</span>{" "}
                        {item.name}
                      </li>
                    )
                  )}
                </ul>
              )
            }
          ]);
          setloading(false);
        })
        .catch(function (error) {
          setloading(false);
          console.log(error);
        });
    }
  }, [params.slug]);
  return (
    <>
      {/* <Popup open={successModal} closePopup={() => setsuccessModal(false)}>
        <h4 className="text-[#018893] font-semibold text-[28px] pb-3 text-center ">
          Thank You!
        </h4>
        <p className="text-[#828282] text-base text-center pb-1">
          You’re booked <span className="text-[#018893]">IN</span> for your
          appointment.
        </p>
        <p className="text-[#828282] text-center mb-20">
          A confirmation has been sent to your email address.{" "}
        </p>
        <div className="text-center pb-8">
          <a
            href="/"
            className="w-auto h-12 rounded-3xl py-4 px-6 text-white font-medium bg-[#82C29B]"
          >
            Continue to Homepage
          </a>
        </div>
      </Popup> */}
      {loading ? (
        <div className="w-full h-full fixed">
          <Loader classes="absolute top-1/2 left-1/2" />
        </div>
      ) : (
        <>
          <section className="">
            <ProviderHero
              data={profileData}
              setsuccessModal={setsuccessModal}
            />
          </section>
          <div className="provider-details-main-block container relative flex gap-8 mt-[-200px]">
            <Appointmentcard />

            <ProfileDetails details={details} />
          </div>

          <section className="bg-[#EEFBFF] pt-[77px] pb-[77px] md:pt-[90px] md:pb-[92px]">
            <div className="container">
              <h4 className="text-[#018893] text-[26px] font-medium pb-8 lg:pb-16 md:text-4xl">
                Frequently Asked Questions
              </h4>
              <Accordion data={accordionData} customClass="provider-faq" />
            </div>
          </section>

          <div className="my-12 blind-weight-container container">
            <ImageWithText
              gapSize={"gap-0"}
              imageSrc="/images/blindweight.png"
              heading={
                <h3 className="font-semibold text-[#2B3D67] md:mx-0 lg:max-w-[540px] text-[28px] md:text-4xl leading-[2.3rem] md:leading-[3.15rem] pt-[76px] md:pt-0">
                  Get a <span className="font-black text-[#018893]">FREE </span>
                  <span className="text-black">
                    BlindWeight<sup>TM </sup>
                  </span>
                  scale when you book your first appointment
                </h3>
              }
              content={
                <p className="text-[#018893] md:text-lg text-xl font-medium leading-[1.9rem] md:leading-[1.7rem] pt-[33px] md:pt-7">
                  How Does It Work?
                </p>
              }
              showButton
              customClass="blind-weight flex-row-reverse justify-center"
              buttonProps={
                <a
                  href="/all-providers"
                  className="readmore-btn button-primary inline-block mt-[54px]"
                >
                  See Our Providers
                </a>
              }
            />
          </div>
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
                      Our personalized and integrated approach inspires people
                      to commit to overcoming obstacles.
                    </p>
                  }
                  showButton
                  customClass="justify-start gap-[29px] partners"
                  buttonProps={
                    <a
                      href="/contact-us"
                      className="button-primary mt-[52px] hidden lg:block w-fit"
                    >
                      Partner with Us
                    </a>
                  }
                />
                <LogoList
                  logos={logos}
                  customClasses="mx-10 xl:mx-0 grid justify-items-center items-center grid-cols-2 gap-x-[76px] gap-y-7 lg:gap-x-[91px] lg:gap-y-[53px] xl:min-w-[445px] px-7 lg:px-0 pt-[59px] lg:pt-6"
                />
                <a
                  href="/contact-us"
                  className="button-primary mt-[52px] lg:hidden mb-[45px] block mx-auto w-fit"
                >
                  Partner with Us
                </a>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ProviderProfile;
