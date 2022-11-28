import React, { useState, useRef, useEffect, useContext } from 'react'
import playButton from './Buttons/play-button-black.png'
import stopButton from './Buttons/stop-button-black.png'
import pauseButton from './Buttons/pause-button-black.png'
import { BiCaretDown, BiCaretUp } from "react-icons/bi"

import MainContext from '../Context'


const Timer = () => {
    //setting initial counter time and transition time
    const { initialCounter } = useContext(MainContext)
    const transitionTime = 5
    //ref ensures there's only one interval set - you need to assign the interval id to ref to keep track of it
    const Ref = useRef(null)
    //defining states
    const { playing, setPlaying } = useContext(MainContext)
    const { counter, setCounter } = useContext(MainContext)
    const { isChanging, setIsChanging } = useContext(MainContext)

    //  checking [counter] every time it changes. handling transition.
    useEffect(() => {
        if (counter === -1) {
            if (isChanging) {
                setCounter(initialCounter)
                setIsChanging(false)
                document.getElementById('player').pause()
            }
            else {
                setCounter(transitionTime)
                setIsChanging(true)
                document.getElementById('player').play()
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
        button = <button onClick={pauseTimer}>
            <img src={pauseButton} alt='pause' />
        </button>;

    } else {
        button = <button onClick={startTimer}>
            <img src={playButton} alt='play' />
        </button>;
    }
    const increaseCounterMinutes = () => {
        setCounter(count => count + 60)
    }
    const decreaseCounterMinutes = () => {
        if (counter >= 60) {
            setCounter(count => count - 60)
        }
    }
    const decreaseCounterSeconds = () => {
        if (counter >= 1) {
            setCounter(count => count - 1)
        }
    }
    const increaseCounterSeconds = () => {
        setCounter(count => count + 1)
    }

    return (
        <div className='Timer'>
            <div className='top-of-clock'>
                <BiCaretUp className='minutesUpButton change-time-button' onClick={increaseCounterMinutes} />
                <BiCaretUp className='secondsUpButton change-time-button' onClick={increaseCounterSeconds} />
            </div>
            <div className='clock-view'>{formatTimer(counter)}</div>
            <div className='bottom-of-clock'>
                <BiCaretDown className='minutesDownButton change-time-button' onClick={decreaseCounterMinutes} />
                <BiCaretDown className='secondsDownButton change-time-button' onClick={decreaseCounterSeconds} />
            </div>

            <br></br>
            <div className='two-buttons'>
                <button onClick={stopTimer}><img src={stopButton} alt='stop' /></button>
                {button}
            </div>

        </div>
    )
}

export default Timer