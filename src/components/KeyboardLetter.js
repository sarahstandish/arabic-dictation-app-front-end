import "./KeyboardLetter.css";
import React from "react";
import PropTypes from "prop-types";

// a letter in the key board component
const KeyBoardLetter = ({ letter, searchedForClass, onLetterClick }) => {
  return (
    <li
      onClick={(event) => onLetterClick(event.target.innerHTML)}
      className={`keyboard-letter arabic ${searchedForClass}`}
    >
      {letter}
    </li>
  );
};

KeyBoardLetter.propTypes = {
  letter: PropTypes.string.isRequired,
  searchedForClass: PropTypes.string.isRequired,
  onLetterClick: PropTypes.func.isRequired,
};

export default KeyBoardLetter;
