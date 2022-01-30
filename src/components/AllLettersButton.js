import React from "react";
import "./AllLettersButton.css";
import PropTypes from "prop-types";

const AllLettersButton = ({ selectAllLetters, allLettersSelected }) => {
  const selected = allLettersSelected ? "selected" : "not-selected";

  return (
    <div
      className={`letter ${selected}`}
      id="all-letters"
      onClick={selectAllLetters}
    >
      All letters
    </div>
  );
};

AllLettersButton.propTypes = {
  selectAllLetters: PropTypes.func.isRequired,
  allLettersSelected: PropTypes.bool.isRequired,
};

export default AllLettersButton;
