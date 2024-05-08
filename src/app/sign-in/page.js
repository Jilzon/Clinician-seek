"use client";
import React, { useState, useEffect, useContext } from "react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { useForm } from "react-hook-form";
import axios from "@/helpers/axios";
import LostPasswordForm from "@/components/lostPasswordForm";
import parseJwt from "@/library/parse-token";
import { useRouter } from "next/navigation";
import LogoList from "@/components/logoList";
import { contextParams } from "@/components/contextCreator/contextCreator";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: "onBlur" });
  const router = useRouter();
  const { token, setToken } = useContext(contextParams);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const logos = [
    "/images/bluecross.png",
    "/images/tricare.png",
    "/images/mhn.png",
    "/images/aetna.png"
  ];

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post("provider/login-provider", data);
      setMessage(response.data.message);
      const getToken = response?.data?.token;
      if (getToken) {
        const parsedToken = parseJwt(getToken);
        const userId = parsedToken?.id;
        if (userId) {
          setToken(getToken);
          router.push(`/provider-update/${userId}`, { shallow: true });
        }
      }
    } catch (error) {
      setMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleForgotPasswordSubmit = async () => {
    // Implement your logic to handle forgot password submission here
    // For demonstration, let's just log the email
    console.log("Forgot Password Email:", forgotPasswordEmail);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <section className="relative">
        <div className="max-w-full overflow-hidden">
          <div className="container relative">
          <div className="absolute -top-[26%] -left-[55%] sm:-left-[25%] sm:-top-[10%]">
            <svg
              width="1065"
              height="737"
              viewBox="0 0 1065 737"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M552.755 596.299C848.152 515.389 876.923 -142.316 596.142 -274.753C329.205 -400.659 -142.081 -31.509 -91.7988 242.021C-45.5099 493.826 369.405 646.519 552.755 596.299Z"
                fill="#D1F5C7"
              />
              <path
                d="M782.779 -125.265C619.781 -344.682 63.5522 -155.487 44.409 120.907C26.2098 383.672 485.884 655.947 697.041 525.503C891.427 405.419 883.951 10.9242 782.779 -125.265Z"
                stroke="#82C29B"
              />
            </svg>
          </div>

            <div className="flex justify-center items-center min-h-screen relative z-2 pt-[100px]">
              <div className="md:container md:ml-auto md:px-4 md:mr-0">
                <div className="max-w-xl mx-auto md:px-4 pt-[100px] pb-[100px]">
                  <div className="sign py-14 px-7 lg:px-20 shadow-xl">
                    <div>
                      {showForgotPassword ? (
                        <LostPasswordForm
                          onSubmit={handleForgotPasswordSubmit}
                        />
                      ) : (
                        <div>
                          <h3 className="text-2xl md:text-3xl font-semibold mb-10 text-center text-[#018893]">
                          Account Login
                          </h3>
                          <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="max-w-xl mx-auto space-y-4 text-[#828282]"
                          >
                            <div className="flex flex-col">
                              <label
                                htmlFor="username"
                                className="text-[#018893]"
                              >
                                User Email
                                {/* <span className="text-red-500">&thinsp;*</span> */}
                              </label>
                              <input
                                {...register("email", { required: true })}
                                type="email"
                                className="mt-1 block w-full border border-solid border-[#82C29B] outline-none rounded-lg shadow-sm px-4 py-3 focus:outline-none focus:border-[#018893] focus:ring-1 text-black"
                              />
                              {errors?.email && (
                                <span className="text-red-500">This field is required</span>
                              )}
                            </div>
                            <div className="flex flex-col">
                              <label
                                htmlFor="password"
                                className="text-[#018893]"
                              >
                                Password
                                {/* <span className="text-red-500">&thinsp;*</span> */}
                              </label>
                              <div className="relative">
                                <input
                                  {...register("password", { required: true })}
                                  type={showPassword ? "text" : "password"}
                                  id="password"
                                  className="mt-1 block w-full border border-solid border-[#82C29B] outline-none rounded-lg shadow-sm px-4 py-3 focus:outline-none focus:border-[#018893] focus:ring-1 text-black"
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
                           
                            <button
                              type="submit"
                              className="btn w-full"
                              id="SubmitBtn"
                              disabled={loading}
                            >
                              {loading ? "Loading..." : "Login"}
                            </button>
                            {message && <p>{message}</p>}

                            <div className="flex flex-col items-end">
                              <a
                                href="#"
                                className="text-[#8F8F8F] text-right hover:underline"
                                onClick={handleForgotPassword}
                              >
                                Forgot Password?
                              </a>
                            </div>

                            <div className="flex justify-center gap-1 items-baseline pt-2">
                                <p className="text-base text-black">Don’t have an account?</p>
                              <a href="/sign-up" className="text-base text-[#82C29B] hover:underline">Create here</a>
                            </div>
                            <div className="flex justify-center gap-1 items-baseline">
                                <p className="text-base text-black">Need Help?</p>
                                <a href="/contact-us" className="text-base text-[#82C29B] hover:underline">Contact Us</a>
                            </div>
                          </form>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Trusted partners logo section */}
      <section>
        <div className="mt-5 lg:my-20">
          <p className="text-[#2B3D67] font-medium text-xl text-center pb-6">We’re trusted by top health systems</p>
          <LogoList
              logos={logos}
              customClasses="grid grid-cols-2 md:grid-cols-4 justify-items-center items-center gap-7 lg:gap-14 px-7 lg:px-0 pt-3 lg:pt-6 lg:mb-[106px] mb-10 max-w-[700px] mx-auto"
            />
        </div>
      </section>
    </>
  );
};

export default SignIn;