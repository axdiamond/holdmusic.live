import './App.css';
import { useState, useRef } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { PauseBtnFill, PlayBtnFill, Shuffle, Re, SkipBackward, SkipForward, PlayBtn } from 'react-bootstrap-icons';


// https://stackoverflow.com/a/12646864
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function App() {

  // "/sounds/SuperMarioBros.mp3",

  let [playingSoundIndex, setplayingSoundIndex] = useState(0);
  let [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  let sounds = [
    "/sounds/ReturnOfTheLemmingShepards.mp3",
    "/sounds/TheCalling.wav",
    "/sounds/TheNymphaeum.wav",
    "/sounds/UrbanSunrise.mp3",
    "/sounds/WhatABeautifulSunset.wav",
  ];

  shuffleArray(sounds);


  // trigger the audio element's play/pause
  if (audioRef.current?.audioEl?.current) {
    if (isPlaying) {
      audioRef.current.audioEl.current?.play();
    } else {
      audioRef.current.audioEl.current?.pause();
    }
  }

  const next = () => {
    let newIndex = playingSoundIndex + 1;

    if (newIndex > sounds.length - 1) {
      setplayingSoundIndex(0);
    }

    setplayingSoundIndex(newIndex)
  };


  const back = () => {
    let newIndex = playingSoundIndex - 1;

    if (newIndex == -1) {
      setplayingSoundIndex(sounds.length - 1);
    } else {
      setplayingSoundIndex(newIndex)
    }
  };


  return (
    <div className="App">
      <ReactAudioPlayer
        src={sounds[playingSoundIndex]}
        ref={audioRef}
        autoPlay={isPlaying}
        onEnded={() => next()}
      />

      <div>
        {isPlaying &&
          <PauseBtnFill className='button' onClick={() => setIsPlaying(!isPlaying)} />
        }

        {!isPlaying &&
          <PlayBtnFill className='play button' onClick={() => setIsPlaying(!isPlaying)} />
        }
      </div>

      <div className='control-row'>
        <SkipBackward className='button' onClick={() => {
          setIsPlaying(true);
          next();
        }} />

        <Shuffle className='button' onClick={() => {
          shuffleArray(sounds);
          setIsPlaying(true);
          next();
        }} />

        <SkipForward className='button' onClick={() => {
          next();
        }} />
      </div>

    </div>
  );
}

export default App;
