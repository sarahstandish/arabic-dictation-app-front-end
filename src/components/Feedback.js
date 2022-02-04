import React from "react";
import "./Feedback.css";
import PropTypes from "prop-types";

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

  const getFeedbackArr = (unvoweled_word, submittedWord) => {
    const submittedWordFeedbackArr = [];

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
        submittedWordFeedbackArr.push({
          char: sumbittedChar,
          status: "correct",
        });
      } else {
        submittedWordFeedbackArr.push({
          char: sumbittedChar,
          status: "incorrect",
        });
      }
    }

    if (submittedWord.length > unvoweled_word.length) {
      for (let i = unvoweled_word.length; i < submittedWord.length; i++) {
        let sumbittedChar = submittedWord[i];

        submittedWordFeedbackArr.push({
          char: sumbittedChar,
          status: "incorrect",
        });
      }
    }
    return submittedWordFeedbackArr;
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
