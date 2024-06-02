import './Player.css'
import Stop from '../../assets/stop.svg'
import Previous from '../../assets/previous.svg'
import Play from '../../assets/play.svg'
import Pause from '../../assets/pause.svg'
import Next from '../../assets/next.svg'
import musics from '../../musics'
import { useRef, useState, useEffect } from 'react'

export default function Player({ musicInfo, setMusicInfo }) {
  const audioRef = useRef(null);
  const [iconPlayPause, setIconPlayPause] = useState(Play);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.1);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
  };

  function handlePlayPause() {

    if (audioRef.current.paused) {
      setIconPlayPause(Pause);
      audioRef.current.play();

    } else if (!audioRef.current.paused) {
      setIconPlayPause(Play);
      audioRef.current.pause();
    }
  }

  function handleStop() {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;

    setIconPlayPause(Play);
  }

  function handlePrevious() {
    if (audioRef.current.id > 1) {
      audioRef.current.src = musics[audioRef.current.id - 2].url;
      audioRef.current.id--;
      setMusicInfo(musics[audioRef.current.id - 1]);

    } else if (audioRef.current.id === 1) {
      audioRef.current.src = musics[musics.length - 1].url;
      audioRef.current.id = musics[musics.length - 1].id;
      setMusicInfo(musics[audioRef.current.id - 1]);
    }
  }

  function handleNext() {
    if (audioRef.current.id < musics.length) {
      audioRef.current.src = musics[audioRef.current.id].url;
      audioRef.current.id++;
      setMusicInfo(musics[audioRef.current.id - 1]);

    } else if (audioRef.current.id === musics.length) {
      audioRef.current.src = musics[0].url;
      audioRef.current.id = musics[0].id;
      setMusicInfo(musics[audioRef.current.id - 1]);

    }
  }

  function handleOnPlay() {
    setIconPlayPause(Pause);
  }

  function handleTimeUpdate(event) {
    const audioElement = event.target;
    setCurrentTime(audioElement.currentTime);
    setDuration(audioElement.duration);
  };

  function handleTimeChange(event) {
    const newTime = parseFloat(event.target.value);
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="player">
      <div className="music-info">
        <p className="music-name">{musicInfo.title}</p>
        <p className="singer">{musicInfo.artist}</p>
      </div>
      <div className='controls-progressbar'>
        <div className="controls">
          <audio src={musicInfo.url} ref={audioRef} id={musicInfo.id} autoPlay onPlay={handleOnPlay} onTimeUpdate={handleTimeUpdate}></audio>
          <img src={Previous} alt="previous icon" onClick={handlePrevious} />
          <img src={Stop} alt="stop icon" onClick={handleStop} />
          <img src={iconPlayPause} alt="play/pause icon" onClick={handlePlayPause} />
          <img src={Next} alt="next icon" onClick={handleNext} />
        </div>
        <div className='progress-bar'>
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleTimeChange}
          />
          <span>{formatTime(currentTime)}</span>
        </div>
      </div>
      <div className='volume-bar'>
        <label htmlFor="volume">Volume:<span>{Math.round(volume * 100)}%</span></label>
        <input
          type="range"
          id="volume"
          name="volume"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
}