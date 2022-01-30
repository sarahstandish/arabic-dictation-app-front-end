import React, { useState } from "react";
import "./MenuForm.css";
import LetterList from "./LetterList";

const MenuForm = ({ visibility }) => {
  const [selectedLetters, setSelectedLetters] = useState(new Set());

  const changeSelectedLetters = (letter) => {
    console.log("You clicked on the letter", letter);

    const selectedLettersCopy = new Set(selectedLetters);

    // if the letter is in the set, delete it
    if (selectedLettersCopy.has(letter)) {
      selectedLettersCopy.delete(letter);
    } else {
      // if the letter is not in the set, add it
      selectedLettersCopy.add(letter);
    }

    setSelectedLetters(selectedLettersCopy);
  };

  return (
    <form className={`MenuForm ${!visibility ? "invisible" : null}`}>
      This is the Menu Form component
      <LetterList
        onClick={changeSelectedLetters}
        selectedLetters={selectedLetters}
      />
    </form>
  );
};

export default MenuForm;
