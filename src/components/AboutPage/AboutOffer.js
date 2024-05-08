import React from 'react'

const AboutOffer = () => {
  return (
    <div className="bg-white pt-10 lg:pt-[118px] pb-10 lg:pb-[112px]">
      <div className="container lg:flex justify-between items-start gap-20">
        <div className="lg:w-1/2 flex flex-col justify-center items-center">
          <img
            src="/images/about-help.png"
            alt="smiling women"
            className="object-cover"
          />
          <h4 className='text-[#018893] font-semibold text-3xl lg:text-4xl leading-[37px] text-center pt-[46px] pb-4'>Who we can help</h4>
          <p className='text-[#808082] font-medium text-lg lg:text-xl leading-[28px] text-center mb-10 lg:mb-0'>
            We help children, teens, adults, and geriatric adults who are
            struggling with mental health issues. We also treat family members,
            friends, and significant others who are affected by any complex
            condition that their loved ones may have.
          </p>
        </div>
        <div className="lg:w-1/2 flex flex-col justify-center items-center">
          <img
            src="/images/about-offer.png"
            alt="smiling women"
            className="object-cover"
          />
          <h4 className='text-[#018893] font-semibold text-3xl lg:text-4xl leading-[37px] text-center pt-[46px] pb-4'>What We Offer</h4>
          <p className='text-[#808082] font-medium text-lg lg:text-xl leading-[28px] text-center'>
            First Step Counseling provides a wide range of mental health
            services to the community. Our trained professionals utilize a
            variety of approaches such as evidence-based treatments,
            psychodynamics, and mindfulness. These methods have been proven to
            be the most effective intervention for the presenting problems.
            Treatment for mental illness may include the use of medication,
            therapy or a combination of the two.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutOffer