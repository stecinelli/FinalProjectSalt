import './App.css';
import FunnyWish from './Components/FunnyWish';
import Sound from './Components/Sound';
import Timer from './Components/Timer';
import Names from './Components/Names';

function App() {
  
  return (
    <div className="App">
      <h3>Hello Kitties!</h3>
      <Sound />
      <Timer />
      <Names />
      <FunnyWish />
    </div>
  );
}

export default App;
