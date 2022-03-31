import "./Start.css";
import React from "react";
import PropTypes from "prop-types";

const Start = ({ changeVisibility, focusHere }) => {
  // the page the user starts on
  return (
    <div className="start">
      <p className="app-description directions">
        Improve your knowledge of the Arabic alphabet.
      </p>
      <i className="far fa-hand-pointer"></i>
      <p className="app-description directions">
        Select the Arabic letters you want to practice.
      </p>
      <i className="fas fa-volume-up"></i>
      <p className="app-description directions">
        Listen to a word composed of those letters, and type what you hear.
      </p>
      <i className="far fa-keyboard"></i>
      <p className="app-description directions">
        Receive feedback on your attempt, and retry words you got wrong.
      </p>
      <button
        onClick={() => changeVisibility({ start: false, menuForm: true })}
        id="start-button"
        className="button"
        ref={focusHere}
      >
        Start
      </button>
      <footer>
        <a href="https://jusuurtextbook.com/" target="_blank" rel="noreferrer">
          Jusuur textbook
        </a>
        <a
          href="https://sarahstandish.github.io/"
          target="_blank"
          rel="noreferrer"
        >
          About the creator
        </a>
      </footer>
    </div>
  );
};

Start.propTypes = {
  changeVisibility: PropTypes.func.isRequired,
  focusHere: PropTypes.func.isRequired,
};

export default Start;
