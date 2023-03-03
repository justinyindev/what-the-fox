import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setHeadlines } from "../redux/headlinesSlice";
import { setIsLoading } from "../redux/loadingSlice";
import { useDispatch } from "react-redux";
import { getHeadlines } from "../utils/apiService";

function Calendar() {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date().setHours(0, 0, 0, 0));
  const [endDate, setEndDate] = useState(new Date().setHours(23, 59, 59, 999));

  const handleStartDateChange = (date) => {
    setStartDate(new Date(date).setHours(0, 0, 0, 0));
  };

  const handleEndDateChange = (date) => {
    setEndDate(new Date(date).setHours(23, 59, 59, 999));
  };

  const fetchHeadlines = async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getHeadlines(startDate, endDate);

      dispatch(setIsLoading(false));
      dispatch(setHeadlines(response));
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
    </div>
  );
}

export default Calendar;
