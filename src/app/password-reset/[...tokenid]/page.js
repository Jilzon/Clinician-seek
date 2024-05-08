"use client";
import React, { useState, useEffect } from "react";
import SiteHeader from "@/components/siteHeader";
import "../../../styles/_account.scss";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import axios from "@/helpers/axios";

const PasswordReset = ({ params }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [useridFromURl, tokenFromUrl] = params.tokenid;
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  const handleToggleNewPasswordVisibility = () => {
    setShowNewPassword((prevShowNewPassword) => !prevShowNewPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `provider/reset-password/${useridFromURl}/${tokenFromUrl}`,
        {
          password: newPassword,
          confirm_password: confirmNewPassword
        }
      );
      setSuccessMessage("Password reset successful");
      setErrorMessage("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Password reset failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

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

            <div className="flex justify-center items-center min-h-screen relative z-2">
              <div className="container ml-auto px-4 mr-0">
                <div className="max-w-xl mx-auto px-4 pt-[100px] pb-[100px]">
                  <div className="sign py-12 px-12 shadow-xl mt-16">
                    <div>
                      <h2 className="text-3xl font-semibold mb-4">
                        Reset Password
                      </h2>
                      <p className="text-clr_nav pb-4">
                        Enter a new password below.
                      </p>
                      <form onSubmit={handleSubmit}>
                        <div className="flex flex-col mb-4">
                          <label htmlFor="newPassword" className="text-clr_nav">
                            New Password
                          </label>
                          <div className="relative">
                            <input
                              type={showNewPassword ? "text" : "password"}
                              id="newPassword"
                              value={newPassword}
                              onChange={handleNewPasswordChange}
                              className="mt-1 block w-full border border-solid border-gray-300 outline-none rounded-md shadow-sm px-4 py-3 focus:outline-none focus:border-[#018893] focus:ring-1 text-black"
                              required
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 px-3 hover:bg-transparent"
                              onClick={handleToggleNewPasswordVisibility}
                            >
                              {showNewPassword ? (
                                <EyeOffIcon className="h-5 w-5 text-gray-400" />
                              ) : (
                                <EyeIcon className="h-5 w-5 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-col mb-4">
                          <label
                            htmlFor="confirmNewPassword"
                            className="text-clr_nav"
                          >
                            Re-enter New Password
                          </label>
                          <div className="relative">
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              id="confirmNewPassword"
                              value={confirmNewPassword}
                              onChange={handleConfirmNewPasswordChange}
                              className="mt-1 block w-full border border-solid border-gray-300 outline-none rounded-md shadow-sm px-4 py-3 focus:outline-none focus:border-[#018893] focus:ring-1 text-black"
                              required
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
                        </div>
                        <button
                          type="submit"
                          className="btn mb-4"
                          id="SubmitBtn"
                          disabled={loading}
                        >
                          {loading ? "Loading..." : "Reset Password"}
                        </button>
                        {successMessage && (
                          <p className="text-green-500">{successMessage}</p>
                        )}
                        {errorMessage && (
                          <p className="text-red-500">{errorMessage}</p>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PasswordReset;
