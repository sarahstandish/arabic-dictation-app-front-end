import "./PronounceWord.css";
import React, { useRef } from "react";
import PropTypes from "prop-types";

const PronounceWord = ({ currWord }) => {
  // audioplayer
  // useRef will give you the same object on every render
  // mutating the .current property doesn't cause a rerender
  const UA = navigator.userAgent;
  const isIOS = /\b(iPad|iPhone|iPod)\b/.test(UA) && /WebKit/.test(UA);
  // const isSafari = /^((?!chrome|android).)*safari/i.test(UA);

  const audioPlayer = useRef();

  const playAudio = () => {
    audioPlayer.current.play();
  };

  return (
    <div className="pronounce-word">
      <audio
        ref={audioPlayer} // React will set the ref's .current property to the corresponding DOM node whenever that node changes
        autoPlay
        src={currWord.audio_file}
        type="audio/mp3"
      ></audio>
      <button onClick={playAudio} className="button" id="pronounce-word-button">
        <i className="fas fa-volume-up"></i>
      </button>
    </div>
  );
};

PronounceWord.propTypes = {
  currWord: PropTypes.object.isRequired,
};

export default PronounceWord;
