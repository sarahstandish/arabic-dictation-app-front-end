import "./AllLettersButton.css";
import React from "react";
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
  onClick: PropTypes.func.isRequired,
};

export default AllLettersButton;
