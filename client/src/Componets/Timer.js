import React, { useState, useRef, useEffect } from 'react'


const Timer = () => {
    const initialCounter = 250
    const Ref = useRef(null);
    const [playing, setPlaying] = useState(false)
    const [counter, setCounter] = useState(initialCounter);
    const formatTimer = (count) => {
        const mins = Math.floor(count / 60)
        const seconds = count % 60;


        return (mins > 9 ? mins : '0' + mins) + ':'
            + (seconds > 9 ? seconds : '0' + seconds);
    }

    const startTimer = () => {

        if (Ref.current) clearInterval(Ref.current);

        const id = setInterval(() => {
            setCounter(count => count - 1);
        }, 1000)

        Ref.current = id;
        setPlaying(true)
    }
    const pauseTimer = () => {
        if (Ref.current) clearInterval(Ref.current)
        setPlaying(false)
    }

    const stopTimer = () => {

        pauseTimer()
        setCounter(initialCounter)
    }
    
    
    
    let button;
    if (playing) {
        button = <button onClick={pauseTimer}>Pause</button>;

    } else {
        button = <button onClick={startTimer}>Start</button>;
    }

    return (
        <div className='timer'>
            <div>{formatTimer(counter)}</div>
            <button onClick={stopTimer}>STOP</button>
            {button}

        </div>

    )
}

export default Timer