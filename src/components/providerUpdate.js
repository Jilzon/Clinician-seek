"use client";
import React, { useEffect, useState, useRef, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "@/helpers/axios";
import Select from "react-select";
import Banner from "@/components/Banner/Banner";
import convertBase64 from "./convertToBase64";
import { useRouter } from "next/navigation";
import { contextParams } from "./contextCreator/contextCreator";
const AgeCategorySelect = ({ handleSetFormValue, options, defaultValue }) => {
  // const options = [
  //   { value: "under18", label: "Under 18" },
  //   { value: "18to30", label: "18 to 30" },
  //   { value: "31to50", label: "31 to 50" },
  //   { value: "over50", label: "Over 50" }
  // ];

  const [selectedOption, setSelectedOption] = useState(null);
  useEffect(() => {
    if (defaultValue) {
      // defaultValue = options[0];
      setSelectedOption(defaultValue);
    }
  }, [defaultValue]);
  const handleChange = (selectedOption) => {
    console.log(selectedOption, "selected age");
    setSelectedOption(selectedOption);
    handleSetFormValue("age_category", selectedOption);
  };

  return (
    <Select
      required
      options={options.map((i) => ({ label: i.name, value: i._id }))}
      isMulti
      value={selectedOption}
      onChange={handleChange}
      placeholder="Select Age Category"
      styles={{
        control: (provided) => ({
          ...provided,
          padding: "7px 0 7px 12px"
        })
      }}
    />
  );
};

const PaymentModesSelect = ({ handleSetFormValue, options, defaultValue }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  useEffect(() => {
    if (defaultValue) {
      setSelectedOption(defaultValue);
    }
  }, [defaultValue]);
  const handleChange = (selectedOption) => {
    console.log(selectedOption, "selected 2");
    setSelectedOption(selectedOption);
    handleSetFormValue("acceptable_pay_modes", selectedOption);
  };

  return (
    <Select
      required
      options={options.map((i) => ({ label: i.name, value: i._id }))}
      isMulti
      value={selectedOption}
      onChange={handleChange}
      placeholder="Select Payment Mode"
      styles={{
        control: (provided) => ({
          ...provided,
          padding: "7px 0 7px 12px"
        })
      }}
    />
  );
};

const SpecializationSelect = ({
  options,
  handleSetFormValue,
  defaultValue
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selectedOption) => {
    console.log(selectedOption, "selected 2");
    setSelectedOption(selectedOption);
    handleSetFormValue("specialization", selectedOption);
  };
  useEffect(() => {
    if (defaultValue) {
      setSelectedOption(defaultValue);
    }
  }, [defaultValue]);
  return (
    <Select
      required
      options={options.map((i) => ({ label: i.name, value: i._id }))}
      isMulti
      value={selectedOption}
      onChange={handleChange}
      placeholder="Select Specialization"
      styles={{
        control: (provided) => ({
          ...provided,
          padding: "7px 0 7px 12px"
        })
      }}
    />
  );
};

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

const ProviderUpdate = ({ id }) => {
  const profilePicture = useRef();
  const scrollTo = useRef();
  const router = useRouter();
  const { token, setToken } = useContext(contextParams);
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [details, setDetails] = useState({});
  const [openBannner, setOpenBanner] = useState(false);
  const [selectBoxValues, setSelectBoxValues] = useState({
    specializationOptions: [],
    acceptablepaymodesOptions: [],
    agecategoryOptions: []
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm({ mode: "onBlur" });
  const handleSetFormValue = (source, value) => {
    setValue(source, Array.isArray(value) ? value.map((i) => i.value) : value);
  };

  const fetchSpecializations = async () => {
    const result = await axios
      .get("provider/get-specializations")
      .then((res) => res)
      .catch((err) => err);
    if (result?.data?.status) {
      setSelectBoxValues((prev) => ({
        ...prev,
        specializationOptions: result?.data?.data || []
      }));
    }
  };

  const fetchPaymentModes = async () => {
    const result = await axios
      .get("provider/get-pay-modes")
      .then((res) => res)
      .catch((err) => err);
    if (result?.data?.status) {
      setSelectBoxValues((prev) => ({
        ...prev,
        acceptablepaymodesOptions: result?.data?.data || []
      }));
    }
  };
  const fetchAgeCategories = async () => {
    const result = await axios
      .get("provider/get-age-categories")
      .then((res) => res)
      .catch((err) => err);
    if (result?.data?.status) {
      setSelectBoxValues((prev) => ({
        ...prev,
        agecategoryOptions: result?.data?.data || []
      }));
    }
  };
  useEffect(() => {
    fetchSpecializations();
    fetchPaymentModes();
    fetchAgeCategories();
  }, []);
  useEffect(() => {
    if (id) {
      if (token == null) {
        router.push("/sign-in");
      } else {
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
      }
    }
  }, [id]);

  const handleFileInputChange = async (e) => {
    console.log(e);
    const file = e.target.files[0];
    if (e) {
      const base64 = await convertBase64(file);
      setProfileImage(base64);
      setProfilePic(file);
    }
  };

  const onSubmit = (data) => {
    try {
      let formDataWithImage = new FormData();
      formDataWithImage.append("name", data.name);
      formDataWithImage.append("email", data.email);
      formDataWithImage.append("phone_no", data.phone);
      formDataWithImage.append("designation", data.designation);
      formDataWithImage.append("qualification", data.qualification);
      formDataWithImage.append("location", data.location);
      formDataWithImage.append("state", data.state);
      formDataWithImage.append("city", data.city);
      formDataWithImage.append("zipCode", data.zipCode);
      formDataWithImage.append("bio", data.bio);
      formDataWithImage.append("user_name", data.username);
      if (data.password !== "" && data.password == data.confirmPassword) {
        formDataWithImage.append("change_password", true);
        formDataWithImage.append("password", data.password);
        formDataWithImage.append("confirm_password", data.confirmPassword);
      } else {
        formDataWithImage.append("change_password", false);
      }

      formDataWithImage.append("tag", data.tag);

      console.log(data, "data");

      if (Array.isArray(data.specialization)) {
        data.specialization.forEach((item) => {
          formDataWithImage.append("specialization[]", item);
        });
      }
      if (Array.isArray(data.acceptable_pay_modes)) {
        data.acceptable_pay_modes.forEach((item) => {
          formDataWithImage.append("acceptable_pay_modes[]", item);
        });
      }
      if (Array.isArray(data.age_category)) {
        if (data.age_category.length > 0) {
          data.age_category.forEach((item) => {
            formDataWithImage.append("age_category[]", item);
          });
        }
      }

      if (profilePic) {
        formDataWithImage.append("image", profilePic);
      }

      axios
        .post(`provider/update-provider-details/${id}`, formDataWithImage, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(function (response) {
          setStatusMessage(response.data.message);
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

      // setStatusMessage("Sign up completed successfully!");
      // setValue("name", "");
      // setValue("email", "");
      // setValue("phone", "");
      // setValue("designation", "");
      // setValue("qualification", "");
      // setValue("location", "");
      // setValue("state", "");
      // setValue("city", "");
      // setValue("zipCode", "");
      // setValue("bio", "");
      // setValue("username", "");
      // setValue("password", "");
      // setValue("confirmPassword", "");
    } catch (error) {
      if (error.response) {
        setStatusMessage(error.response.data.message);
      } else {
        setStatusMessage("Something went wrong. Please try again later.");
      }
      console.error(error);
    }
  };

  return (
    <>
      <Banner
        autoHide
        active={openBannner}
        closeBanner={setOpenBanner}
        bannerContent={statusMessage}
        customClass="mt-8"
      />
      <div ref={scrollTo} className="sign p-5 md:py-12 md:px-12 shadow-lg">
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="text-[#828282]">
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
                  defaultValue={details?.name}
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
                  defaultValue={details?.email}
                  {...register("email", { required: true })}
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full border border-solid border-gray-300 rounded-md shadow-sm px-4 py-3 focus:outline-none focus:border-[#018893] focus:ring-1"
                />
                {errors?.email && <span>{errors?.email?.message}</span>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="phone" className="text-clr_nav">
                  Phone Number*<span className="text-red-500">&thinsp;</span>
                </label>
                <input
                  defaultValue={details?.mobile_no}
                  {...register("phone", { required: true })}
                  type="tel"
                  id="phone"
                  name="phone"
                  className="mt-1 block w-full border border-solid border-gray-300 rounded-md shadow-sm px-4 py-3 focus:outline-none focus:border-[#018893] focus:ring-1"
                />
                {errors?.phone && <span>This field is required</span>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="designation" className="text-clr_nav">
                  Designation*<span className="text-red-500">&thinsp;</span>
                </label>
                <input
                  defaultValue={details?.provider?.designation}
                  {...register("designation", { required: true })}
                  type="text"
                  id="designation"
                  name="designation"
                  className="mt-1 block w-full border border-solid border-gray-300 rounded-md shadow-sm px-4 py-3 focus:outline-none focus:border-[#018893] focus:ring-1"
                />
                {errors?.designation && <span>This field is required</span>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="qualification" className="text-clr_nav">
                  Qualification*
                  <span className="text-red-500">&thinsp;</span>
                </label>
                <input
                  defaultValue={details?.provider?.qualification}
                  {...register("qualification", { required: true })}
                  type="text"
                  id="qualification"
                  name="qualification"
                  className="mt-1 block w-full border border-solid border-gray-300 rounded-md shadow-sm px-4 py-3 focus:outline-none focus:border-[#018893] focus:ring-1"
                />
                {errors?.qualification && <span>This field is required</span>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="location" className="text-clr_nav">
                  Location*<span className="text-red-500">&thinsp;</span>
                </label>
                <input
                  defaultValue={details?.provider?.location}
                  {...register("location", { required: true })}
                  type="text"
                  id="location"
                  name="location"
                  className="mt-1 block w-full border border-solid border-gray-300 rounded-md shadow-sm px-4 py-3 focus:outline-none focus:border-[#018893] focus:ring-1"
                />
                {errors?.location && <span>This field is required</span>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="state" className="text-clr_nav">
                  State*<span className="text-red-500">&thinsp;</span>
                </label>
                <input
                  defaultValue={details?.provider?.state}
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
                  defaultValue={details?.provider?.city}
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
                  Zip Code*<span className="text-red-500">&thinsp;</span>
                </label>
                <input
                  defaultValue={details?.provider?.zipCode}
                  {...register("zipCode", { required: true })}
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  className="mt-1 block w-full border border-solid border-gray-300 rounded-md shadow-sm px-4 py-3 focus:outline-none focus:border-[#018893] focus:ring-1"
                />
                {errors?.zipCode && <span>This field is required</span>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="ageCategory" className="text-clr_nav">
                  Age Category*<span className="text-red-500">&thinsp;</span>
                </label>
                <AgeCategorySelect
                  options={selectBoxValues.agecategoryOptions}
                  handleSetFormValue={handleSetFormValue}
                  defaultValue={details?.provider?.age_category?.map((i) => ({
                    label: i.name,
                    value: i._id
                  }))}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="specialization" className="text-clr_nav">
                  Specialization*
                  <span className="text-red-500">&thinsp;</span>
                </label>
                <SpecializationSelect
                  options={selectBoxValues.specializationOptions}
                  handleSetFormValue={handleSetFormValue}
                  defaultValue={details?.provider?.specialization?.map((i) => ({
                    label: i.name,
                    value: i._id
                  }))}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="paymentModes" className="text-clr_nav">
                  Payment Modes*
                  <span className="text-red-500">&thinsp;</span>
                </label>
                <PaymentModesSelect
                  defaultValue={details?.provider?.acceptable_pay_modes?.map(
                    (i) => ({
                      label: i.name,
                      value: i._id
                    })
                  )}
                  options={selectBoxValues.acceptablepaymodesOptions}
                  handleSetFormValue={handleSetFormValue}
                />
              </div>
              <div className="flex flex-col md:col-span-2">
                <label htmlFor="bio" className="text-clr_nav">
                  Bio*<span className="text-red-500">&thinsp;</span>
                </label>
                <textarea
                  defaultValue={details?.provider?.bio}
                  {...register("bio", { required: false })}
                  id="bio"
                  name="bio"
                  className="mt-1 block w-full border border-solid border-gray-300 rounded-md shadow-sm px-4 py-3 focus:outline-none focus:border-[#018893] focus:ring-1 h-32"
                ></textarea>
                {errors?.bio && <span>This field is required</span>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="username" className="text-clr_nav">
                  Username*<span className="text-red-500">&thinsp;</span>
                </label>
                <input
                  defaultValue={details?.user_name}
                  {...register("username", { required: false })}
                  type="text"
                  id="username"
                  name="username"
                  className="mt-1 block w-full border border-solid border-gray-300 rounded-md shadow-sm px-4 py-3 focus:outline-none focus:border-[#018893] focus:ring-1"
                />
                {errors?.username && <span>This field is required</span>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="tag" className="text-clr_nav">
                  Tag*<span className="text-red-500">&thinsp;</span>
                </label>
                <TagSelect
                  handleSetFormValue={handleSetFormValue}
                  defaultValue={details?.provider?.tag}
                />
                {errors?.tag && <span>This field is required</span>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="password" className="text-clr_nav">
                  Password<span className="text-red-500">&thinsp;</span>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  {...register("password", { required: false })}
                  className="mt-1 block w-full border border-solid border-gray-300 rounded-md shadow-sm px-4 py-3 focus:outline-none focus:border-[#018893] focus:ring-1"
                />
                {/* {errors?.password && <span>This field is required</span>} */}
              </div>
              <div className="flex flex-col">
                <label htmlFor="confirmPassword" className="text-clr_nav">
                  Confirm Password
                  <span className="text-red-500">&thinsp;</span>
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  {...register("confirmPassword", { required: false })}
                  className="mt-1 block w-full border border-solid border-gray-300 rounded-md shadow-sm px-4 py-3 focus:outline-none focus:border-[#018893] focus:ring-1"
                />
                {/* {errors?.confirmPassword && <span>This field is required</span>} */}
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
    </>
  );
};

export default ProviderUpdate;
