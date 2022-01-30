import React from "react";
import "./MenuForm.css";
import LetterList from "./LetterList";

const MenuForm = ({ visibility }) => {
  return (
    <form className={`MenuForm ${!visibility ? "invisible" : null}`}>
      This is the Menu Form component
      <LetterList className="LetterList" />
    </form>
  );
};

export default MenuForm;
