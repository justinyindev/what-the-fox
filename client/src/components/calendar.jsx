import React, { useState } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { setHeadlines } from "../redux/headlinesSlice";
import { setIsLoading } from "../redux/loadingSlice";
import { useDispatch } from "react-redux";

function Calendar() {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date().setHours(0, 0, 0, 0));
  const [endDate, setEndDate] = useState(new Date().setHours(23, 59, 59, 999));
  // const [headlines, setHeadlines] = useState([]);

  const handleStartDateChange = (date) => {
    setStartDate(new Date(date).setHours(0, 0, 0, 0));
  };

  const handleEndDateChange = (date) => {
    setEndDate(new Date(date).setHours(23, 59, 59, 999));
  };

  const fetchHeadlines = async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await axios.get("/api/headline", {
        params: {
          startDateTime: startDate,
          endDateTime: endDate,
        },
      });

      dispatch(setIsLoading(false));
      dispatch(setHeadlines(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <DatePicker
          selected={startDate}
          onChange={(date) => handleStartDateChange(date)}
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => handleEndDateChange(date)}
        />
      </div>
      <button onClick={fetchHeadlines}>Fetch headlines</button>
      {/* <ul>
        {headlines.map((headline) => (
          <li key={headline._id}>{headline.title}</li>
        ))}
      </ul> */}
    </div>
  );
}

export default Calendar;
