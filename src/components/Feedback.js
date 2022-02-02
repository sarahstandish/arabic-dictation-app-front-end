import React from "react";
import "./Feedback.css";
import PropTypes from "prop-types";

const Feedback = ({ currWord, submittedWord }) => {
  const { unvoweled_word, voweled_word } = currWord;

  // I could loop through each letter of the correct word
  // place each letter in an array as an object showing whether is was correct or incorrect

  const checkUserInput = () => {
    if (submittedWord === unvoweled_word) {
      console.log("All correct!");
    }

    const wordEvaluation = [];

    let i = 0;
    let j = 0;
    while (i < unvoweled_word.length) {
      if (unvoweled_word[i] === submittedWord[i]) {
      }
    }
  };

  return (
    <div>
      You wrote {submittedWord} and the correct word is {unvoweled_word}.
    </div>
  );
};

Feedback.propTypes = {
  currWord: PropTypes.object.isRequired,
  submittedWord: PropTypes.string,
};

export default Feedback;
