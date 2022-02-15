import "./DeleteButton.css";
import React from "react";
import PropTypes from "prop-types";

// a delete button for the on-screen keyboard
const DeleteButton = ({ onDeleteClick }) => {
  return (
    <li className="keyboard-letter" id="delete" onClick={onDeleteClick}>
      <i className="fas fa-eraser"></i>&nbsp;
      <i className="fas fa-arrow-right"></i>
    </li>
  );
};

DeleteButton.propTypes = {
  onDeleteClick: PropTypes.func.isRequired,
};

export default DeleteButton;
