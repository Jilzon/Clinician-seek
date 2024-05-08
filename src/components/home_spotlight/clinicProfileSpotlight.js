import React from "react";
import SimpleCard from "../SimpleCard";
import ImageWithText from "@/components/imageWithText";

const ClinicProfileSpotlight = () => {
  const simpleCardData = [
    {
      featured: true,
      cardDescription:
        "Specialized in treating anxiety, depression, OCD, addiction associated with eating behaviors body image and body dissatisfaction.",
      isButtonActive: true,
      image: "/images/parkland.png",
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
        text: "Available",
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
          data: ["Binge-eating Disorder", "ARFID"],
        },
      ],
    },
  ];
  const clinicImages = [
    {
      src: "/images/park1.png",
      alt: "park",
      title: "park Title",
    },
    {
      src: "/images/park2.png",
      alt: "park",
      title: "park2 Title",
    },
    {
      src: "/images/park3.png",
      alt: "park3",
      title: "park 3 Title",
    },
    {
      src: "/images/park4.png",
      alt: "park 3",
      title: "park3 Title",
    },
    {
      src: "/images/park5.png",
      alt: "park3",
      title: "park3 Title",
    },
  ];
  return (


      <div className="clinic-hero relative">
        <div className="max-w-full overflow-hidden overflow-y-visible relative min-h-[720px]">
          <div className="container relative">
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
            <div className="relative">
              
              <div className="pt-[212px] relative max-w-full ">
           <div className="container mx-auto mt-8">
              <div className="grid clinic-img-grid gap-4">
                <div className="col-span-1 mobile-hidden-md">
                  <img
                    src={clinicImages[0].src}
                    alt="park 1"
                    className="mb-4  h-full"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {clinicImages.slice(1).map((image, index) => (
                    <img className="w-full" key={index} src={image.src} alt={`park${index + 2}`} />
                  ))}
                </div>
              </div>
           </div>
        </div>
             
            </div>
          </div>
        </div>
      </div>

  );
};

export default ClinicProfileSpotlight;
