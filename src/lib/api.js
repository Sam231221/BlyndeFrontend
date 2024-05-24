import axios from "axios";
export const endpoint = import.meta.env.VITE_APP_API;

export default axios.create({
  baseURL: import.meta.env.VITE_APP_API,
});
