import React from "react";
import "./Letter.css";
import PropTypes from "prop-types";

const Letter = ({ letter }) => {
  return <li className="letter">{letter}</li>;
};

Letter.propTypes = {
  letter: PropTypes.string.isRequired,
};

export default Letter;
