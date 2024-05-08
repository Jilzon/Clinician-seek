"use client";
import React from "react";
import SimpleCard from "../SimpleCard";
import { settings } from "@/components/cardSlider";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Drawer from "../Drawer";
const HomeSpotlight = () => {
  const simpleCardData = [
    {
      featured: true,
      cardDescription:
        "Specialized in treating anxiety, depression, OCD, addiction associated with eating behaviors body image and body dissatisfaction.",
      isButtonActive: true,
      image: "/images/parkland.png"
    },

    {
      status: "Available",
      featured: true,
      profile: true,
      cardTitle: "Jenny Doe, MS, RD, CISSN",
      cardSubTitle: "Nutrition Therapist",
      image: "/images/clinician-1.png",
      cardDescription:
        "Lorem ipsum dolor sit amet consectetur. Tempus nullam tellus in.",
      list: [
        {
          data: ["Binge-eating Disorder", "ARFID"]
        }
      ]
    },
    {
      status: "Available",
      featured: true,
      profile: true,
      cardTitle: "Jenny Doe, MS, RD, CISSN",
      cardSubTitle: "Nutrition Therapist",
      image: "/images/clinician-1.png",
      cardDescription:
        "Lorem ipsum dolor sit amet consectetur. Tempus nullam tellus in.",
      list: [
        {
          data: ["Binge-eating Disorder", "ARFID"]
        }
      ]
    },
    {
      status: "Available",
      featured: true,
      profile: true,
      cardTitle: "Jenny Doe, MS, RD, CISSN",
      cardSubTitle: "Nutrition Therapist",
      image: "/images/clinician-1.png",
      cardDescription:
        "Lorem ipsum dolor sit amet consectetur. Tempus nullam tellus in.",
      list: [
        {
          data: ["Binge-eating Disorder", "ARFID"]
        }
      ]
    },
    {
      status: "Available",
      featured: true,
      profile: true,
      cardTitle: "Jenny Doe, MS, RD, CISSN",
      cardSubTitle: "Nutrition Therapist",
      image: "/images/clinician-1.png",
      cardDescription:
        "Lorem ipsum dolor sit amet consectetur. Tempus nullam tellus in.",
      list: [
        {
          data: ["Binge-eating Disorder", "ARFID"]
        }
      ]
    },
    {
      status: "Available",
      featured: true,
      profile: true,
      cardTitle: "Jenny Doe, MS, RD, CISSN",
      cardSubTitle: "Nutrition Therapist",
      image: "/images/clinician-1.png",
      cardDescription:
        "Lorem ipsum dolor sit amet consectetur. Tempus nullam tellus in.",
      list: [
        {
          data: ["Binge-eating Disorder", "ARFID"]
        }
      ]
    },
    {
      status: "Available",
      featured: true,
      profile: true,
      cardTitle: "Jenny Doe, MS, RD, CISSN",
      cardSubTitle: "Nutrition Therapist",
      image: "/images/clinician-1.png",
      cardDescription:
        "Lorem ipsum dolor sit amet consectetur. Tempus nullam tellus in.",
      list: [
        {
          data: ["Binge-eating Disorder", "ARFID"]
        }
      ]
    },
    {
      status: "Available",
      featured: true,
      profile: true,
      cardTitle: "Jenny Doe, MS, RD, CISSN",
      cardSubTitle: "Nutrition Therapist",
      image: "/images/clinician-1.png",
      cardDescription:
        "Lorem ipsum dolor sit amet consectetur. Tempus nullam tellus in.",
      list: [
        {
          data: ["Binge-eating Disorder", "ARFID"]
        }
      ]
    }
  ];
  return (
    <section className="relative spotlight pb-28 md:pb-0 bg-[#E0FEE1]">
      <div className="max-w-full relative">
        <div className="container grid grid-cols-[1.8fr_.2fr] md:grid-cols-[1.2fr_.8fr] relative">
          <div className="absolute -left-[250px] md:-left-[12%] top-[20%] md:-top-[10%] z-10">
            <svg
              className=""
              width="576"
              height="588"
              viewBox="0 0 576 588"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M420.595 581.226c191.437-52.435 210.083-478.672 28.118-564.5C275.72-64.868-29.705 174.366 2.881 351.63 32.88 514.817 301.772 613.772 420.595 581.226Z"
                fill="#D1F5C7"
              />
            </svg>
          </div>
          <div className="pt-[212px] pb-14 relative z-10 max-w-[295px] md:max-w-none">
            <h2 className="main-head spotlight-head text-[52px] 2xl:text-[64px] text-clr_title font-bold mb-5 lg:mb-[43px] leading-[4.1rem] 2xl:leading-[5rem] 2xl:max-w-[80%]">
              Book an Eating Disorder Specialist
            </h2>
            <p className="text-lg md:text-xl text-[#808082] font-medium leading-7 md:max-w-[500px]">
              Find a licensed provider in your state, specialized in your case
              and accepts your preferred form of payment.
            </p>
          </div>
          <div className="relative">
            <img
              src="/images/home-spotlight.png"
              alt=""
              className="absolute -right-60 md:-right-40 min-[1600px]:-right-[28rem] top-10 md:top-0 w-80vw  max-w-[600px] md:w-[82vw] md:max-w-[990px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSpotlight;
