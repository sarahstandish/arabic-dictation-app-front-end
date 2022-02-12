import "./FeedbackLetterList.css";
import React from "react";
import PropTypes from "prop-types";
import FeedbackLetter from "./FeedbackLetter.js";

const FeedbackLetterList = ({ wordArr }) => {
  const diacritics = new Set([
    "\u0650", // kesra
    "\u064F", // damma
    "\u064E", // fatha
    "\u0651", // shadda
    "\u0652", // sukuun
    "\u0670", // dagger alif
  ]);

  const dontConnectAfter = new Set([
    "\u0627", // alif
    "\u062F", // daal
    "\u0630", // dhaal,
    "\u0631", // raa,
    "\u0632", // zay
    "\u0648", // waaw
    "\u064A", // yaa
    "\u0621", // independent hamza,
    "\u0629", // taa marbuuta
    "\u0649", // alif maqsuura
    "\u0623", // alif with hamza on top,
    "\u0625", // alif with hamza on bottom
    "\u0624", // waw with hamza on top,
    "\u0622", // alif medda
  ]);

  // Notes
  // independent letters are not harmed by having a zwj after them
  // because there is just no way for them to connect after
  // they are only harmed by having one before them

  const letterComponentList = wordArr.map((letter, index) => {
    return <FeedbackLetter key={index} letter={letter} />;
  });
  return <p className="feedback-letter-list">{letterComponentList}</p>;
};

FeedbackLetterList.propTypes = {
  wordArr: PropTypes.array,
};

export default FeedbackLetterList;
