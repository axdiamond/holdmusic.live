import './App.css';
import { useState, useRef } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { PauseBtnFill, PlayBtn, PlayBtnFill, Shuffle } from 'react-bootstrap-icons';

function App() {

  let sounds = [
    "/sounds/SuperMarioBros.mp3",
    "/sounds/ReturnOfTheLemmingShepards.mp3",
    "/sounds/TheCalling.wav",
    "/sounds/TheNymphaeum.wav",
    "/sounds/UrbanSunrise.mp3",
    "/sounds/WhatABeautifulSunset.wav",
  ];

  function randomIndex(not) {
    const selection = Math.floor(Math.random() * sounds.length - 1);
    return selection == not ? randomIndex(not) : selection;
  }

  let [playingSoundIndex, setplayingSoundIndex] = useState(randomIndex());
  let [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  if (audioRef.current?.audioEl?.current) {
    if (isPlaying) {
      audioRef.current.audioEl.current?.play();
    } else {
      audioRef.current.audioEl.current?.pause();
    }
  }

  return (
    <div className="App">
      <ReactAudioPlayer
        src={sounds[playingSoundIndex]}
        ref={audioRef}
        autoPlay={isPlaying}
        onEnded={() => setplayingSoundIndex(playingSoundIndex + 1)}
      />
      <div>
        <button className={isPlaying ? 'button' : 'play button'} onClick={() => setIsPlaying(!isPlaying)}> {isPlaying ? <PauseBtnFill /> : <PlayBtnFill />} </button>
      </div>

      <button className='button' onClick={() => {
        setplayingSoundIndex(playingSoundIndex + 1);
        setIsPlaying(true);
      }}>
        <Shuffle />
      </button>
    </div>
  );
}

export default App;


