"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "@/helpers/axios";
import Select from "react-select";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import "../styles/style.scss";
import { useRouter } from "next/navigation";

const AgeCategorySelect = ({ handleSetFormValue, options }) => {
  const [selectedOptions, setSelectedOptions] = useState(null);

  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    handleSetFormValue("age_category", selectedOptions);
  };

  return (
    <Select
      options={options.map((category) => ({
        value: category._id,
        label: category.name
      }))}
      isMulti
      value={selectedOptions}
      onChange={handleChange}
      placeholder="Select Age Category"
      styles={{
        control: (provided) => ({
          ...provided,
          padding: "7px 0 7px 12px",
          border: "1px solid #82C29B",
          borderRadius: "8px"
        })
      }}
    />
  );
};

const PaymentModesSelect = ({ handleSetFormValue, options }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    handleSetFormValue("acceptable_pay_modes", selectedOption);
  };

  return (
    <Select
      options={options.map((i) => ({ label: i.name, value: i._id }))}
      isMulti
      value={selectedOption}
      onChange={handleChange}
      placeholder="Select Payment Mode"
      styles={{
        control: (provided) => ({
          ...provided,
          padding: "7px 0 7px 12px",
          border: "1px solid #82C29B",
          borderRadius: "8px"
        })
      }}
    />
  );
};

const SpecializationSelect = ({ options, handleSetFormValue }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    handleSetFormValue("specialization", selectedOption);
  };

  return (
    <Select
      options={options.map((i) => ({ label: i.name, value: i._id }))}
      isMulti
      value={selectedOption}
      onChange={handleChange}
      placeholder="Select Specialization"
      styles={{
        control: (provided) => ({
          ...provided,
          padding: "7px 0 7px 12px",
          border: "1px solid #82C29B",
          borderRadius: "8px"
        })
      }}
    />
  );
};

const TagSelect = ({ handleSetFormValue, selectedTag, setSelectedTag }) => {
  const options = [
    { value: "available", label: "Available" },
    { value: "featured", label: "Featured" },
    { value: "short wait list", label: "Short Wait List" },
    { value: "long wait list", label: "Long Wait List" }
  ];

  const handleChange = (selectedOption) => {
    setSelectedTag(selectedOption);
    handleSetFormValue("tag", selectedOption.value);
  };

  return (
    <Select
      options={options}
      value={selectedTag}
      onChange={handleChange}
      placeholder="Select Tag"
      styles={{
        control: (provided) => ({
          ...provided,
          padding: "7px 0 7px 12px",
          border: "1px solid #82C29B",
          borderRadius: "8px"
        })
      }}
    />
  );
};

