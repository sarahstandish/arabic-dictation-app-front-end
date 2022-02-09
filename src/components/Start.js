import "./Start.css";
import React from "react";
import PropTypes from "prop-types";

const Start = ({ changeVisibility, focusHere }) => {
  return (
    <div className="start">
      <p className="app-description directions">
        Improve your knowledge of the Arabic alphabet.
      </p>
      <i className="far fa-hand-pointer"></i>
      <p className="app-description directions">
        Select the Arabic letters you know or want to practice.
      </p>
      <i className="fas fa-volume-up"></i>
      <p className="app-description directions">
        Listen to a word composed of those letters, and type what you hear.
      </p>
      <i className="far fa-keyboard"></i>
      <p className="app-description directions">
        Recieve feedback on your attempt, and retry words you got wrong.
      </p>
      <button
        onClick={() => changeVisibility({ start: false, menuForm: true })}
        id="start-button"
        className="button"
        ref={focusHere}
      >
        Start
      </button>
    </div>
  );
};

Start.propTypes = {
  changeVisibility: PropTypes.func.isRequired,
  focusHere: PropTypes.func.isRequired,
};

export default Start;
