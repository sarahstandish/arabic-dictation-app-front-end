import "./KeyboardLetter.css";
import React from "react";
import PropTypes from "prop-types";

const KeyBoardLetter = ({ letter }) => {
  return <li>{letter}</li>;
};

KeyBoardLetter.propTypes = {
  letter: PropTypes.string.isRequired,
};

export default KeyBoardLetter;
