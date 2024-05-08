"use client";
import React from "react";
import Card from "./card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CardSlider({ slideContent, sliderSettings }) {
  return (
    <div className="clinician-slider-wrapper md:pb-[74px]">
      <Slider {...sliderSettings}>
        {slideContent &&
          slideContent.map((item, i) => <Card key={i} cardList={item} />)}
      </Slider>
    </div>
  );
}
