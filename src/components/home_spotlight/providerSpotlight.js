import React from "react";
import SimpleCard from "../SimpleCard";
import Image from 'next/image';
import ImageWithText from "@/components/imageWithText";
const ProviderSpotlight = () => {
  const simpleCardData = [
    {
      featured: true,
      cardDescription:
        "Specialized in treating anxiety, depression, OCD, addiction associated with eating behaviors body image and body dissatisfaction.",
      isButtonActive: true,
      image: "/images/parkland.png"
    },

    {
      status: {
        icon: (
          <svg
            width="13"
            height="14"
            viewBox="0 0 13 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.5 0.0102539C2.91604 0.0102539 0 2.92629 0 6.51025C0 10.0942 2.91604 13.0103 6.5 13.0103C10.084 13.0103 13 10.0942 13 6.51025C13 2.92629 10.084 0.0102539 6.5 0.0102539ZM10.1328 4.79973L5.9787 8.92128C5.73434 9.16564 5.34336 9.18193 5.08271 8.93757L2.88346 6.93381C2.62281 6.68945 2.60652 6.28218 2.83459 6.02153C3.07895 5.76088 3.48622 5.74459 3.74687 5.98895L5.48998 7.58544L9.20426 3.87116C9.46491 3.6105 9.87218 3.6105 10.1328 3.87116C10.3935 4.13181 10.3935 4.53908 10.1328 4.79973Z"
              fill="#82C29B"
            />
          </svg>
        ),
        text: "Available"
      },
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
    <section className="relative">
      <div className="max-w-full overflow-hidden overflow-y-visible relative min-h-[1053px]">
        <div className="absolute left-1/2 transform -translate-x-1/2 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="5152"
            height="1053"
            fill="none"
          >
            <path
              fill="#E0FEE1"
              d="M2144 730.349c-137.6-28.226-249.33 1.176-288 19.405-28.33 14.082-154 91.735-280.5 73.746-234.81-33.391-255.5-194-661-246.5-324.862-42.06-419.5-340.5-575-398.5C215.1 132.1 61.333 40.167 0 0h5037.5c-116 231.167-425.5 338-633.5 530-126 116.308-235.5 422.182-443 413.5-232.17-9.714-311.5-23.601-433 0-55.6 10.8-131.5 88.71-234 104.39-196 29.99-288-79.384-392-137.6-104-58.216-218-77.622-382-68.801-164 8.82-204-75.858-376-111.14Z"
            />
          </svg>
        </div>
        <div className="container  relative">
          <div className="absolute -left-[12%] -top-[10%]">
            <svg
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
          <div className="pt-[212px] relative md:max-w-[666px]">
          <div className="mx-auto md:container mt-[88px]">
        <ImageWithText
          customClass="justify-center"
          imageSrc="/images/parkland-logo.png"
          heading={
            <h2 className="font-bold text-4xl leading-5 text-[#018893]">
              Parkland Nutrition
            </h2>
          }
          content={
            <p className="text-xl text-[#808082] font-medium leading-7 md:max-w-[500px]">
            Our focus is to help you heal your relationship with food, eating, and body image.We will walk alongside you in this journey of self-empowerment to find peace with food and your body.
            </p>
          }
          showButton
          buttonProps={
            <button className="button-primary mt-[33px]">Read More</button>
          }
        />
      </div>
   
          </div>
        
       
        </div>
    

      </div>
    </section>
  );
};

export default ProviderSpotlight;
