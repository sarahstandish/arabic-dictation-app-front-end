import React from "react";
import "./Feedback.css";
import PropTypes from "prop-types";
import FeedbackLetterList from "./FeedbackLetterList";
import FeedbackLetter from "./FeedbackLetter";

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

  const getCorrectWordArr = () => {
    const diacritics = new Set([
      "\u0650", // kesra
      "\u064F", // damma
      "\u064E", // fatha
      "\u0651", // shadda
      "\u0652", // sukuun
      "\u0670", // dagger alif
    ]);
    const correctWordArr = [];
    for (let char of voweled_word) {
      if (diacritics.has(char)) {
        correctWordArr.push({
          char: char,
          status: "diacritic",
        });
      } else {
        correctWordArr.push({
          char: char,
          status: "correct",
        });
      }
    }
    console.log(correctWordArr);
    return correctWordArr;
  };

  const getEvaluation = () => {
    if (currWordCorrect()) {
      return "Perfect!";
    }

    const feedbackArr = getFeedbackArr();
    let incorrect = 0;

    for (let letter of feedbackArr) {
      if (letter.status === "incorrect") {
        incorrect += 1;
      }
    }

    const percent_incorrect = incorrect / feedbackArr.length;

    if (percent_incorrect < 0.25) {
      return "Close!";
    } else if (percent_incorrect < 0.5) {
      return "Partly there.";
    }
  };

  const getNextWord = () => {
    updateCurrWord(currWordCorrect());
    changeVisibility(["inputForm", "feedback"]);
  };

  return (
    <div className={`feedback ${visibility.getClass("feedback")}`}>
      <p className="feedback-p evaluation">
        {submittedWord.length > 0 && getEvaluation()}
      </p>
      <p classname="feedback-p">You wrote:</p>
      {submittedWord.length > 0 && (
        <FeedbackLetterList wordArr={getFeedbackArr()} />
      )}
      <p className="feedback-p">The word was:</p>
      {submittedWord.length > 0 && (
        <FeedbackLetterList wordArr={getCorrectWordArr()} />
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
