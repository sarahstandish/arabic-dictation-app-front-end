import "./KeyboardLetterList.css";
import React from "react";
import PropTypes from "prop-types";
import KeyBoardLetter from "./KeyboardLetter";

const KeyboardLetterList = ({
  searchLetters,
  searchedForAllLetters,
  allLetters,
}) => {
  const searchLettersSet = new Set(Array.from(searchLetters));

  const keyboardLetterComponentList = allLetters.map((letter, index) => {
    return <KeyBoardLetter key={index} letter={letter} />;
  });
  return (
    <div>
      <p>This is the Keyboard Letter List component</p>
      <ul>{keyboardLetterComponentList}</ul>
    </div>
  );
};

KeyboardLetterList.propTypes = {
  searchLetters: PropTypes.string.isRequired,
  searchedForAllLetters: PropTypes.bool.isRequired,
  allLetters: PropTypes.array.isRequired,
};

export default KeyboardLetterList;
