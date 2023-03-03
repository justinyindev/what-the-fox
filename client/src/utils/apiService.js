import axios from "axios";

export const getHeadlines = async (startDate, endDate) => {
  if (startDate && endDate) {
    const response = await axios.get("http://localhost:3001/api/headline", {
      params: {
        startDateTime: startDate,
        endDateTime: endDate,
      },
    });

    return response.data;
  }

  const response = await axios.get("http://localhost:3001/api/headline");
  return response.data;
};

export const getSummary = async (url) => {
  const response = await axios.get("http://localhost:3001/api/summarize", {
    params: { url: url },
  });

  return response.data;
};
