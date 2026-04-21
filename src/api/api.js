import axios from "axios";

const TEST_URL = "https://t4e-testserver.onrender.com/api";

const extractOrders = (responsePayload) => {
  if (Array.isArray(responsePayload)) {
    return responsePayload;
  }

  if (Array.isArray(responsePayload?.orders)) {
    return responsePayload.orders;
  }

  if (Array.isArray(responsePayload?.data)) {
    return responsePayload.data;
  }

  if (Array.isArray(responsePayload?.data?.orders)) {
    return responsePayload.data.orders;
  }

  return [];
};

export const getToken = async (studentId, password, set) => {
  const { data } = await axios.post(`${TEST_URL}/public/token`, {
    studentId,
    password,
    set,
  });

  return data;
};

export const getDataset = async (token, dataUrl) => {
  const { data } = await axios.get(`${TEST_URL}${dataUrl}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return extractOrders(data?.data ?? data);
};
