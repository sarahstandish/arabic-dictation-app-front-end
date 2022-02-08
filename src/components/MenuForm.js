import "./MenuForm.css";
import React, { useState } from "react";
import LetterButtonList from "./LetterButtonList";
import PropTypes from "prop-types";
import Spinner from "./Spinner";

const MenuForm = ({ getWords, loading, loadingOn, focusHere }) => {
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
    loadingOn();
    let letters = null;
    if (!allLettersSelected) {
      letters = Array.from(selectedLetters).reduce(
        (str, curr) => (str += curr)
      );
    }
    getWords(letters);
  };

  const validSelection = () => selectedLetters.size >= 3;

  const fadeOutTime = loading ? "time-to-fade" : null;

  return (
    <div className="menu-form-container">
      {loading && <Spinner />}
      <form onSubmit={onSubmit} className={`menu-form ${fadeOutTime}`}>
        <p className="instructions" id="select-letter-instructions">
          Select three or more letters you want in your dictation words.
        </p>
        <LetterButtonList
          allLetters={allLetters}
          selectLetter={selectLetter}
          selectAllLetters={selectAllLetters}
          selectedLetters={selectedLetters}
          allLettersSelected={allLettersSelected}
        />
        <button
          className="button"
          type="submit"
          disabled={!validSelection()}
          ref={focusHere}
        >
          Go
        </button>
      </form>
    </div>
  );
};

MenuForm.propTypes = {
  getWords: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  loadingOn: PropTypes.func.isRequired,
  focusHere: PropTypes.func.isRequired,
};

export default MenuForm;
