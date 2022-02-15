import "./FeedbackLetter.css";
import React from "react";
import PropTypes from "prop-types";

// a letter component to give color-coded feedback
// only for users who are not on iOs or Safari
const FeedbackLetter = ({ letter }) => {
  // status is a class that determines the color of the letter
  const { char, status } = letter;
  return <span className={`feedback-letter arabic ${status}`}>{char}</span>;
};

FeedbackLetter.propTypes = {
  letter: PropTypes.object.isRequired,
};

export default FeedbackLetter;
