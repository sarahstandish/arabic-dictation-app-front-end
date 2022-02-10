import "./KeyboardLetterList.css";
import React from "react";
import PropTypes from "prop-types";
import KeyBoardLetter from "./KeyboardLetter";
import DeleteButton from "./DeleteButton";

const KeyboardLetterList = ({
  searchLetters,
  searchedForAllLetters,
  allLetters,
  onLetterClick,
  onDeleteClick,
}) => {
  let searchLettersSet;

  if (searchedForAllLetters) {
    searchLettersSet = new Set(allLetters);
  } else {
    searchLettersSet = new Set(Array.from(searchLetters));
  }

  const keyboardLetterComponentList = allLetters.map((letter, index) => {
    let searchedForClass;
    if (searchLettersSet.has(letter)) {
      searchedForClass = "searched-for";
    } else {
      searchedForClass = "not-searched-for";
    }
    return (
      <KeyBoardLetter
        key={index}
        letter={letter}
        searchedForClass={searchedForClass}
        onLetterClick={onLetterClick}
      />
    );
  });
  keyboardLetterComponentList.push(
    <DeleteButton key={allLetters.length} onDeleteClick={onDeleteClick} />
  );

  return (
    <div>
      <ul className="keyboard-letter-list">{keyboardLetterComponentList}</ul>
    </div>
  );
};

KeyboardLetterList.propTypes = {
  searchLetters: PropTypes.string.isRequired,
  searchedForAllLetters: PropTypes.bool.isRequired,
  allLetters: PropTypes.array.isRequired,
  onLetterClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default KeyboardLetterList;
