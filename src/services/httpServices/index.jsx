import axios from "axios";
import { store } from "../../redux";
// import.meta.env.VITE_BASE_URL;

export function ApiHeaders(headers) {
  const token = "";
  return {
    Authorization: "Bearer " + token,
    ...headers,
  };
}

export default class HttpServices {
  static async get(endpoint, header) {
    const headers = await ApiHeaders(header);
    const url = `${import.meta.env.VITE_BASE_URL}${endpoint}`;
    return axios({ method: "GET", url, headers });
  }

  static async post(endpoint, header, data = {}) {
    const headers = await ApiHeaders(header);
    const url = import.meta.env.VITE_BASE_URL + endpoint;
    return axios({ method: "POST", url, headers, data });
  }

  static async put(endpoint, header, data = {}) {
    const headers = await ApiHeaders(header);
    const url = `${import.meta.env.VITE_BASE_URL}${endpoint}`;
    return axios({ method: "PUT", url, headers, data });
  }

  static async delete(endpoint, header) {
    const headers = await ApiHeaders(header);
    const url = `${import.meta.env.VITE_BASE_URL}${endpoint}`;
    return axios({ method: "DELETE", url, headers });
  }

  static async patch(endpoint, header, data = {}) {
    const headers = await ApiHeaders(header);
    const url = `${import.meta.env.VITE_BASE_URL}${endpoint}`;
    return axios({ method: "PATCH", url, headers, data });
  }
}
