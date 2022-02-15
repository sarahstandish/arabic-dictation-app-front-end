import "./LetterButtonList.css";
import React from "react";
import Letter from "./Letter.js";
import PropTypes from "prop-types";
import AllLettersButton from "./AllLettersButton";

// component containing all letter buttons in the letter selection menu
const LetterButtonList = ({
  selectLetter,
  selectedLetters,
  selectAllLetters,
  allLettersSelected,
  allLetters,
}) => {
  const allLettersList = Array.from(allLetters);

  const letterComponentList = allLettersList.map((letter) => {
    let selected = "not-selected";
    if (selectedLetters.has(letter)) {
      selected = "selected";
    }
    return (
      // key is the unicode point value of the last character in the string (to make sure all are unique)
      <Letter
        key={letter.charCodeAt(letter.length - 1)}
        letter={letter}
        selectLetter={selectLetter}
        selected={selected}
      />
    );
  });

  return (
    <div>
      <ul className="letter-component-list">{letterComponentList}</ul>
      <AllLettersButton
        selectAllLetters={selectAllLetters}
        allLettersSelected={allLettersSelected}
      />
    </div>
  );
};

LetterButtonList.propTypes = {
  selectLetter: PropTypes.func.isRequired,
  selectedLetters: PropTypes.object.isRequired,
  selectAllLetters: PropTypes.func.isRequired,
  allLettersSelected: PropTypes.bool.isRequired,
  allLetters: PropTypes.object.isRequired,
};

export default LetterButtonList;
