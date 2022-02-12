import React from "react";
import PropTypes from "prop-types";
import "./SimplifiedFeedbackWord.css";

const SimplifiedFeedbackWord = ({ word, isCorrect }) => {
  const correctnessClass = isCorrect ? "correct" : "incorrect";
  return (
    <p className={`arabic feedback-letter-list ${correctnessClass}`}>{word}</p>
  );
};

SimplifiedFeedbackWord.propTypes = {
  word: PropTypes.string.isRequired,
  isCorrect: PropTypes.bool.isRequired,
};

export default SimplifiedFeedbackWord;
