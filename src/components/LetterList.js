import React from "react";
import "./LetterList.css";
import Letter from "./Letter.js";
import PropTypes from "prop-types";

const LetterList = ({ onClick, selectedLetters }) => {
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
    "\u0623\u0625", // alif with hamza on top, alif with hamza on bottom
    "\u0627\u064B", // tanween fatha
    "\u0621\u0624\u0626", // independent hamza, waw with hamza on top, yaa with hamza on top
    "\u0622", // alif medda
  ];

  const letterComponentList = allLetters.map((letter) => {
    let selected = "not-selected";
    if (selectedLetters.has(letter)) {
      selected = "selected";
    }
    return (
      // key is the unicode point value of the last character in the string (to make sure all are unique)
      <Letter
        key={letter.charCodeAt(letter.length - 1)}
        letter={letter}
        onClick={onClick}
        selected={selected}
      />
    );
  });

  return <ul className="letter-component-list">{letterComponentList}</ul>;
};

LetterList.propTypes = {
  onClick: PropTypes.func.isRequired,
  selectedLetters: PropTypes.object.isRequired,
};

export default LetterList;