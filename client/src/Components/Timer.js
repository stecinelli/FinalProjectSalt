import React, { useState, useRef, useEffect } from 'react'
import playButton from './Buttons/play-button-black.png'
import stopButton from './Buttons/stop-button-black.png'
import pauseButton from './Buttons/pause-button-black.png'
import { BiCaretDown, BiCaretUp } from "react-icons/bi";



const Timer = () => {
    //setting initial counter time and transition time
    const initialCounter = 6
    const transitionTime = 5
    //ref ensures there's only one interval set - you need to assign the interval id to ref to keep track of it
    const Ref = useRef(null);
    //defining states
    const [playing, setPlaying] = useState(false)
    const [counter, setCounter] = useState(initialCounter);
    const [isChanging, setIsChanging] = useState(false)
    const [selectedTime, setSelectedTime] = useState(initialCounter)
    const [minutes, setMinutes] = useState('')
    const [seconds, setSeconds] = useState('')
    const [autonext, setAutonext] = useState(true)
    const [timeModified, setTimeModified] = useState(false)




    //  checking [counter] every time it changes. handling transition.
    useEffect(() => {
        if (counter === -1) {
            if (isChanging) {
                setCounter(selectedTime)
                setIsChanging(false)
                if(!autonext) {
                    pauseTimer()
                }
                // document.getElementById('player').pause()
            }
            else {
                setCounter(transitionTime)
                setIsChanging(true)
                // document.getElementById('player').play()
            }
        }


        let mins = Math.floor(counter / 60)
        let secs = counter % 60
        if (mins <= 9) {mins = '0' + Number(mins)}
        if (secs <= 9) {secs = '0' + Number(secs)}
        setMinutes(mins)
        setSeconds(secs)
    }, [counter]);

    const editTimerMinutes = (newMinutes) => {
        setMinutes(newMinutes)
        setTimeModified(true)
        // setCounter(60 * minutes + seconds)
    }
    const editTimerSeconds = (newSeconds) => {
        setSeconds(newSeconds)
        setTimeModified(true)

        // setCounter(60 * minutes + seconds)
    }

    const adjustTime = () => {
        if(seconds > 59) {
            setSeconds(59)
        }
        if(minutes > 59) {
            setMinutes(59)
        }
        if (minutes <= 9) setMinutes('0' + Number(minutes))
        if (seconds <= 9) setSeconds('0' + Number(seconds))


    }

    const toggleAuto = () => {
        setAutonext(current => !current)
    }

    // just making the timer
    const timer = () => {

        if (playing) {
            return <> <input className='inputTimer' type="text" value={minutes} onBlur={e => adjustTime()} onChange={e => editTimerMinutes(e.target.value)} disabled
            /> : <input className='inputTimer' type="text" value={seconds} onBlur={e => adjustTime()} onChange={e => editTimerSeconds(e.target.value)} disabled /> </>
        }
        return <> <input className='inputTimer' type="text" value={minutes} onBlur={e => adjustTime()} onChange={e => editTimerMinutes(e.target.value)}
        /> : <input className='inputTimer'  type="text" value={seconds} onBlur={e => adjustTime()} onChange={e => editTimerSeconds(e.target.value)} /> </>



        // return (mins > 9 ? mins : '0' + mins) + ':'
        //     + (seconds > 9 ? seconds : '0' + seconds);
    }

    const startTimer = () => {
        
        const newTime = 60 * Number(minutes) + Number(seconds)
        if(timeModified) {
            setCounter(newTime)
            setSelectedTime(newTime)
            setTimeModified(false)
        }
      

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
        setCounter(selectedTime)
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
    //set the new initial counter with the number that has been selected, setting new counter and not letting it change while timer is running
    const increaseCounterMinutes = () => {
        if (!playing) {
            setCounter(count => count + 60)
            setSelectedTime(counter)
            setTimeModified(true)

        }
    }
    const decreaseCounterMinutes = () => {
        if (!playing) {
            if (counter >= 60) {
                setCounter(count => count - 60)
                

            }
            setSelectedTime(counter)
            setTimeModified(true)
        }
    }
    const decreaseCounterSeconds = () => {
        if (!playing) {

            if (counter >= 1) {
                setCounter(count => count - 1)
            }
            setSelectedTime(counter)
            setTimeModified(true)
        }
    }
    const increaseCounterSeconds = () => {
        if (!playing) {

            setCounter(count => count + 1)
            setSelectedTime(counter)
            setTimeModified(true)
        }
    }

    return (
        <div className='Timer'>
           <div className='buttons__up__down'> <BiCaretUp className='minutesUpButton' onClick={increaseCounterMinutes} />
            <BiCaretUp className='secondsUpButton' onClick={increaseCounterSeconds} />

            {timer()}
            <BiCaretDown className='minutesDownButton' onClick={decreaseCounterMinutes} />
            <BiCaretDown className='secondsDownButton' onClick={decreaseCounterSeconds} />
            </div>
            <br></br>
            <button onClick={stopTimer}><img src={stopButton} alt='stop' /></button>

            {button}
            <button onClick={toggleAuto}>Toggle auto: {autonext? "ON":"OFF"}</button>

        </div>
    )
}

export default Timer