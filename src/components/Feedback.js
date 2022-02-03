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

  // I could loop through each letter of the correct word
  // place each letter in an array as an object showing whether is was correct or incorrect

  const checkUserInput = () => {
    const feedbackArr = [];

    if (submittedWord === unvoweled_word) {
      console.log("All correct!");
      for (let char in submittedWord) {
        feedbackArr.push({
          char: char,
          status: "correct",
        });
      }
      console.log(feedbackArr);
      return feedbackArr;
    }
    // I'm thinking...
    // get a set of the letters in each word
    // make sure they are in the right order
    // by iterating over each word
    // finding the first letter that is in the set in the correct word
    // then finding that letter in the submitted word
    // marking other letters incorrect

    let correctWordIndex = 0;
    let submittedWordIndex = 0;

    while (correctWordIndex < unvoweled_word.length) {
      let correctChar = unvoweled_word[correctWordIndex];
      let sumbittedChar = submittedWord[submittedWordIndex];
      if (correctChar === sumbittedChar) {
        feedbackArr.push({
          char: sumbittedChar,
          status: "correct",
        });
        correctWordIndex++;
        submittedWordIndex++;
      } else if (correctChar in submittedWord) {
        feedbackArr.push({
          char: sumbittedChar,
          status: "incorrect",
        });
        submittedWordIndex++;
      } else {
        feedbackArr.push({
          char: sumbittedChar,
          status: "incorrect",
        });
        submittedWordIndex++;
        correctWordIndex++;
      }
    }
  };

  const getNextWord = () => {
    updateCurrWord();
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
