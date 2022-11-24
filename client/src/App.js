import './App.css';
import FunnyWish from './Componets/FunnyWish';
import Sound from './Componets/Sound';
import Timer from './Componets/Timer';
import Names from './Componets/Names';
// import FunnyWish from '/Components/FunnyWish';
// import Sound from '/Components/Sound';
// import Timer from '/Components/Timer';
// import Names from './Components/Names';

function App() {

  return (
    <div className="App">
      <h3 className='hello'>Hello Kitties!</h3>
      <Sound />
      <Timer />
      <div className='names-and-wish-container'>
        <Names />
        <FunnyWish />
      </div>
    </div>
  );
}

export default App;
