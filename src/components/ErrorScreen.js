import React from "react";
import PropTypes from "prop-types";

const ErrorScreen = ({ error, changeVisibility, visibility }) => {
  return (
    <div className={`error ${visibility.getClass("errorScreen")}`}>
      <p className="error">{error}</p>
      <button
        className="button"
        id="change-letters-button"
        onClick={() => changeVisibility(["errorScreen", "menuForm"])}
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
};

export default ErrorScreen;
