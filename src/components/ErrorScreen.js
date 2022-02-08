import "./ErrorScreen.css";
import React from "react";
import PropTypes from "prop-types";

const ErrorScreen = ({ error, changeVisibility, focusHere }) => {
  return (
    <div className="error-screen">
      <p className="error">{error}</p>
      <button
        className="button"
        id="change-letters-button"
        onClick={() => changeVisibility(["errorScreen", "menuForm"])}
        ref={focusHere}
      >
        Change letters
      </button>
    </div>
  );
};

ErrorScreen.propTypes = {
  error: PropTypes.string.isRequired,
  changeVisibility: PropTypes.func.isRequired,
  focusHere: PropTypes.func.isRequired,
};

export default ErrorScreen;
