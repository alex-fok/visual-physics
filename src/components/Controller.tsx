import './Controller.css'
import { Component } from 'solid-js'
import TimeSlider from './TimeSlider'

type ControllerProps = {
  time: number,
  setTime: (t: number) => void
  setIsPlayAnimation: (b : boolean) => void,
  duration: number
  setDuration: (t: number) => void
}

const displayTime = (time: number) => {
  const hundreths = Math.floor(time * 100 % 10)
  const tenths = Math.floor(time * 10 % 10)
  const ones = Math.round(Math.floor(time))
  return `${ones}.${tenths}${hundreths}`
}

const Controller:Component<ControllerProps> = (props) => {
  const startAnimation = () => {props.setIsPlayAnimation(true)}
  return (
    <div class='controller'>
      <div class='timer-text'>Time: {displayTime(props.time)} s</div>
      <div class='time-slider'>
        <button onClick={startAnimation}>Start</button>
        <TimeSlider
          time={props.time}
          duration={props.duration}
          setTime={props.setTime}
        />
        <input
          type='number'
          min='0.01'
          max='5.00'
          step='0.01'
          value={props.duration}
          onChange={(e) => {props.setDuration(parseFloat(e.target.value))}}
        />
      </div>
    </div>
  )
}

export default Controller;
