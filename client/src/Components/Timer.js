import React, { useState, useRef, useEffect } from 'react'


const Timer = () => {
    //setting initial counter time and transition time
    const initialCounter = 15
    const transitionTime = 5
    //ref ensures there's only one interval set - you need to assign the interval id to ref to keep track of it
    const Ref = useRef(null);
    //defining states
    const [playing, setPlaying] = useState(false)
    const [counter, setCounter] = useState(initialCounter);
    const [isChanging, setIsChanging] = useState(false)
    
    //  checking [counter] every time it changes. handling transition.
    useEffect(() => {
if (counter === -1) {
    if (isChanging) {
        setCounter(initialCounter)
        setIsChanging(false)
    }
    else {
        setCounter(transitionTime)
        setIsChanging (true)
    }
}
      }, [counter]);
// just making the timer
    const formatTimer = (count) => {
        const mins = Math.floor(count / 60)
        const seconds = count % 60;


        return (mins > 9 ? mins : '0' + mins) + ':'
            + (seconds > 9 ? seconds : '0' + seconds);
    }

    const startTimer = () => {
//clearing the interval - ref holds the id of the interval. if we didnt have this it would speed up every time we clicked start
        if (Ref.current) clearInterval(Ref.current);
// calling a function that reduces out counter by one every second. setting minimum of -1 (we had zero before but didn't work)
        const id = setInterval(() => {
            setCounter(count => Math.max(-1, count - 1))
        }, 1000)
// this is useful for pausing, clearing and starting timer. it will allow us to call clear interval function
        Ref.current = id;
        setPlaying(true)
    }
    const pauseTimer = () => {
        // this is how we clear the interval - stop the ticking. 
        if (Ref.current) clearInterval(Ref.current)
        setPlaying(false)
    }

    const stopTimer = () => {

        pauseTimer()
        setCounter(initialCounter)
    }
//my button alternates between stop and start based on state.
// for now all we do with playing is set the button
    let button;
    if (playing) {
        button = <button onClick={pauseTimer}>Pause</button>;

    } else {
        button = <button onClick={startTimer}>Start</button>;
    }

    return (
        <div>
            <div>{formatTimer(counter)}</div>
            <button onClick={stopTimer}>STOP</button>
            {button}
        </div>
    )
}

export default Timer