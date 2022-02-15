import "./FeedbackLetterList.css";
import React from "react";
import PropTypes from "prop-types";
import FeedbackLetter from "./FeedbackLetter.js";

// a list of letters to present feedback
// color-coded by letter for users who are not using Safari or an iOs browser
const FeedbackLetterList = ({ wordArr }) => {
  const letterComponentList = wordArr.map((letter, index) => {
    return <FeedbackLetter key={index} letter={letter} />;
  });
  return <p className="feedback-letter-list">{letterComponentList}</p>;
};

FeedbackLetterList.propTypes = {
  wordArr: PropTypes.array,
};

export default FeedbackLetterList;
