import './App.css';
import { useState, useRef, useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import AudioVisualizer from "@tiagotrindade/audio-visualizer"
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
  let [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  // Thank you to https://www.freemusicpublicdomain.com/royalty-free-on-hold-music/
  let sounds = [
    { src: "/sounds/ReturnOfTheLemmingShepards.mp3", title: "Return of the Lemming Shepherds", artist: "The Lemming Shepherds" },
    { src: "/sounds/TheCalling.wav", title: "The Calling", artist: "Angelwing" },
    { src: "/sounds/TheNymphaeum.wav", title: "The Nymphaeum (Part I & II)", artist: "Angelwing" },
    { src: "/sounds/UrbanSunrise.mp3", title: "Urban Sunrise", artist: "Steve Bass" },
    { src: "/sounds/WhatABeautifulSunset.wav", title: "What a beautiful Sunset!", artist: "Angelwing" },
  ];

  useEffect(() => {
    shuffleArray(sounds);
  })

  // trigger the audio element's play/pause
  if (audioRef.current?.current) {
    if (isPlaying) {
      audioRef.current.current?.play();
    } else {
      audioRef.current.current?.pause();
    }
  }

  const next = () => {
    let newIndex = playingSoundIndex + 1;

    if (newIndex > sounds.length - 1) {
      setplayingSoundIndex(0);
    } else {
      setplayingSoundIndex(newIndex);
    }
  };

  const back = () => {
    let newIndex = playingSoundIndex - 1;

    if (newIndex == -1) {
      setplayingSoundIndex(sounds.length - 1);
    } else {
      setplayingSoundIndex(newIndex);
    }
  };

  let playingSong = sounds[playingSoundIndex];

  return (
    <div className="App">
      <ReactAudioPlayer
        src={playingSong.src}
        autoPlay={isPlaying}
        ref={audioRef}
      />
      <div className='control-row'>
        {isPlaying &&
          <PauseBtnFill className='button' onClick={() => setIsPlaying(!isPlaying)} />
        }

        {!isPlaying &&
          <PlayBtnFill className='play button' onClick={() => setIsPlaying(!isPlaying)} />
        }
      </div>

      {isPlaying && <div className='control-row'>
        <SkipBackward className='button' onClick={() => {
          setIsPlaying(true);
          back();
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
      }
      {isPlaying && <div className='attribution'>
        <div className="title">{playingSong.title}</div>
        <div className="artist" >{playingSong.artist}</div>
      </div>
      }
    </div>
  );
}

export default App;
