import "./FeedbackLetter.css";
import React from "react";
import PropTypes from "prop-types";

const FeedbackLetter = ({ letter }) => {
  const { char, status } = letter;
  return (
    <span className={`feedback-letter arabic ${status}`}>&zwj;{char}&zwj;</span>
  );
};

FeedbackLetter.propTypes = {
  letter: PropTypes.object.isRequired,
};

export default FeedbackLetter;
