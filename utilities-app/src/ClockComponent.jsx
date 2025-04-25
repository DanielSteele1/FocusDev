import React, { useState, useEffect, useRef } from 'react';
import './Clock.css';

function MainClock() {

  const [time, setTime] = useState(getTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getTime());
    }, 6000);  // update every second

    return () => clearInterval(intervalId);  // cleanup function to clear the interval

  }, []);

  function getTime() {

    const now = new Date();
    const minutes = String(now.getMinutes()).padStart(2,"0");
    const hours = now.getHours();

    const meridium = hours >= 12 ? 'PM' : 'AM';

    return `${hours}:${minutes} ${meridium}`;

  }

  const [date, setDate] = useState(getDate());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(getDate());
    }, 6000); 

    return () => clearInterval(intervalId);

  }, []);

  function getDate() {

    const now = new Date();


    return now.toLocaleDateString('en-UK', {

      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
      
    });

  }

  return (
    <div className="clock-container">
      <div className="Clock">
        <span>{time} </span>
      </div>

      <div className="Date">
        <span> It's {date} </span>
      </div>
    </div>
  );

}

export default MainClock;