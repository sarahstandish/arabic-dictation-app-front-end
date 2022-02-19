import React from "react";
import PropTypes from "prop-types";
import "./SimplifiedFeedbackWord.css";

const SimplifiedFeedbackWord = ({ word, isCorrect }) => {
  // simplified feedback component shown to users of Safari or iOs browsers
  // presents the word without an interpolation of html
  // entire word is colored blue if correct, red if incorrect
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
