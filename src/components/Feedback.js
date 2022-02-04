import React from "react";
import "./Feedback.css";
import PropTypes from "prop-types";
import FeedbackLetterList from "./FeedbackLetterList";

const Feedback = ({
  currWord,
  submittedWord,
  visibility,
  updateCurrWord,
  changeVisibility,
}) => {
  const { unvoweled_word, voweled_word } = currWord;

  const currWordCorrect = () => {
    return submittedWord === unvoweled_word;
  };

  const getFeedbackArr = () => {
    const feedbackArr = [];

    if (submittedWord.length < unvoweled_word.length) {
      const diff = unvoweled_word.length - submittedWord.length;
      for (let i = 0; i < diff; i++) {
        submittedWord += "_";
      }
    }

    for (let i = 0; i < unvoweled_word.length; i++) {
      let correctChar = unvoweled_word[i];
      let sumbittedChar = submittedWord[i];
      if (correctChar === sumbittedChar) {
        feedbackArr.push({
          char: sumbittedChar,
          status: "correct",
        });
      } else {
        feedbackArr.push({
          char: sumbittedChar,
          status: "incorrect",
        });
      }
    }

    if (submittedWord.length > unvoweled_word.length) {
      for (let i = unvoweled_word.length; i < submittedWord.length; i++) {
        let sumbittedChar = submittedWord[i];

        feedbackArr.push({
          char: sumbittedChar,
          status: "incorrect",
        });
      }
    }
    return feedbackArr;
  };

  const getNextWord = () => {
    updateCurrWord(currWordCorrect());
    changeVisibility(["inputForm", "feedback"]);
  };

  return (
    <div className={`feedback ${visibility.getClass("feedback")}`}>
      <p>
        You wrote {submittedWord} and the correct word is {unvoweled_word}.
      </p>
      {submittedWord.length > 0 && (
        <FeedbackLetterList wordArr={getFeedbackArr()} />
      )}
      <button className="button" id="next-word-button" onClick={getNextWord}>
        Next Word
      </button>
    </div>
  );
};

Feedback.propTypes = {
  currWord: PropTypes.object.isRequired,
  submittedWord: PropTypes.string,
  visibility: PropTypes.object.isRequired,
  updateCurrWord: PropTypes.func.isRequired,
  changeVisibility: PropTypes.func.isRequired,
};

export default Feedback;
