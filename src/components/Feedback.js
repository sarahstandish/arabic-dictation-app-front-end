import "./Feedback.css";
import React from "react";
import PropTypes from "prop-types";
import FeedbackLetterList from "./FeedbackLetterList";
import SimplifiedFeedbackWord from "./SimplifiedFeedbackWord";

// a component that displays feedback to the user
const Feedback = ({ currWord, submittedWord, getNextWord, focusHere }) => {
  const { unvoweled_word, voweled_word } = currWord;

  const currWordCorrect = () => {
    return submittedWord === unvoweled_word;
  };

  const getFeedbackArr = () => {
    const feedbackArr = [];

    // if the submitted word is shorter, add blank lines to the end of the word
    if (submittedWord.length < unvoweled_word.length) {
      const diff = unvoweled_word.length - submittedWord.length;
      for (let i = 0; i < diff; i++) {
        submittedWord += "_";
      }
    }

    // check each character for correctness, and set status accordingly
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

    // if the submitted word is longer than the actual word
    // mark the rest of the letters as incorrect
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
    // color-code diacritics
    // this is not visible on all browsers and mainly works on Firefox
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
    return correctWordArr;
  };

  const getEvaluation = () => {
    // return a simple evaluation of how the user did
    if (currWordCorrect()) {
      return "Perfect!";
    }

    const feedbackArr = getFeedbackArr();
    let incorrect = 0;

    // count the number of incorrect letters
    for (let letter of feedbackArr) {
      if (letter.status === "incorrect") {
        incorrect += 1;
      }
    }

    const percent_incorrect = incorrect / feedbackArr.length;

    if (percent_incorrect <= 0.25) {
      return "Close!";
    } else if (percent_incorrect <= 0.5) {
      return "Partly there.";
    }
  };
  // check the user's browser
  // this is considered hacky but seems to be the only way around it
  const UA = navigator.userAgent;
  const isWebkit = /\b(iPad|iPhone|iPod)\b/.test(UA) && /WebKit/.test(UA);
  const isSafari = /^((?!chrome|android).)*safari/i.test(UA);

  // return simplified feedback on iOs or Safari, which will not accept html interpolated between Arabic letters
  const simpleFeedback = isWebkit || isSafari;

  return (
    <div className="feedback">
      <p className="feedback-p evaluation">
        {submittedWord && getEvaluation()}
      </p>
      <div id="the-word-was">
        <p className="feedback-p">The word was</p>
        {simpleFeedback && (
          <SimplifiedFeedbackWord word={voweled_word} isCorrect={true} />
        )}
        {!simpleFeedback && submittedWord && (
          <FeedbackLetterList wordArr={getCorrectWordArr()} />
        )}
      </div>
      <div id="you-wrote">
        <p className="feedback-p">You wrote</p>
        {simpleFeedback && (
          <SimplifiedFeedbackWord
            word={submittedWord}
            isCorrect={currWordCorrect()}
          />
        )}
        {!simpleFeedback && submittedWord && (
          <FeedbackLetterList wordArr={getFeedbackArr()} />
        )}
      </div>
      <button
        className="button"
        id="next-word-button"
        onClick={() => getNextWord(currWordCorrect())}
        ref={focusHere}
      >
        Next Word
      </button>
    </div>
  );
};

Feedback.propTypes = {
  currWord: PropTypes.object.isRequired,
  submittedWord: PropTypes.string,
  getNextWord: PropTypes.func.isRequired,
  focusHere: PropTypes.func.isRequired,
};

export default Feedback;
