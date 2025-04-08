import React, { useState } from 'react';
import './CircularProgress.css';
import { useDarkMode } from "../DarkModeProvider/DarkModeContext";

const CircularProgress = () => {
    const { darkMode } = useDarkMode();
    const [percentage, setPercentage] = useState(30);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

//   const handlePercentageChange = (e) => {
//     setPercentage(parseInt(e.target.value));
//   };

  return (
    <div className="circular-progress-container">      
      {/* <div className="progress-wrapper"> */}
      <div className={darkMode ?"progress-wrapper":"progress-wrapper progress-wrapper-darkmode"}>
        <svg className="circular-progress" width="120" height="120" viewBox="0 0 120 120">
          <circle
            className="circular-progress-bg"
            cx="60"
            cy="60"
            r={radius}
            strokeWidth="4"
            fill="transparent"
          />
          <circle
            className="circular-progress-fill"
            cx="60"
            cy="60"
            r={radius}
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 60 60)"
          />
          <text
            x="60"
            y="65"
            // fill='red'

            className="percentage-text-svg"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {percentage}%
          </text>
        </svg>
        
      </div>
      
      {/* <div className="slider-container">
        <input
          type="range"
          min="0"
          max="100"
          value={percentage}
          onChange={handlePercentageChange}
          className="progress-slider"
        />
        <div className="slider-labels">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div> */}
    </div>
  );
};

export default CircularProgress;