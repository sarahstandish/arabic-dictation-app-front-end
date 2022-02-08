import "./Start.css";
import React from "react";
import PropTypes from "prop-types";

const Start = ({ visibility, changeVisibility }) => {
  return (
    <div className={`start ${visibility.getClass("start")}`}>
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
        onClick={() => changeVisibility(["start", "menuForm"])}
        id="start-button"
        className="button"
      >
        Start
      </button>
    </div>
  );
};

Start.propTypes = {
  visibility: PropTypes.object.isRequired,
  changeVisibility: PropTypes.func.isRequired,
};

export default Start;
