"use client";
import React, { useEffect, useState, useContext } from "react";
import HomeSpotlight from "@/components/home_spotlight/homeSpotlight";
import ImageWithText from "@/components/imageWithText";
import LogoList from "@/components/logoList";
import ProfileFilter from "@/components/profileFilter";
import SimpleCardSlider from "@/components/SimpleCardSlider";
import "../styles/style.scss";
import "../styles/home.css";
import { contextParams } from "@/components/contextCreator/contextCreator";

import axios from "@/helpers/axios";
export default function Home() {
  const {
    token,
    setToken,
    openModal,
    setOpenModal,
    clinicianName,
    setClinicianName,
    openSuccessModal,
    setOpenSuccessModal
  } = useContext(contextParams);
  const [profileFilterData, setProfileFilterData] = useState([]);
  const [profileFilterCardData, setProfileFilterCardData] = useState([]);
  const [searchprovider, setSearchProvider] = useState("");
  const [loading, setloading] = useState(false);
  const [specialties, setSpecialties] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [nextPage, setNextPage] = useState(null);
  const [filterPageNumber, setFilterPageNumber] = useState(1);
  const [filterPageLimit, setFilterPageLimit] = useState(10);
  const [filterNextPage, setFilterNextPage] = useState(null);
  const [clinicListing, setClinicListing] = useState([]);
  const [filterTags, setFilterTags] = useState([]);
  const [payModes, setpayModes] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [locations, setLocations] = useState([]);
  const [featuredList, setFeaturedList] = useState([]);
  const [isSliderLoading, setIsSliderLoading] = useState(false);
  const [dynamicFilter, setDynamicFilter] = useState({
    location: [],
    specialization: [],
    pay_mode: [],
    age_category: []
  });
  const [filteredOptions, setFilteredOptions] = useState({
    location: [],
    specialization: [],
    pay_mode: [],
    age_category: []
  });
  // const { openPopup, setOpenPopup } = useContext(contextParams);
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
    ],
    beforeChange: (current, next) => {
      if (!isSliderLoading) {
        if (nextPage !== null && next > current) {
          axios
            .get(
              `clinic/get-featured/?page_no=${pageNumber}&page_limit=${pageLimit}`
            )
            .then(function (response) {
              setNextPage(response.data.pagination.next_page);
              if (response.data.pagination.next_page !== null) {
                setPageNumber(response.data.pagination.next_page);
              }
              var featuredData = [];
              response?.data?.data?.map((item) => {
                var checkUser = item?.user_access;
                if (checkUser) {
                  featuredData.push({
                    id: item?._id,
                    slug: item?.details?.slug,
                    profile: true,
                    status: item?.details?.tag,
                    cardTitle: `${item.name},${item?.details?.qualification}`,
                    cardSubTitle: item?.details?.designation,
                    cardDescription: item?.details?.bio,
                    list: item?.details?.specialization?.map(
                      (item) => item?.name
                    ),
                    cardDescription: item?.details?.bio,
                    image: item?.profile_pic_url
                  });
                } else {
                  featuredData.push({
                    id: item?._id,
                    slug: item?.slug,
                    status: item?.tag,
                    cardDescription: item?.details,
                    image: item?.image_url,
                    isButtonActive: true
                  });
                }
              });
              setFeaturedList(featuredData);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      }
    }
  };
  const filterSliderSettings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    // slidesToScroll: 1,
    variableWidth: true,
    arrows: true,
    dots: false,
    pauseOnHover: true,
    variableWidth: true,
    beforeChange: (current, next) => {
      if (!loading) {
        if (filterNextPage !== null && next > current) {
          axios
            .get(
              `provider/get-provider-listing/?page_no=${filterPageNumber}&page_limit=${filterPageLimit}${
                searchprovider ? `${searchprovider}` : ``
              }`
            )
            .then(function (response) {
              setFilterNextPage(response.data.pagination.next_page);
              if (response.data.pagination.next_page !== null) {
                setFilterPageNumber(response.data.pagination.next_page);
              }
              setProfileFilterData(response.data.data);
              setProfileFilterCardData([
                ...profileFilterCardData,
                ...response.data.data.map((item) => ({
                  slug: item?.provider?.slug,
                  id: item?._id,
                  status: item.status,
                  profile: true,
                  name: item.name,
                  cardTitle: `${item.name},${item.provider.qualification}`,
                  cardSubTitle: item.provider.designation,
                  cardDescription: item.provider.bio,
                  clinicianImage: item.profile_pic_url,
                  list: [
                    {
                      title: "Specialize In:",
                      type: "list",
                      data: item?.provider?.specialization.map(
                        (item) => item.name
                      )
                    },
                    {
                      title: "Accepted Payment",
                      type: "badge",
                      data: item?.provider?.acceptable_pay_modes.map(
                        (item) => item.name
                      )
                    }
                  ]
                }))
              ]);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
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
    setClinicianName(null);
    setloading(true);
    try {
      axios
        .post(`provider/get-tags`, JSON.stringify(dynamicFilter))
        .then(function (response) {
          setFilteredOptions({
            location: [
              ...new Set([
                ...response?.data?.data[0]?.location?.map((item) => item?.name),
                ...response?.data?.data[0]?.state?.map((item) => item?.name),
                ...response?.data?.data[0]?.city?.map((item) => item?.name)
              ])
            ],
            specialization: response?.data?.data[0]?.specialization,
            pay_mode: response?.data?.data[0]?.payMode
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {}
    axios
      .get(
        `provider/get-provider-listing/?page_no=${filterPageNumber}&page_limit=${filterPageLimit}${
          searchprovider ? `${searchprovider}` : ``
        }`
      )
      .then(function (response) {
        // handle success
        setProfileFilterData(response.data.data);
        setProfileFilterCardData(
          response.data.data.map((item) => ({
            id: item?._id,
            slug: item?.provider?.slug,
            status: item?.provider?.tag,
            profile: true,
            name: item.name,
            cardTitle: `${item.name},${item.provider.qualification}`,
            cardSubTitle: item.provider.designation,
            cardDescription: item.provider.bio,
            clinicianImage: item.profile_pic_url,
            list: [
              {
                title: "Specialize In:",
                type: "list",
                data: item?.provider?.specialization.map((item) => item.name)
              },
              {
                title: "Accepted Payment",
                type: "badge",
                data: item?.provider?.acceptable_pay_modes.map(
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
        setloading(false);
      })
      .catch(function (error) {
        setloading(false);
        console.log(error);
      });
  }, [dynamicFilter]);
  useEffect(() => {
    setIsSliderLoading(true);
    axios
      .get(`clinic/get-featured`)
      .then(function (response) {
        var featuredData = [];
        response?.data?.data?.map((item) => {
          var checkUser = item?.user_access;
          if (checkUser) {
            featuredData.push({
              id: item?._id,
              slug: item?.details?.slug,
              profile: true,
              status: item?.details?.tag,
              cardTitle: `${item.name},${item?.details?.qualification}`,
              cardSubTitle: item?.details?.designation,
              cardDescription: item?.details?.bio,
              list: item?.details?.specialization?.map((item) => item?.name),
              cardDescription: item?.details?.bio,
              image: item?.profile_pic_url
            });
          } else {
            featuredData.push({
              id: item?._id,
              slug: item?.slug,
              status: item?.tag,
              cardDescription: item?.details,
              image: item?.image_url,
              isButtonActive: true
            });
          }
        });
        setFeaturedList(featuredData);
        setIsSliderLoading(false);
        // setFeaturedList([
        //   ...response?.data?.featured?.clinics?.map((item) => ({
        //     id: item?._id,
        //     status: item?.tag,
        //     cardDescription: item?.details,
        //     image: item?.image_url,
        //     isButtonActive: true
        //   })),
        //   ...response?.data?.featured?.providers?.map((item) => ({
        //     id: item?._id,
        //     profile: true,
        //     status: item?.details?.tag,
        //     cardTitle: `${item.name},${item?.details?.qualification}`,
        //     cardSubTitle: "Nutrition Therapist",
        //     cardDescription: item?.details?.bio,
        //     list: item?.details?.specialization?.map((item) => item?.name),
        //     cardDescription: item?.details?.bio,
        //     image: item?.profile_pic_url
        //   }))
        // ]);
      })
      .catch(function (error) {
        setIsSliderLoading(false);
        console.log(error);
      });

    // axios
    //   .get(`provider/get-saved-locations`)
    //   .then(function (response) {
    //     var locationArray = [];
    //     var list = response.data.data;

    //     for (const key in list) {
    //       if (key !== "zipCode") {
    //         var values = list[key];
    //         values.map((v) => {
    //           locationArray.push(v._id);
    //         });
    //       }
    //     }
    //     setLocations([...new Set(locationArray)]);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    // axios
    //   .get(
    //     `clinic/get-clinic-listing/?page_no=${pageNumber}&page_limit=${pageLimit}`
    //   )
    //   .then(function (response) {
    //     setClinicListing(response.data.data);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    // axios
    //   .get(`provider/get-pay-modes`)
    //   .then(function (response) {
    //     setpayModes(response.data.data);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    // axios
    //   .get(`provider/get-specializations`)
    //   .then(function (response) {
    //     setSpecializations(response.data.data);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }, []);
  return (
    // <ContextCreator>
    <div className="overflow-hidden">
      <HomeSpotlight />
      {featuredList.length > 0 && (
        <SimpleCardSlider data={featuredList} settings={sliderSettings} />
      )}
      <div
        className={`mx-auto md:container ${
          featuredList.length > 0 ? `md:mt-[88px]` : `md:mt-[200px]`
        } `}
      >
        <ImageWithText
          customClass="justify-center clinician-seek"
          imageSrc="/images/welcome.svg"
          heading={
            <h3 className="font-bold text-[#018893] md:block hidden md:text-4xl pt-[27px]">
              Welcome to Clinician Seek
            </h3>
          }
          content={
            <p className="lg:max-w-[532px] font-medium text-[#2B3D67] leading-[1.6rem] md:leading-[2.27rem] md:text-[26px] pt-[136px] md:pt-[39px] text-lg pb-[33px]">
              A directory of healthcare providers who specialize in treating a
              variety of eating disorders. We understand that finding the right
              eating disorder specialist can be a daunting task, and we're here
              to make it easier for you.
            </p>
          }
          showButton
          buttonProps={
            <a href="/about-us" className="button-primary readmore-btn">
              Read More
            </a>
          }
        />
      </div>
      <ProfileFilter
        setSlideContent={profileFilterCardData}
        dropdownTitle="Find Providers In My Area"
        filterParams={searchprovider}
        setFilterParams={{
          searchParams: setSearchProvider,
          setFilterTags: setFilterTags,
          setPage: setFilterPageNumber,
          setDynamicFilter: setDynamicFilter
        }}
        dynamicFilter={dynamicFilter}
        loading={loading}
        sliderSettings={filterSliderSettings}
        filterTags={filterTags}
        location={searchprovider}
        // payModes={filteredOptions?.pay_mode}
        // specializations={filteredOptions?.specialization}
        // locationOptions={filteredOptions?.location}
        filteredOptions={filteredOptions}
      />
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
            <p className="text-[#018893] md:text-lg text-xl font-medium leading-[1.9rem] md:leading-[1.7rem] pt-[33px] md:pt-7 mb-14">
              How Does It Work?
            </p>
          }
          showButton
          customClass="blind-weight flex-row-reverse justify-center"
          buttonProps={
            <a href="/all-providers" className="readmore-btn button-primary">
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
              customClasses="grid justify-items-center items-center grid-cols-2 gap-x-[76px] gap-y-7 lg:gap-x-[91px] lg:gap-y-[53px] xl:min-w-[445px] px-7 lg:px-0 pt-[59px] lg:pt-6"
            />
            <a
              href="/contact-us"
              className="readmore-btn button-primary mt-[52px] lg:hidden mb-[45px] block mx-auto w-fit"
            >
              Partner with Us
            </a>
            {/* <a href="/about-us" className="button-primary readmore-btn">Read More</a> */}
          </div>
        </div>
      </section>
    </div>
    // </ContextCreator>
  );
}
