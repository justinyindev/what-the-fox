import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setHeadlines } from "../redux/headlinesSlice";
import { setIsLoading } from "../redux/loadingSlice";
import { useDispatch } from "react-redux";
import { getHeadlines } from "../utils/apiService";
import { useSelector } from "react-redux";
import "../static/css/calendar.css";
import "react-datepicker/dist/react-datepicker.css";

function Calendar() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.loading);
  const [startDate, setStartDate] = useState(new Date().setHours(0, 0, 0, 0));
  const [endDate, setEndDate] = useState(new Date().setHours(23, 59, 59, 999));

  const handleStartDateChange = (date) => {
    if (date.getTime() < endDate) {
      setStartDate(new Date(date).setHours(0, 0, 0, 0));
    }
  };

  const handleEndDateChange = (date) => {
    if (date.getTime() > startDate) {
      setEndDate(new Date(date).setHours(23, 59, 59, 999));
    }
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
    <div className="calendar-main-container">
      {loading ? null : (
        <div className="calendar-container">
          <div className="calendar-item-container">
            <span className="calendar-picker-heading">Start Time</span>
            <DatePicker
              className="calendar-picker"
              selected={startDate}
              onChange={(date) => handleStartDateChange(date)}
            />
          </div>
          <div className="calendar-item-container">
            <span className="calendar-picker-heading">End Time</span>
            <DatePicker
              className="calendar-picker"
              selected={endDate}
              onChange={(date) => handleEndDateChange(date)}
            />
          </div>
          <button className="calendar-button" onClick={fetchHeadlines}>
            WTV
          </button>
        </div>
      )}
    </div>
  );
}

export default Calendar;
