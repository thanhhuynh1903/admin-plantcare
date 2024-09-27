import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://everfresh-server.onrender.com/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to handle errors and call the callback
const handleResponse = (callback) => (response) => {
  if (response.status >= 200 && response.status < 300) {
    callback(null, response.data);
  } else {
    callback(response.statusText || "Unknown error", null);
  }
};

// GET request
export const aget = (url, callback) => {
  axiosInstance
    .get(url)
    .then(handleResponse(callback))
    .catch((error) => callback(error.message, null));
};

// POST request
export const apost = (url, json, callback) => {
  axiosInstance
    .post(url, json)
    .then(handleResponse(callback))
    .catch((error) => callback(error.message, null));
};

// POST request for file upload
export const apostFile = (url, file, callback) => {
  const formData = new FormData();
  formData.append("file", file);

  axiosInstance
    .post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(handleResponse(callback))
    .catch((error) => callback(error.message, null));
};

// PUT request
export const aput = (url, json, callback) => {
  axiosInstance
    .put(url, json)
    .then(handleResponse(callback))
    .catch((error) => callback(error.message, null));
};

// DELETE request
export const adelete = (url, callback) => {
  axiosInstance
    .delete(url)
    .then(handleResponse(callback))
    .catch((error) => callback(error.message, null));
};
