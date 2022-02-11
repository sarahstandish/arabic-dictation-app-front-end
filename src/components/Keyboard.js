import "./Keyboard.css";
import React from "react";
import PropTypes from "prop-types";
import KeyboardLetterList from "./KeyboardLetterList";

const Keyboard = ({
  searchLetters,
  searchedForAllLetters,
  onLetterClick,
  onDeleteClick,
}) => {
  const allLetters = [
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
    "\u0623", // alif with hamza on top,
    "\u0625", // alif with hamza on bottom
    "\u0621", // independent hamza,
    "\u0624", // waw with hamza on top,
    "\u0626", // yaa with hamza on top
    "\u0622", // alif medda
  ];
  return (
    <KeyboardLetterList
      allLetters={allLetters}
      searchLetters={searchLetters}
      searchedForAllLetters={searchedForAllLetters}
      onLetterClick={onLetterClick}
      onDeleteClick={onDeleteClick}
    />
  );
};

Keyboard.propTypes = {
  searchLetters: PropTypes.string.isRequired,
  searchedForAllLetters: PropTypes.bool.isRequired,
  onLetterClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default Keyboard;
