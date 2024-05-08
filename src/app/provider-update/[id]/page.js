// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import Select from "react-select";
// import SiteHeader from "@/components/siteHeader";
// import Banner from "@/components/Banner/Banner";
// import { specialtyIcon } from "../../icons";
// import Navbar from "@/components/NavigationBar/navBar";
// import axios from "@/helpers/axios";
// export default function ProfileUpdate({ params }) {
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [openBannner, setOpenBanner] = useState(false);
//   const scrollTo = useRef();
//   useEffect(() => {
//     setOpenModal(openModal);
//   }, [openModal]);
//   const options = [
//     { value: "value 1", label: "value 1" },
//     { value: "value 2", label: "value 2" },
//     { value: "value 3", label: "value 3" }
//   ];
//   useEffect(() => {
//     axios
//       .get(`provider/get-provider-details/${params.id}`)
//       .then(function (response) {})
//       .catch(function (error) {
//         setloading(false);
//         console.log(error);
//       });
//   }, []);
//   const updateProfile = (e) => {
//     e.preventDefault();
//     setOpenBanner(true);
//     scrollTo.current.scrollIntoView({ behavior: "smooth" });
//   };
//   return (
//     <>
//       <SiteHeader openModal={openModal} setOpenModal={setOpenModal} />
//       <div className="mt-28 profile-update-page bg-white">
//         <Navbar avatar={specialtyIcon} avatarName="sooraj" />
//         <div className="container mt-14" ref={scrollTo}>
//           <Banner
//             autoHide
//             active={openBannner}
//             closeBanner={setOpenBanner}
//             bannerContent="Congratulations! Your changes has been saved. Your commitment
//                   to providing quality care is greatly appreciated.We will
//                   review your profile and contact you soon!"
//           />
//           <h3 className="font-medium text-4xl leading-[3.15rem] text-[#2B3D67]">
//             Profile Details
//           </h3>
//           <div className="shadow-lg px-6 py-11 my-6 ">
//             <form className="text-[#828282]" onSubmit={updateProfile}>

