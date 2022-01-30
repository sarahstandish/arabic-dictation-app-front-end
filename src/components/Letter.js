import React from "react";
import "./Letter.css";
import PropTypes from "prop-types";

const Letter = ({ key, letter }) => {
  return <li>{letter}</li>;
};

Letter.propTypes = {
  key: PropTypes.number.isRequired,
  letter: PropTypes.string.isRequired,
};

export default Letter;
