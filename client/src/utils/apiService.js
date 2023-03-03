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

export const getSummary = async (item) => {
  const response = await axios.get("http://localhost:3001/api/summarize", {
    params: {
      url: item.url,
      title: item.title
    },
  });

  return response.data;
};