//               <div className="md:flex gap-10">
//                 <input
//                   type="text"
//                   placeholder="Full Name"
//                   className="w-full block md:w-1/2 border border-solid border-[#018893] rounded-md outline-none py-[14px] pl-3 lg:pl-[30px] mb-14"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Name Credentials"
//                   className="w-full md:w-1/2 border border-solid rounded-md border-[#018893] outline-none py-[14px] pl-3  lg:pl-[30px] mb-14"
//                 />
//               </div>
//               <div className="md:flex gap-10">
//                 <input
//                   type="text"
//                   placeholder="Job Title"
//                   className="w-full md:w-1/2 border border-solid border-[#018893] rounded-md outline-none py-[14px] pl-3  lg:pl-[30px] mb-14"
//                 />
//                 <input
//                   type="text"
//                   placeholder="License Number"
//                   className="w-full md:w-1/2 border border-solid rounded-md border-[#018893] outline-none py-[14px] pl-3  lg:pl-[30px] mb-14"
//                 />
//               </div>
//               <div className="md:flex gap-10">
//                 <div className=" w-full md:w-1/2 flex gap-5">
//                   <input
//                     type="text"
//                     placeholder="Year Graduated"
//                     className="w-full md:w-1/2 border border-solid rounded-md border-[#018893] outline-none py-[14px] pl-3  lg:pl-[30px]  mb-14"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Years in Practice"
//                     className="w-full md:w-1/2 border border-solid border-[#018893] rounded-md outline-none py-[14px] pl-3  lg:pl-[30px] mb-14"
//                   />
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="School"
//                   className="w-full md:w-1/2 border border-solid rounded-md border-[#018893] outline-none py-[14px] pl-3  lg:pl-[30px] mb-14"
//                 />
//               </div>
//               <div className="md:flex gap-10">
//                 <input
//                   type="text"
//                   placeholder="Your Private Practice Email "
//                   className="w-full md:w-1/2 border border-solid border-[#018893] rounded-md outline-none py-[14px] pl-3  lg:pl-[30px] mb-14"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Email used for the practice you work for?"
//                   className="w-full md:w-1/2 border border-solid rounded-md border-[#018893] outline-none py-[14px] pl-3  lg:pl-[30px] mb-14"
//                 />
//               </div>
//               <textarea
//                 type="text"
//                 placeholder="About"
//                 className="resize-none border border-solid rounded-md border-[#018893] outline-none w-full py-[14px] pl-3  lg:pl-[30px] mb-14"
//               />
//               <div className="md:flex gap-10">
//                 <Select
//                   className="w-full md:w-1/2 mb-14"
//                   defaultValue={selectedOption}
//                   onChange={setSelectedOption}
//                   options={options}
//                   isMulti
//                   placeholder="Issues"
//                   styles={{
//                     control: (provided) => ({
//                       ...provided,
//                       padding: "7px 0 7px 12px"
//                     })
//                   }}
//                 />
//                 <Select
//                   className="w-full md:w-1/2 mb-14"
//                   defaultValue={selectedOption}
//                   onChange={setSelectedOption}
//                   options={options}
//                   isMulti
//                   placeholder="Religion"
//                   styles={{
//                     control: (provided) => ({
//                       ...provided,
//                       padding: "7px 0 7px 12px"
//                     })
//                   }}
//                 />
//               </div>
//               <div className="md:flex gap-10">
//                 <Select
//                   className="w-full md:w-1/2 mb-14"
//                   defaultValue={selectedOption}
//                   onChange={setSelectedOption}
//                   options={options}
//                   isMulti
//                   placeholder="Treatment"
//                   styles={{
//                     control: (provided) => ({
//                       ...provided,
//                       padding: "7px 0 7px 12px"
//                     })
//                   }}
//                 />
//                 <Select
//                   className="w-full md:w-1/2 mb-14"
//                   defaultValue={selectedOption}
//                   onChange={setSelectedOption}
//                   options={options}
//                   isMulti
//                   placeholder="Ages"
//                   styles={{
//                     control: (provided) => ({
//                       ...provided,
//                       padding: "7px 0 7px 12px"
//                     })
//                   }}
//                 />
//               </div>
//               <div className="md:flex gap-10">
//                 <Select
//                   className="w-full md:w-1/2 mb-14"
//                   defaultValue={selectedOption}
//                   onChange={setSelectedOption}
//                   options={options}
//                   isMulti
//                   placeholder="Insurances"
//                   styles={{
//                     control: (provided) => ({
//                       ...provided,
//                       padding: "7px 0 7px 12px"
//                     })
//                   }}
//                 />
//                 <Select
//                   className="w-full md:w-1/2 mb-14"
//                   defaultValue={selectedOption}
//                   onChange={setSelectedOption}
//                   options={options}
//                   isMulti
//                   placeholder="Languages"
//                   styles={{
//                     control: (provided) => ({
//                       ...provided,
//                       padding: "7px 0 7px 12px"
//                     })
//                   }}
//                 />
//               </div>
//               <div className="md:flex gap-10">
//                 <Select
//                   className="w-full md:w-1/2 mb-14"
//                   defaultValue={selectedOption}
//                   onChange={setSelectedOption}
//                   options={options}
//                   isMulti
//                   placeholder="Appointments"
//                   styles={{
//                     control: (provided) => ({
//                       ...provided,
//                       padding: "7px 0 7px 12px"
//                     })
//                   }}
//                 />
//                 <Select
//                   className="w-full md:w-1/2 mb-14"
//                   defaultValue={selectedOption}
//                   onChange={setSelectedOption}
//                   options={options}
//                   isMulti
//                   placeholder="Professions"
//                   styles={{
//                     control: (provided) => ({
//                       ...provided,
//                       padding: "7px 0 7px 12px"
//                     })
//                   }}
//                 />
//               </div>
//               <div className="md:flex gap-10">
//                 <Select
//                   className="w-full md:w-1/2 mb-14"
//                   defaultValue={selectedOption}
//                   onChange={setSelectedOption}
//                   options={options}
//                   isMulti
//                   placeholder="Mode"
//                   styles={{
//                     control: (provided) => ({
//                       ...provided,
//                       padding: "7px 0 7px 12px"
//                     })
//                   }}
//                 />
//                 <Select
//                   className="w-full md:w-1/2 mb-14"
//                   defaultValue={selectedOption}
//                   onChange={setSelectedOption}
//                   options={options}
//                   isMulti
//                   placeholder="Spacialties"
//                   styles={{
//                     control: (provided) => ({
//                       ...provided,
//                       padding: "7px 0 7px 12px"
//                     })
//                   }}
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="block mt-[32px] font-bold text-base text-white bg-[#82C29B] rounded-[1.563rem] pt-[15px] pr-[15px] pb-[14px] pl-4"
//               >
//                 UPDATE
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

"use client";
import React, { useState, useEffect, useRef } from "react";
import "../../../styles/_account.scss";
import ProviderUpdate from "@/components/providerUpdate";
const ProfileUpdate = ({ params }) => {
  return (
    <>
      <section className="relative">
        <div className="max-w-full overflow-hidden">
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
            <div className=" min-h-screen relative z-2 mt-20 pt-[100px] pb-[100px]">
              <div className="container ml-auto px-4 mr-0">
                <div className="">
                  {/* <Navbar avatar={specialtyIcon} avatarName="sooraj" /> */}
                  <ProviderUpdate id={params.id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileUpdate;
