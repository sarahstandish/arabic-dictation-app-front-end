import React from "react";
import "./Letter.css";
import PropTypes from "prop-types";

const Letter = ({ letter, onClick, selected }) => {
  return (
    <li className={`letter ${selected}`} onClick={() => onClick(letter)}>
      {letter}
    </li>
  );
};

Letter.propTypes = {
  letter: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selecte: PropTypes.string.isRequired,
};

export default Letter;
