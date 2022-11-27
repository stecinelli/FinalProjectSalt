import './App.css';
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FunnyWish from './Components/FunnyWish';
import Sound from './Components/Sound';
import Timer from './Components/Timer';
import Names from './Components/Names';
import Share from './Components/Share';
// import FunnyWish from '/Components/FunnyWish';
// import Sound from '/Components/Sound';
// import Timer from '/Components/Timer';
// import Names from './Components/Names';

function App() {

  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path='/'>
          <div className="App">
            <h3 className='hello'>Hello Kitties!</h3>
            <Sound />
            <Timer />
            <div className='names-and-wish-container'>
              <Names />
              <FunnyWish />
            </div>
            <Share />
          </div>
    //     </Route>

    //     <Route path='/mob'>
    //       <div className="App">
    //         <h3 className='hello'>Hello Kitties!</h3>
    //         <Sound />
    //         <Timer />
    //         <div className='names-and-wish-container'>
    //           <Names />
    //           <FunnyWish />
    //         </div>
    //         <Share />
    //       </div>
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
