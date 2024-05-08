"use client";
import React, { useState, useEffect, useRef } from "react";
import "../../../styles/_account.scss";
import { useForm } from "react-hook-form";
import axios from "@/helpers/axios";
import Banner from "@/components/Banner/Banner";
import Select from "react-select";
import convertBase64 from "@/components/convertToBase64";
const TagSelect = ({ handleSetFormValue, defaultValue }) => {
  const options = [
    { value: "available", label: "Available" },
    { value: "featured", label: "Featured" },
    { value: "short wait list", label: "Short Wait List" },
    { value: "long wait list", label: "Long Wait List" }
  ];

  const [selectedOption, setSelectedOption] = useState(null);
  useEffect(() => {
    if (defaultValue) {
      var filteredTag = options.filter((f) => f.value == defaultValue);
      setSelectedOption(filteredTag[0]);
    }
  }, [defaultValue]);
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    handleSetFormValue("tag", selectedOption.value);
  };

  return (
    <Select
      required
      options={options}
      value={selectedOption}
      onChange={handleChange}
      placeholder="Select Tag"
      styles={{
        control: (provided) => ({
          ...provided,
          padding: "7px 0 7px 12px"
        })
      }}
    />
  );
};
const ClinicUpdate = ({ params }) => {
  const profilePicture = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm({ mode: "onBlur" });

  const [profileImage, setProfileImage] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [details, setDetails] = useState({});
  const [providers, setProviders] = useState([]);
  const [filterPageNumber, setFilterPageNumber] = useState(1);
  const [filterPageLimit, setFilterPageLimit] = useState(10);
  const [filterNextPage, setFilterNextPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [message, setMessage] = useState("");
  const [openBannner, setOpenBanner] = useState(false);
  const handleSetFormValue = (source, value) => {
    setValue(source, Array.isArray(value) ? value.map((i) => i.value) : value);
  };

  useEffect(() => {
    if (params.id) {
      axios
        .get(`clinic/get-clinic-details/${params.id}`)
        .then(function (response) {
          setDetails(response.data.clinic);
          var checkImage = response?.data?.clinic?.image_url;
          if (checkImage && checkImage !== "") {
            setProfileImage(response.data.clinic.image_url);
          }

          var resetObject = {
            name: response?.data?.clinic?.name,
            email: response?.data?.clinic?.email,
            note: response?.data?.clinic?.note,
            state: response?.data?.clinic?.state,
            city: response?.data?.clinic?.city,
            zipCode: response?.data?.clinic?.zipCode,
            tag: response?.data?.clinic?.tag,
            details: response?.data?.clinic?.details,
            address: response?.data?.clinic?.address,
            phone_no: response?.data?.clinic?.phone_no,
            website: response?.data?.clinic?.website
          };

          reset(resetObject);
        })
        .catch(function (error) {});
    }
  }, [params.id]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `provider/get-provider-listing/?page_no=${filterPageNumber}&page_limit=${filterPageLimit}`
      )
      .then(function (response) {
        setFilterNextPage(response.data.pagination.next_page);
        if (response.data.pagination.next_page !== null) {
          setFilterPageNumber(response.data.pagination.next_page);
        }
        setProviders(
          response?.data?.data?.map((item) => ({
            value: item._id,
            label: item.name
          }))
        );
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  }, []);
  const onSubmit = (data) => {
    try {
      let formDataWithImage = new FormData();
      formDataWithImage.append("name", data.name);
      formDataWithImage.append("email", data.email);
      formDataWithImage.append("website", data.website);
      formDataWithImage.append("note", data.note);
      formDataWithImage.append("address", data.address);
      formDataWithImage.append("tag", data.tag);
      formDataWithImage.append("state", data.state);
      formDataWithImage.append("city", data.city);
      formDataWithImage.append("zipCode", data.zipCode);
      formDataWithImage.append("details", data.details);
      formDataWithImage.append("phone_no", data.phone_no);

      console.log(data, "data");

      if (profilePic) {
        formDataWithImage.append("image", profilePic);
      }

      axios
        .post(`provider/update-provider-details/${id}`, formDataWithImage, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(function (response) {
          setOpenBanner(true);
          scrollTo.current.scrollIntoView({ behavior: "smooth" });
          setLoading(true);
          axios
            .get(`provider/get-provider-details/${id}`)
            .then(function (response) {
              setDetails(response.data.user);
              var checkImage = response?.data?.user?.profile_pic_url;
              if (checkImage && checkImage !== "") {
                setProfileImage(response.data.user.profile_pic_url);
              }

              var resetObject = {
                name: response?.data?.user?.name,
                email: response?.data?.user?.email,
                phone: response?.data?.user?.mobile_no,
                designation: response?.data?.user?.provider?.designation,
                qualification: response?.data?.user?.provider?.qualification,
                location: response?.data?.user?.provider?.location,
                state: response?.data?.user?.provider?.state,
                city: response?.data?.user?.provider?.city,
                zipCode: response?.data?.user?.provider?.zipCode,
                bio: response?.data?.user?.provider?.bio,
                username: response?.data?.user?.user_name,
                tag: response?.data?.user?.provider?.tag,
                specialization:
                  response?.data?.user?.provider?.specialization?.map(
                    (item) => item._id
                  ),
                acceptable_pay_modes:
                  response?.data?.user?.provider?.acceptable_pay_modes?.map(
                    (item) => item._id
                  ),
                age_category: response?.data?.user?.provider?.age_category?.map(
                  (item) => item._id
                )
              };

              reset(resetObject);
              setLoading(false);
            })
            .catch(function (error) {});
        });
    } catch (error) {
      console.error(error);
    }
  };
  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    if (e) {
      const base64 = await convertBase64(file);
      setProfileImage(base64);
      setProfilePic(file);
    }
  };
  const handlePagination = (e) => {
    if (filterNextPage !== null) {
      setLoading(true);
      axios
        .get(
          `provider/get-provider-listing/?page_no=${filterPageNumber}&page_limit=${filterPageLimit}`
        )
        .then(function (response) {
          setFilterNextPage(response.data.pagination.next_page);
          if (response.data.pagination.next_page !== null) {
            setFilterPageNumber(response.data.pagination.next_page);
          }
          setProviders([
            ...providers,
            ...response?.data?.data?.map((item) => ({
              value: item._id,
              label: item.name
            }))
          ]);
          setLoading(false);
        })
        .catch(function (error) {
          setLoading(false);
          console.log(error);
        });
    }
  };

  const handleInvitation = (e) => {
    e.preventDefault();
    if (selectedProvider !== null) {
      axios
        .post(
          `clinic/invite-provider-to-clinic`,
          JSON.stringify({
            user_id: selectedProvider.value,
            clinic_id: params.id,
            invited_as: "provider"
          })
        )
        .then(function (response) {
          setMessage(response.data.message);
          setOpenBanner(true);
        })
        .catch(function (error) {
          setMessage(error.response.data.message);
          setOpenBanner(true);
          console.log(error);
        });
    }
  };
  const handleProviders = (e) => {
    setSelectedProvider(e);
  };
  const tagOptions = [
    { value: "available", label: "Available" },
    { value: "featured", label: "Featured" },
    { value: "short wait list", label: "Short Wait List" },
    { value: "long wait list", label: "Long Wait List" }
  ];

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
              <Banner
                autoHide
                active={openBannner}
                closeBanner={setOpenBanner}
                bannerContent={message}
                customClass="mt-8"
              />
              <div className="container ml-auto px-4 mr-0">
                <div className="sign p-5 md:py-12 md:px-12 shadow-lg">
                  <div className="w-full mb-10">
                    <div>
                      <form
                        className="flex flex-col md:flex-row items-center gap-5 justify-end"
                        onSubmit={handleInvitation}
                      >
                        <Select
                          required
                          isSearchable
                          placeholder="Select provider"
                          options={providers}
                          isClearable
                          isLoading={loading}
                          maxMenuHeight={200}
                          onMenuScrollToBottom={handlePagination}
                          value={selectedProvider}
                          onChange={(e) => handleProviders(e)}
                          styles={{
                            option: (styles) => {
                              // const color = chroma(data.color);

                              return {
                                ...styles,
                                color: "#1C3C70"
                              };
                            },
                            control: (provided) => ({
                              ...provided,
                              padding: "8px 16px"
                            })
                          }}
                          // components={{
                          //   MenuList: ({ children, ...props }) => (
                          //     <span>{children}</span>
                          //   )
                          // }}
                        />
                        <div>
                          <button type="submit" className="btn">
                            Send Invitation
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="text-[#828282]"
                  >
                    <div className="w-full text-center pb-12">
                      <button
                        type="button"
                        onClick={() => profilePicture.current.click()}
                      >
                        {profileImage !== null ? (
                          <figure className="overflow-hidden p-1 w-[132px] h-[132px] rounded-full bg-white border border-solid border-[#018893]">
                            <img
                              src={profileImage}
                              className="overflow-hidden rounded-full w-full h-full object-cover"
                            />
                          </figure>
                        ) : (
                          <figure className="overflow-hidden w-[132px] h-[132px] rounded-full bg-white border border-solid border-[#018893]">
                            <img
                              src="/images/place-holder.png"
                              className="overflow-hidden rounded-full w-full h-full object-cover"
                            />
                          </figure>
                        )}
                      </button>
                      <input
                        ref={profilePicture}
                        type="file"
                        id="profile-pic"
                        name="profilePicture"
                        onChange={handleFileInputChange}
                        accept="image/png, image/jpeg, image/jpg"
                        className="hidden"
                      />
                    </div>
                    <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label htmlFor="name" className="text-clr_nav">
                          Name*<span className="text-red-500">&thinsp;</span>
                        </label>
                        <input
                          // defaultValue={details?.name}
                          {...register("name", { required: true })}
                          type="text"
                          id="name"
                          name="name"
                          className="mt-1 block w-full border border-solid border-gray-300 rounded-md shadow-sm px-4 py-3 focus:outline-none focus:border-[#018893] focus:ring-1"
                        />
                        {errors?.name && <span>This field is required</span>}
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="email" className="text-clr_nav">
                          Email Address*
                          <span className="text-red-500">&thinsp;</span>
                        </label>
                        <input
                          // defaultValue={details?.email}
                          {...register("email", { required: true })}
                          type="email"
                          id="email"
                          name="email"
                          className="mt-1 block w-full border border-solid border-gray-300 rounded-md shadow-sm px-4 py-3 focus:outline-none focus:border-[#018893] focus:ring-1"
                        />
                        {errors?.email && <span>{errors?.email?.message}</span>}
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="state" className="text-clr_nav">
                          State*<span className="text-red-500">&thinsp;</span>
                        </label>
                        <input
                          // defaultValue={details?.provider?.state}
                          {...register("state", { required: true })}
                          type="text"
                          id="state"
                          name="state"
                          className="mt-1 block w-full border border-solid border-gray-300 rounded-md shadow-sm px-4 py-3 focus:outline-none focus:border-[#018893] focus:ring-1"
                        />
                        {errors?.state && <span>This field is required</span>}
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="city" className="text-clr_nav">
                          City*<span className="text-red-500">&thinsp;</span>
                        </label>
                        <input
                          // defaultValue={details?.provider?.city}
                          {...register("city", { required: true })}
                          type="text"
                          id="city"
                          name="city"
                          className="mt-1 block w-full border border-solid border-gray-300 rounded-md shadow-sm px-4 py-3 focus:outline-none focus:border-[#018893] focus:ring-1"
                        />
                        {errors?.city && <span>This field is required</span>}
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="zipCode" className="text-clr_nav">
                          Zip Code*
                          <span className="text-red-500">&thinsp;</span>
                        </label>
                        <input
                          // defaultValue={details?.provider?.zipCode}
                          {...register("zipCode", { required: true })}
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          className="mt-1 block w-full border border-solid border-gray-300 rounded-md shadow-sm px-4 py-3 focus:outline-none focus:border-[#018893] focus:ring-1"
                        />
                        {errors?.zipCode && <span>This field is required</span>}
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="phone_no" className="text-clr_nav">
                          Phone*
                          <span className="text-red-500">&thinsp;</span>
                        </label>
                        <input
                          // defaultValue={details?.provider?.phone_no}
                          {...register("phone_no", { required: true })}
                          type="text"
                          id="phone_no"
                          name="phone_no"
                          className="mt-1 block w-full border border-solid border-gray-300 rounded-md shadow-sm px-4 py-3 focus:outline-none focus:border-[#018893] focus:ring-1"
                        />
                        {errors?.zipCode && <span>This field is required</span>}
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="zipCode" className="text-clr_nav">
                          Website*
                          <span className="text-red-500">&thinsp;</span>
                        </label>
                        <input
                          // defaultValue={details?.provider?.zipCode}
                          {...register("website", { required: true })}
                          type="text"
                          id="website"
                          name="website"
                          className="mt-1 block w-full border border-solid border-gray-300 rounded-md shadow-sm px-4 py-3 focus:outline-none focus:border-[#018893] focus:ring-1"
                        />
                        {errors?.website && <span>This field is required</span>}
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="tag" className="text-clr_nav">
                          Tag*
                          <span className="text-red-500">&thinsp;</span>
                        </label>
                        <TagSelect
                          defaultValue={details?.tag}
                          handleSetFormValue={handleSetFormValue}
                        />
                        {errors?.tag && <span>This field is required</span>}
                      </div>
                      <div className="flex flex-col md:col-span-2">
                        <label htmlFor="details" className="text-clr_nav">
                          Details<span className="text-red-500">&thinsp;</span>
                        </label>
                        <textarea
                          // defaultValue={details?.provider?.bio}
                          {...register("details", { required: true })}
                          id="details"
                          name="details"
                          className="mt-1 block w-full border border-solid border-gray-300 rounded-md shadow-sm px-4 py-3 focus:outline-none focus:border-[#018893] focus:ring-1 h-32"
                        ></textarea>
                        {errors?.details && <span>This field is required</span>}
                      </div>
                      <div className="flex flex-col md:col-span-2">
                        <label htmlFor="address" className="text-clr_nav">
                          Address*<span className="text-red-500">&thinsp;</span>
                        </label>
                        <textarea
                          // defaultValue={details?.provider?.bio}
                          {...register("address", { required: true })}
                          id="address"
                          name="address"
                          className="mt-1 block w-full border border-solid border-gray-300 rounded-md shadow-sm px-4 py-3 focus:outline-none focus:border-[#018893] focus:ring-1 h-32"
                        ></textarea>
                        {errors?.address && <span>This field is required</span>}
                      </div>

                      <div className="flex flex-col md:col-span-2 items-center">
                        <button type="submit" className="btn">
                          UPDATE
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ClinicUpdate;
