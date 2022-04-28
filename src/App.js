import './App.css';
import ReactAudioPlayer from 'react-audio-player';
import { useState } from 'react';

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


  return (
    <div className="App">
    <button onClick={() => setplayingSoundIndex(playingSoundIndex + 1)}>
      Next
    </button>

      <ReactAudioPlayer
        src={sounds[playingSoundIndex]}
        autoPlay
        controls
      />
    </div>
  );
}

export default App;
