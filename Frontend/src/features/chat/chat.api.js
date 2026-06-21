import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const sendMessageAPI = async (message) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(
    `${API}/api/chat`,
    { message },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};

export const getHistoryAPI = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(`${API}/api/chat/history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
