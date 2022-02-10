import "./DeleteButton.css";
import React from "react";
import PropTypes from "prop-types";

const DeleteButton = ({ onDeleteClick }) => {
  return (
    <li className="keyboard-letter" id="delete" onClick={onDeleteClick}>
      <i class="fas fa-eraser"></i>&nbsp;
      <i class="fas fa-arrow-right"></i>
    </li>
  );
};

DeleteButton.propTypes = {
  onDeleteClick: PropTypes.func.isRequired,
};

export default DeleteButton;
