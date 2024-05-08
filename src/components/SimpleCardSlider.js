"use client";
import React, { useEffect, useState } from "react";
import SimpleCard from "./SimpleCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function SimpleCardSlider({ data, settings }) {
  const [sliderContent, setSliderContent] = useState([]);
  useEffect(() => {
    setSliderContent(data);
  }, [data]);

  return (
    <div className="w-full overflow-hidden z-50 relative mt-[61px] min-h-[213px]">
      <div className="overflow-visible container">
        <h3 className="text-[#2B3D67] text-[26px] font-medium leading-9 pb-[57px] md:pb-[14px]">
          Featured Clinics & Providers
        </h3>
        <div className="simple-card-wrapper px-0 w-screen">
          {sliderContent && (
            <Slider {...settings}>
              {sliderContent.map((data, index) => (
                <SimpleCard key={index} cardList={data} />
              ))}
            </Slider>
          )}
        </div>
      </div>
    </div>
  );
}
