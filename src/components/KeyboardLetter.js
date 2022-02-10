import "./KeyboardLetter.css";
import React from "react";
import PropTypes from "prop-types";

const KeyBoardLetter = ({ letter, searchedForClass }) => {
  return (
    <li className={`keyboard-letter arabic ${searchedForClass}`}>{letter}</li>
  );
};

KeyBoardLetter.propTypes = {
  letter: PropTypes.string.isRequired,
  searchedForClass: PropTypes.string.isRequired,
};

export default KeyBoardLetter;
