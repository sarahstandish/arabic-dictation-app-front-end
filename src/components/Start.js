import React from "react";
import "./Start.css";

const Start = () => {
  return (
    <div className="Start">
      <p id="app-description" className="directions"></p>
      <button
        onClick={() => console.log("You clicked the start button")}
        id="start-button"
        className="button"
      >
        Start
      </button>
    </div>
  );
};

export default Start;