const ProviderRegister = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [ageCategoryError, setAgeCategoryError] = useState("");
  const [selectedAgeCategory, setSelectedAgeCategory] = useState(null);
  const [selectedSpecializations, setSelectedSpecializations] = useState(null);
  const [selectedPaymentModes, setSelectedPaymentModes] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectBoxValues, setSelectBoxValues] = useState({
    specializationOptions: [],
    acceptablepaymodesOptions: [],
    ageCategoryOptions: []
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    trigger
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

  const fetchAgeCategory = async () => {
    const result = await axios
      .get("provider/get-age-categories")
      .then((res) => res)
      .catch((err) => err);
    if (result?.data?.status) {
      setSelectBoxValues((prev) => ({
        ...prev,
        ageCategoryOptions: result?.data?.data || []
      }));
    }
  };

  useEffect(() => {
    fetchSpecializations();
    fetchPaymentModes();
    fetchAgeCategory();
  }, []);

  const onSubmit = async (data) => {
    console.log(data.profilePicture[0]);
    try {
      setIsLoading(true);

      const isValid = await trigger();
      if (!isValid) {
        setIsLoading(false);
        return;
      }

      const profilePic = data.profilePicture[0];
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
      formDataWithImage.append("password", data.password);
      formDataWithImage.append("confirm_password", data.confirmPassword);
      formDataWithImage.append("tag", data.tag);
      formDataWithImage.append("image", profilePic);

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
        data.age_category.forEach((item) => {
          formDataWithImage.append("age_category[]", item);
        });
      }

      const response = await axios.post(
        "provider/register-provider",
        formDataWithImage,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );
      setStatusMessage("Sign up completed successfully!");
      reset();
      setSelectedAgeCategory(null);
      setSelectedSpecializations(null);
      setSelectedPaymentModes(null);
      setSelectedTag(null);
      router.push("/sign-in");
    } catch (error) {
      if (error.response) {
        setStatusMessage(error.response.data.message);
      } else {
        setStatusMessage("Something went wrong. Please try again later.");
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="sign p-5 md:py-12 md:px-12 bg-white">
      <div>
        {/* <h2 className="text-3xl font-semibold mb-4 text-center">Sign Up</h2> */}

        <form onSubmit={handleSubmit(onSubmit)} className="text-[#828282]">
          <div className="flex justify-between items-end flex-wrap gap-4 pb-8 md:pb-16">
            {/* Change Photo button */}
            <div className="flex flex-col md:w-[28%] w-full items-center">
              {profilePicture !== null ? (
                <div className="mt-2">
                  <img
                    src={URL.createObjectURL(profilePicture)}
                    alt="Profile Picture"
                    className="rounded-full w-24 h-24 mx-auto"
                  />
                </div>
              ) : (
                <figure className="overflow-hidden w-[132px] h-[132px] rounded-full bg-white border border-solid border-[#018893] mb-4">
                  {/* <div className="overflow-hidden rounded-full m-1"> */}
                  <img
                    src="images/place-holder.png"
                    className="overflow-hidden rounded-full w-full h-full object-cover"
                  />
                  {/* </div> */}
                </figure>
              )}

              <input
                type="file"
                id="profilePicture"
                name="profilePicture"
                // onChange={handleFileInputChange}
                {...register("profilePicture", {
                  required: true,
                  onChange: handleFileInputChange
                })}
                accept="image/png, image/jpeg, image/jpg"
                className="hidden"
              />
              <button
                type="button"
                onClick={() =>
                  document.getElementById("profilePicture").click()
                }
                className="upload-btn mt-1 block w-fit text-white bg-[#018893] rounded-full px-4 py-2 focus:outline-none focus:border-[#018893] focus:ring-1"
              >
                Upload Photo
              </button>

              {errors?.profilePicture && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className="flex flex-col md:w-[68%] w-full">
              <label
                htmlFor="name"
                className="text-[#018893] text-[20px] md:text-[28px] font-medium pb-3"
              >
                About Me
              </label>
              <textarea
                {...register("bio", { required: true })}
                id="bio"
                name="bio"
                placeholder="Tell something about your self"
                className="mt-1 block w-full border border-solid border-[#82C29B] rounded-lg shadow-sm px-4 py-3 focus:outline-none focus:border-[#018893] focus:ring-1 h-40"
              ></textarea>
              {errors?.bio && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-[#018893]">
                Name<span className="text-red-500">&thinsp;*</span>
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full border border-solid border-[#82C29B] rounded-lg shadow-sm px-4 py-3 focus:outline-none focus:border-[#018893] focus:ring-1"
              />
              {errors.name && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-[#018893]">
                Email Address<span className="text-red-500">&thinsp;*</span>
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full border border-solid border-[#82C29B] rounded-lg shadow-sm px-4 py-3 focus:outline-none focus:border-[#018893] focus:ring-1"
              />
              {errors.email && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone" className="text-[#018893]">
                Phone Number<span className="text-red-500">&thinsp;*</span>
              </label>
              <input
                {...register("phone", { required: true })}
                type="tel"
                id="phone"
                name="phone"
                className="mt-1 block w-full border border-solid border-[#82C29B] rounded-lg shadow-sm px-4 py-3 focus:outline-none focus:border-[#018893] focus:ring-1"
              />
              {errors.phone && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="designation" className="text-[#018893]">
                Designation<span className="text-red-500">&thinsp;*</span>
              </label>
              <input
                {...register("designation", { required: true })}
                type="text"
                id="designation"
                name="designation"
                className="mt-1 block w-full border border-solid border-[#82C29B] rounded-lg shadow-sm px-4 py-3 focus:outline-none focus:border-[#018893] focus:ring-1"
              />
              {errors.designation && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="qualification" className="text-[#018893]">
                Qualification<span className="text-red-500">&thinsp;*</span>
              </label>
              <input
                {...register("qualification", { required: true })}
                type="text"
                id="qualification"
                name="qualification"
                className="mt-1 block w-full border border-solid border-[#82C29B] rounded-lg shadow-sm px-4 py-3 focus:outline-none focus:border-[#018893] focus:ring-1"
              />
              {errors.qualification && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="location" className="text-[#018893]">
                Location<span className="text-red-500">&thinsp;*</span>
              </label>
              <input
                {...register("location", { required: true })}
                type="text"
                id="location"
                name="location"
                className="mt-1 block w-full border border-solid border-[#82C29B] rounded-lg shadow-sm px-4 py-3 focus:outline-none focus:border-[#018893] focus:ring-1"
              />
              {errors.location && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="state" className="text-[#018893]">
                State<span className="text-red-500">&thinsp;*</span>
              </label>
              <input
                {...register("state", { required: true })}
                type="text"
                id="state"
                name="state"
                className="mt-1 block w-full border border-solid border-[#82C29B] rounded-lg shadow-sm px-4 py-3 focus:outline-none focus:border-[#018893] focus:ring-1"
              />
              {errors.state && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="city" className="text-[#018893]">
                City<span className="text-red-500">&thinsp;*</span>
              </label>
              <input
                {...register("city", { required: true })}
                type="text"
                id="city"
                name="city"
                className="mt-1 block w-full border border-solid border-[#82C29B] rounded-lg shadow-sm px-4 py-3 focus:outline-none focus:border-[#018893] focus:ring-1"
              />
              {errors.city && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="zipCode" className="text-[#018893]">
                Zip Code<span className="text-red-500">&thinsp;*</span>
              </label>
              <input
                {...register("zipCode", { required: true })}
                type="text"
                id="zipCode"
                name="zipCode"
                className="mt-1 block w-full border border-solid border-[#82C29B] rounded-lg shadow-sm px-4 py-3 focus:outline-none focus:border-[#018893] focus:ring-1"
              />
              {errors.zipCode && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="ageCategory" className="text-[#018893]">
                Age Category<span className="text-red-500">&thinsp;*</span>
              </label>
              <AgeCategorySelect
                options={selectBoxValues.ageCategoryOptions}
                handleSetFormValue={handleSetFormValue}
              />
              {errors.age_category && (
                <span className="text-red-500">Age category is required</span>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="specialization" className="text-[#018893]">
                Specialization<span className="text-red-500">&thinsp;*</span>
              </label>
              <SpecializationSelect
                options={selectBoxValues.specializationOptions}
                handleSetFormValue={handleSetFormValue}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="paymentModes" className="text-[#018893]">
                Payment Modes<span className="text-red-500">&thinsp;*</span>
              </label>
              <PaymentModesSelect
                options={selectBoxValues.acceptablepaymodesOptions}
                handleSetFormValue={handleSetFormValue}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="username" className="text-[#018893]">
                Username<span className="text-red-500">&thinsp;*</span>
              </label>
              <input
                {...register("username", { required: true })}
                type="text"
                id="username"
                name="username"
                className="mt-1 block w-full border border-solid border-[#82C29B] rounded-lg shadow-sm px-4 py-3 focus:outline-none focus:border-[#018893] focus:ring-1"
              />
              {errors?.username && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="text-[#018893]">
                Password<span className="text-red-500">&thinsp;*</span>
              </label>
              <div className="relative">
                <input
                  {...register("password", { required: true })}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="mt-1 block w-full border border-solid border-[#82C29B] rounded-lg outline-none shadow-sm px-4 py-3 focus:outline-none focus:border-[#018893] focus:ring-1 text-black"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 hover:bg-transparent"
                  onClick={handleTogglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors?.password && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="confirmPassword" className="text-[#018893]">
                Confirm Password<span className="text-red-500">&thinsp;*</span>
              </label>

              <div className="relative">
                <input
                  {...register("confirmPassword", { required: true })}
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  className="mt-1 block w-full border border-solid border-[#82C29B] rounded-lg outline-none shadow-sm px-4 py-3 focus:outline-none focus:border-[#018893] focus:ring-1 text-black"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 hover:bg-transparent"
                  onClick={handleToggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors?.confirmPassword && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="tag" className="text-[#018893]">
                Availability<span className="text-red-500">&thinsp;*</span>
              </label>
              <TagSelect
                setSelectedTag={setSelectedTag}
                selectedTag={selectedTag}
                handleSetFormValue={handleSetFormValue}
              />
              {errors?.tag && <span>This field is required</span>}
            </div>

            <div className="flex md:col-span-2 items-center justify-center lg:justify-end mt-6">
              <button
                type="submit"
                className="btn"
                id="SubmitBtn"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Sign Up"}
              </button>
            </div>
          </div>
        </form>
        {statusMessage && (
          <div
            className={
              statusMessage.includes("success")
                ? "text-green-600"
                : "text-red-600"
            }
          >
            {statusMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderRegister;
