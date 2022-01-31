import React, { useState } from "react";
import "./MenuForm.css";
import LetterButtonList from "./LetterButtonList";
import PropTypes from "prop-types";

const MenuForm = ({ visibility, changeVisibility, getWords }) => {
  const allLetters = new Set([
    "\u0627", // alif
    "\u0628", // baa
    "\u062A", // taa
    "\u062B", // thaa
    "\u062C", // jeem
    "\u062D", // Haa
    "\u062E", // khaa
    "\u062F", // daal
    "\u0630", // dhaal,
    "\u0631", // raa,
    "\u0632", // zay
    "\u0633", // seen
    "\u0634", // sheen
    "\u0635", // saad
    "\u0636", // daad
    "\u0637", // taa
    "\u0638", // dhaa
    "\u0639", // ayn
    "\u063A", // ghayn
    "\u0641", // faa
    "\u0642", // qaaf
    "\u0643", // kaaf
    "\u0644", // laam
    "\u0645", // meem
    "\u0646", // nuun
    "\u0647", // haa
    "\u0648", // waaw
    "\u064A", // yaa
    "\u0629", // taa marbuuta
    "\u0649", // alif maqsuura
    "\u0623\u0625", // alif with hamza on top, alif with hamza on bottom
    "\u0627\u064B", // tanween fatha
    "\u0621\u0624\u0626", // independent hamza, waw with hamza on top, yaa with hamza on top
    "\u0622", // alif medda
  ]);

  // a set of the letters the user has selected
  const [selectedLetters, setSelectedLetters] = useState(new Set());

  // whether the user has pressed the 'all letters' button
  const [allLettersSelected, setAllLettersSelected] = useState(false);

  const selectLetter = (letter) => {
    console.log("You clicked on the letter", letter);

    const selectedLettersCopy = new Set(selectedLetters);

    // if the letter is in the set, delete it
    if (selectedLettersCopy.has(letter)) {
      selectedLettersCopy.delete(letter);
    } else {
      // if the letter is not in the set, add it
      selectedLettersCopy.add(letter);
    }

    // if all letters was selected and we're not subtracting letters
    // unselect the 'all letters' button
    if (allLettersSelected) {
      setAllLettersSelected(!allLettersSelected);
    }

    setSelectedLetters(selectedLettersCopy);
  };

  const selectAllLetters = () => {
    if (!allLettersSelected) {
      setSelectedLetters(allLetters);
    } else {
      setSelectedLetters(new Set());
    }

    setAllLettersSelected(!allLettersSelected);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    changeVisibility("menuForm");

    let letters = null;
    if (!allLettersSelected) {
      letters = Array.from(selectedLetters).reduce(
        (str, curr) => (str += curr)
      );
    }
    getWords(letters);
  };

  // set visibility class of component
  const visible = visibility ? "visible" : "invisible";

  return (
    <form onSubmit={onSubmit} className={`MenuForm ${visible}`}>
      <p className="instructions" id="select-letter-instructions">
        Select three or more letters
      </p>
      <LetterButtonList
        allLetters={allLetters}
        selectLetter={selectLetter}
        selectAllLetters={selectAllLetters}
        selectedLetters={selectedLetters}
        allLettersSelected={allLettersSelected}
      />
      <button className="button" type="submit">
        Submit
      </button>
    </form>
  );
};

MenuForm.propTypes = {
  changeVisibility: PropTypes.func.isRequired,
  visibility: PropTypes.bool.isRequired,
  getWords: PropTypes.func.isRequired,
};

export default MenuForm;
