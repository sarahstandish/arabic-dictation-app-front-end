import "./ErrorScreen.css";
import React from "react";
import PropTypes from "prop-types";

const ErrorScreen = ({ error, changeVisibility, visibility, focusHere }) => {
  return (
    <div className={`error-screen ${visibility.getClass("errorScreen")}`}>
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
  visibility: PropTypes.object.isRequired,
  focusHere: PropTypes.func.isRequired,
};

export default ErrorScreen;
