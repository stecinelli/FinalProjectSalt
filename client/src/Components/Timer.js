import { useState, useRef, useEffect } from 'react'


const Timer = () => {
    const Ref = useRef(null);
    const [timer, setTimer] = useState('00:00');

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        return {
            total, minutes, seconds
        };
    }

    const startTimer = (e) => {
        let { total, minutes, seconds }
            = getTimeRemaining(e);
        if (total >= 0) {

            setTimer(
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }
    const stopTimer = () => {
        setTimer('00:10');
        document.querySelector('#counter').remove()
    }



const clearTimer = (e) => {


    setTimer('00:10');

    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
        startTimer(e);
    }, 1000)
    Ref.current = id;
}

const getDeadTime = () => {
    let deadline = new Date();

    // This is where you need to adjust if 
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds() + 10);
    return deadline;
}

// // We can use useEffect so that when the component
// // mount the timer will start as soon as possible

// // We put empty array to act as componentDid
// // mount only
useEffect(() => {
    clearTimer(getDeadTime());
}, []);


const onClickReset = () => {
    clearTimer(getDeadTime());}


    return (
        <div className="App">
            <h2>{timer}</h2>
            <button onClick={stopTimer}>STOP</button>
            <button onClick={onClickReset}>Reset</button>
        </div>
    )
}


export default Timer