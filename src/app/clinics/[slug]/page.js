"use client";
import React, { useState, useEffect } from "react";
import HomeSpotlight from "@/components/home_spotlight/homeSpotlight";
import ClinicProfileSpotlight from "@/components/home_spotlight/clinicProfileSpotlight";
import ImageWithText from "@/components/imageWithText";
import LogoList from "@/components/logoList";
import CardSlider from "@/components/cardSlider";
import Badge from "@/components/Badge/badge";
import { clinicianFilterIcon } from "@/app/icons";
import axios from "@/helpers/axios";
import Card from "@/components/card";
function ClinicProfile({ params }) {
  const [clinicDetails, setClinicDetails] = useState([]);
  const [providers, setProviders] = useState([]);
  const [filterPageNumber, setFilterPageNumber] = useState(1);
  const [filterPageLimit, setFilterPageLimit] = useState(10);
  const [filterNextPage, setFilterNextPage] = useState(null);
  const logos = [
    "/images/bluecross.png",
    "/images/tricare.png",
    "/images/mhn.png",
    "/images/aetna.png"
  ];

  const sliderSettings = {
    // dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    // slidesToScroll: 1,
    variableWidth: true,
    arrows: true,
    dots: false,
    pauseOnHover: true,
    beforeChange: (current, next) => {
      if (filterNextPage !== null && next > current) {
        axios
          .get(
            `/clinic/get-providers-by-slug/${params.slug}?page_no=${filterPageNumber}&page_limit=${filterPageLimit}`
          )
          .then(function (response) {
            setFilterNextPage(response.data.pagination.next_page);
            if (response.data.pagination.next_page !== null) {
              setFilterPageNumber(response.data.pagination.next_page);
            }
            setProviders([
              ...providers,
              ...response.data.data.map((item) => ({
                id: item?.provider_user?._id,
                slug: item?.provider_user?.details?.slug,
                status: item?.provider?.tag,
                profile: true,
                cardTitle: `${item.provider_user.name},${item.provider_user.details.qualification}`,
                cardSubTitle: item.provider_user.details.designation,
                cardDescription: item.provider_user.details.bio,
                clinicianImage: item.provider_user.profile_pic_url,
                list: [
                  {
                    title: "Specialize In:",
                    type: "list",
                    data: item?.provider_user?.details?.specialization.map(
                      (item) => item.name
                    )
                  },
                  {
                    title: "Accepted Payment",
                    type: "badge",
                    data: item?.provider_user?.details?.acceptable_pay_modes.map(
                      (item) => item.name
                    )
                  }
                ]
              }))
            ]);
          })
          .catch(function (error) {});
      }
    },
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          autoplay: true,
          infinite: true
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          autoplay: true,
          infinite: true
        }
      }
    ]
  };

  useEffect(() => {
    if (params.slug) {
      axios
        .get(`/clinic/get-clinic-by-slug/${params.slug}`)
        .then(function (response) {
          setClinicDetails(response.data.clinic);
        })
        .catch(function (error) {});
      try {
        axios
          .get(
            `/clinic/get-providers-by-slug/${params.slug}?page_no=${filterPageNumber}&page_limit=${filterPageLimit}`
          )
          .then(function (response) {
            setProviders(
              response.data.data.map((item) => ({
                id: item?.provider_user?._id,
                slug: item?.provider_user?.details?.slug,
                status: item?.provider?.tag,
                profile: true,
                cardTitle: `${item.provider_user.name},${item.provider_user.details.qualification}`,
                cardSubTitle: item.provider_user.details.designation,
                cardDescription: item.provider_user.details.bio,
                clinicianImage: item.provider_user.profile_pic_url,
                list: [
                  {
                    title: "Specialize In:",
                    type: "list",
                    data: item?.provider_user?.details?.specialization.map(
                      (item) => item.name
                    )
                  },
                  {
                    title: "Accepted Payment",
                    type: "badge",
                    data: item?.provider_user?.details?.acceptable_pay_modes.map(
                      (item) => item.name
                    )
                  }
                ]
              }))
            );
            setFilterNextPage(response.data.pagination.next_page);
            if (response.data.pagination.next_page !== null) {
              setFilterPageNumber(response.data.pagination.next_page);
            }
          })
          .catch(function (error) {});
      } catch (error) {}
    }
  }, [params.slug]);

  return (
    <>
      <ClinicProfileSpotlight />

      {/* <div className="clinic-details mx-auto md:container mt-[88px] flex ">
        
        <ImageWithText
          customClass="justify-center"
          imageSrc="/images/parkland-logo.png"
          heading={
            <div className="flex justify-between ">
            <h2 className="font-bold text-4xl leading-5 text-[#018893] pt-0 py-10">
              Parkland Nutrition
            </h2>
            <Badge featured marginTop={"mt-0"}/>
            </div>
        
          }
          content={
            <div>
            <p className="text-lg text-[#018893] font-medium leading-7">
            Our focus is to help you heal your relationship with food, eating, and body<br/> image.We will walk alongside you in this journey of self-empowerment to<br/>find peace with food and your body.
            </p>
            <div className="flex text-[#018893] pt-10 gap-10 border-b justify-center">
              
              <span><img src="/images/phone (1).png" alt=""/><a href="tel:+(02) 123 4567 899">(02) 123 4567 899</a></span>
              <span><img src="/images/phone (3).png" alt=""/><a href="mailto:info@parkland.com">info@parkland.com</a></span>
              <span><img src="/images/phone (2).png" alt=""/>www.parkland.com</span>
              </div>
            </div>
          }
      
        />
      </div> */}

      <div className="container clinic-details mx-auto mt-24 flex justify-center gap-14 flex-col md:flex-row">
        <div className="w-30  flex justify-center items-center flex-col">
          {clinicDetails?.image_url && clinicDetails?.image_url !== "" ? (
            <img
              src={clinicDetails.image_url}
              alt="Logo"
              width={200}
              height={200}
              className="py-5"
            />
          ) : (
            <img
              src="/images/place-holder.png"
              alt="Parkland Logo"
              width={200}
              height={200}
              className="py-5"
            />
          )}
          <div className="clinic-badge">
            <Badge status="Virtual Clinic" />
          </div>
          <div className="clinic-mobile-badge">
            {clinicDetails?.note && <Badge status={clinicDetails?.note} />}
            {/* <Badge featured /> */}
          </div>
        </div>

        <div className="w-70 pl-0 md:pl-10">
          <div className="flex justify-between flex-col md:flex-row ">
            <h2 className="font-bold  leading-5 text-[#018893] pt-0 py-10 text-xl md:text-4xl text-center md:text-left">
              {/* Parkland Nutrition */}
              {clinicDetails?.name}
            </h2>
            {clinicDetails?.tag && (
              <div className="clinic-badge">
                <Badge status={clinicDetails?.tag} />
              </div>
            )}
          </div>
          <p className="text-lg text-[#018893] font-normal leading-7 text-center md:text-left">
            {/* Our focus is to help you heal your relationship with food, eating,
            and body
            <br /> image. We will walk alongside you in this journey of
            self-empowerment to
            <br /> find peace with food and your body. */}
            {clinicDetails?.details}
          </p>

          <div className="flex text-[#018893] pt-10 gap-5 md:gap-10 border-b justify-center flex-col lg:flex-row pb-8">
            {clinicDetails?.phone_no && (
              <span className="flex gap-2">
                <img className="w-6 h-6" src="/images/phone 1.svg" alt="" />
                <a href={`tel:${clinicDetails.phone_no}`}>
                  {clinicDetails?.phone_no}
                </a>
              </span>
            )}
            {clinicDetails?.email && (
              <span className="flex gap-2">
                <img className="w-6 h-6" src="/images/mail 1.svg" alt="" />
                <a href={`mailto:${clinicDetails.email}`}>
                  {clinicDetails.email}
                </a>
              </span>
            )}
            {clinicDetails?.website && (
              <span className="flex gap-2">
                <img className="w-6 h-6" src="/images/website 1.svg" alt="" />
                <a href={clinicDetails.website}>{clinicDetails.website}</a>
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="relative overflow-hidden">
        <div className="absolute -z-10 -right-[157px] top-[62px] hidden md:block">
          {clinicianFilterIcon}
        </div>
        {providers.length > 0 && (
          <div className="w-full">
            <div className="container overflow-visible">
              <h4 className="font-bold  leading-5 text-[#2B3D67] pt-0 text-xl md:text-2xl text-center md:text-left">
                Expert Dietitians
              </h4>
              {providers.length > 1 ? (
                <CardSlider
                  slideContent={providers}
                  sliderSettings={sliderSettings}
                />
              ) : (
                <div className="max-w-[350px] mt-16">
                  <Card cardList={providers[0]} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
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
              href="/contact-us"
              className="readmore-btn button-primary mt-[52px] hidden lg:block w-fit"
            >
              Partner with Us
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
                  Our personalized and integrated approach inspires people to
                  commit to overcoming obstacles.
                </p>
              }
              showButton
              customClass="justify-start gap-[29px] partners"
              buttonProps={
                <a
                  href="/contact-us"
                  className="readmore-btn button-primary mt-[52px] hidden lg:block w-fit"
                >
                  Partner with Us
                </a>
              }
            />
            <LogoList
              logos={logos}
              customClasses="grid grid-cols-2 gap-x-[76px] gap-y-7 lg:gap-x-[91px] lg:gap-y-[53px] xl:min-w-[445px] px-7 lg:px-0 pt-[59px] lg:pt-6"
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
  );
}

export default ClinicProfile;
