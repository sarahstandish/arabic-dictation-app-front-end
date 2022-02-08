import "./Letter.css";
import React from "react";
import PropTypes from "prop-types";

const Letter = ({ letter, selectLetter, selected }) => {
  return (
    <li
      className={`letter arabic ${selected}`}
      onClick={() => selectLetter(letter)}
    >
      {letter}
    </li>
  );
};

Letter.propTypes = {
  letter: PropTypes.string.isRequired,
  selectLetter: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
};

export default Letter;
