import { useState, useEffect, useRef } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'


function Pomodoro() {
  const [breaktime, setBreaktime] = useState(5);
  const [session, setSession] = useState(25);
  const [timeLeft, setTimeLeft] = useState(1500);
  const [timerState, setTimerState] = useState(false);
  const [titleword, setTitleword] = useState('Session');
  const [isPlaying, setIsPlaying] = useState(false);
  const minuteSeconds = 60;
  
  let timer;
  const drumAudio = useRef(null)

  const playSound = (url) => {
    drumAudio.current.play();
  };

  const  pauseSound = (url) => {
    drumAudio.current.pause();
    drumAudio.current.currentTime = 0;
  }

  const start = () => {
    setTimerState(!timerState);
    setIsPlaying(!isPlaying)
  };

  const handleBreakDecrement = (e) => {
    if (timerState === false && breaktime > 1) {
      setBreaktime(breaktime - 1);
    }
  };

  const handleSessionDecrement = (e) => {
    if (timerState === false && session > 1) {
      setSession(session - 1);
      setTimeLeft(timeLeft - 60);
    }
  };

  const handleBreakIncrement = (e) => {
    if (timerState === false && breaktime < 60) {
      setBreaktime(breaktime + 1);
    }
  };

  const handleSessionIncrement = (e) => {
    if (timerState === false && session < 60) {
      setSession(session + 1);
      setTimeLeft(timeLeft + 60);
    }
  };

  useEffect(() => {
    if (timerState  && timeLeft > 0) {
     setIsPlaying(true)
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      playSound();

      if (titleword === 'Session') {
        setTimeLeft(breaktime * 60);
        setTitleword('Break');
        setIsPlaying(true)
      }
      if (titleword === 'Break') {
        setTimeLeft(session * 60);
        setTitleword('Session');
        setIsPlaying(true)
      }
    }
  }, [timeLeft, breaktime, session, titleword, timerState, isPlaying]);

  const handleReset = (e) => {
    clearInterval(timer);
    setTimeLeft(1500);
    setBreaktime(5);
    setSession(25);
    setTitleword('Session');
    setTimerState(false);
    setIsPlaying(false);
    pauseSound();
    drumAudio.currentTime = 0;
  };

  const timeCounter = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const secondsLeft = seconds < 10 ? '0' + seconds : seconds;
    const minutesLeft = minutes < 10 ? '0' + minutes : minutes;
    return `${minutesLeft}:${secondsLeft}`;
  };

  return (
    <div className="clockApp">
      <h1>Pomodoro Clock</h1>
      <div className="container">
        <div className="break-cont">
          <h2>Break Length</h2>
          <div id="break-label">
            <button onClick={handleBreakDecrement} id="break-decrement">
              <i className="bi bi-arrow-down arrow"></i>
            </button>
            <div id="break-length" className="time">
              {breaktime}
            </div>
            <button id="break-increment" onClick={handleBreakIncrement}>
              <i className="bi bi-arrow-up arrow"></i>
            </button>
          </div>
        </div>

        <div className="break-cont">
          <h2 id="session-label">Session Length</h2>
          <div id="session-label">
            <button onClick={handleSessionDecrement} id="session-decrement">
              <i className="bi bi-arrow-down arrow"></i>
            </button>
            <div id="session-length" className="time">
              {session}
            </div>
            <button id="session-increment" onClick={handleSessionIncrement}>
              <i className="bi bi-arrow-up arrow"></i>
            </button>
          </div>
        </div>
      </div>

 
      <div className="circular">
        <div className="inner"></div>
        <div className="dispaly">
          <h2 id="timer-label">{titleword}</h2>
          <div id="time-left"> {timeCounter()}</div>
        </div>
       
        <CountdownCircleTimer
        isPlaying={isPlaying}
        size = {200}
        strokeWidth = {16}
        initialRemainingTime={timeLeft}
        duration = {minuteSeconds}
        colors={["#f86903"]}
        >
        </CountdownCircleTimer>
      </div>

      <div className="buttons">
        <button id="start_stop" onClick={start}>
          {timerState ? (
            <i className="bi bi-pause-circle control"></i>
          ) : (
            <i className="bi bi-play-circle control"></i>
          )}
        </button>
        <button id="reset">
          <i
            className="bi bi-arrow-clockwise control"
            onClick={handleReset}
          ></i>
        </button>
      </div>

      <audio id="beep" type="audio/mpeg" preload="auto" ref={drumAudio} src="https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Rides/278[kb]three_ride_hits.wav.mp3">
      </audio>
    </div>
  );
}

export default Pomodoro;
