import React, { useState } from "react";
import axios from "@/helpers/axios";

const LostPasswordForm = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (!email) {
      setError("Please enter your email.");
      return;
    }
    
    if (!validateEmail(email)) {
        setError("Please enter a valid email address.");
        return;
      }

    try {
      setLoading(true);
      const response = await axios.post("provider/send-reset-password-link", { email });
      setMessage(response.data.message);
      setError("");
      setEmail("");
    } catch (error) {
      setMessage("Failed to send email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-4">Lost your password?</h2>
      <p className="text-clr_nav pb-4">
        Please enter your username or email address. You will receive a link to
        create a new password via email.
      </p>
      <div className="flex flex-col mb-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full border border-solid border-gray-300 rounded-md shadow-sm px-4 py-3 focus:outline-none focus:border-[#018893] focus:ring-1 text-black"
        />
      </div>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button
        type="button"
        onClick={handleSubmit}
        className="btn w-full"
        id="SubmitBtn"
        disabled={loading}
      >
        {loading ? "Loading..." : "Submit"}
      </button>
      {message && <p className="text-clr_nav mt-4">{message}</p>}
    </div>
  );
};

export default LostPasswordForm