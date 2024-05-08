import axios from "axios";

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "auth-api-key": process.env.NEXT_PUBLIC_URL_APIKEY
  }
});
