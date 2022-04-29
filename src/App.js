import './App.css';
import { useState, useRef } from 'react';
import ReactAudioPlayer from 'react-audio-player';

function App() {
  
  let sounds = [
    "/sounds/SuperMarioBros.mp3",
    "/sounds/ReturnOfTheLemmingShepards.mp3",
    "/sounds/TheCalling.wav",
    "/sounds/TheNymphaeum.wav",
    "/sounds/UrbanSunrise.mp3",
    "/sounds/WhatABeautifulSunset.wav",
  ];

  let randomStart = Math.floor(Math.random() * sounds.length - 1);

  let [playingSoundIndex, setplayingSoundIndex] = useState(randomStart);
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
      <button onClick={() => { 
          setplayingSoundIndex(playingSoundIndex + 1);
          setIsPlaying(true);
        }}>
        Shuffle
      </button>

      
    <ReactAudioPlayer
      src={sounds[playingSoundIndex]}
      ref={audioRef}
      autoPlay={isPlaying}
    />

      <div> 
        <button onClick={() => setIsPlaying(true)}>▶️</button>
        <button onClick={() => setIsPlaying(false)}>⏸️</button>
      </div>
    </div>
  );
}

export default App;


