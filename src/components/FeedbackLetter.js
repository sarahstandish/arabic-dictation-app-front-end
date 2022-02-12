import "./FeedbackLetter.css";
import React from "react";
import PropTypes from "prop-types";

const FeedbackLetter = ({ letter }) => {
  const { char, status } = letter;
  return (
    // use of zwj inside span tags, does not work on mobile
    //
    <span className={`feedback-letter arabic ${status}`}>&zwj;{char}&zwj;</span>
    // use of zwj outside span tags, breaks appearance on web, also doesn't work
    // <>
    //   &zwj;<span className={`feedback-letter arabic ${status}`}>{char}</span>
    //   &zwj;
    // </>
  );
};

FeedbackLetter.propTypes = {
  letter: PropTypes.object.isRequired,
};

export default FeedbackLetter;
