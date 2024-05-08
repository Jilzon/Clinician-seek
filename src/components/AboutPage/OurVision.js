import React from 'react'

const OurVision = () => {
  return (
    <div className="about-our-vision">
      <div className='container lg:flex pt-11'>
        <div className='flex flex-col justify-center'>
          <h3 className='text-[#018893] font-semibold text-3xl lg:text-4xl leading-[37.2px] pb-5 lg:pb-[51px]'>Our Vision</h3>
          <p className='text-[#2B3D67] font-medium text-lg lg:text-2xl leading-tight lg:leading-[37px] max-w-[445px]'>
            Our vision is to help our clients to improve their mental, emotional
            and physical well-being.
          </p>
        </div>
        <div>
          <img
            src="/images/happy-woman.png"
            alt="smiling women"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default OurVision