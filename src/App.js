
import './App.css';
import Pomodoro from './Pomodoro';
import birds from './birds_video.mp4';


function App() {
  return (
    <div className="App">
      <video src={birds} autoPlay="autoplay" loop="loop" muted type="video/mp4" id="bgc-video"/>
     <Pomodoro />
    </div>
  );
}

export default App;
