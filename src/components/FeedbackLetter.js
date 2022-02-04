import React from "react";
import PropTypes from "prop-types";
import "./FeedbackLetter.css";

const FeedbackLetter = ({ letter }) => {
  const { char, status } = letter;
  return <span className={`feedback-letter ${status}`}>{char}</span>;
};

FeedbackLetter.propTypes = {
  letter: PropTypes.object.isRequired,
};

export default FeedbackLetter;
