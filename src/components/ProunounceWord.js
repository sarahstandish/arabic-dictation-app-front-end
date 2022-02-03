import React, { useRef } from "react";
import "./PronounceWord.css";
import PropTypes from "prop-types";

const PronounceWord = ({ currWord, visibility }) => {
  // audioplayer
  // useRef will give you the same object on every render
  // mutating the .current property doesn't cause a rerender
  const audioPlayer = useRef();

  const playAudio = () => {
    audioPlayer.current.play();
  };

  return (
    <div className={`PronounceWord ${visibility.getClass("pronounceWord")}`}>
      <audio
        ref={audioPlayer} // React will set the ref's .current property to the corresponding DOM node whenever that node changes
        autoPlay
        src={currWord["audio_file"]}
        type="audio/mp3"
      ></audio>
      <button onClick={playAudio} className="button" id="pronounce-word-button">
        Listen
      </button>
    </div>
  );
};

PronounceWord.propTypes = {
  currWord: PropTypes.object.isRequired,
  visibility: PropTypes.object.isRequired,
};

export default PronounceWord;
