import React from "react";
import "./Start.css";

const Start = ({ visibility, onClick }) => {
  return (
    <div className={`Start ${!visibility ? "invisible" : null}`}>
      <p className="app-description directions">
        Improve your knowledge of the Arabic alphabet.
      </p>
      <p className="app-description directions">
        Select the Arabic letters you know or want to practice.
      </p>
      <p className="app-description directions">
        Listen to a word composed of those letters, and type what you hear.
      </p>
      <p className="app-description directions">
        Recieve feedback on your attempt, and retry words you got wrong.
      </p>
      <button
        onClick={() => onClick("start", "menuForm")}
        id="start-button"
        className="button"
      >
        Start
      </button>
    </div>
  );
};

export default Start;
