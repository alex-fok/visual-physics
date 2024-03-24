import { Component } from 'solid-js'
import './TimeSlider.css'

type TimeSliderProps = {
  time: number,
  setTime: (t: number) => void
}

const TimeSlider: Component<TimeSliderProps> = (props) => {
  return (
    <div class='slideContainer'>
      <input
        class='timeSlider'
        type='range'
        min='0'
        max='500'
        value={props.time * 100}
        onInput={(event) => {
          props.setTime(Number.parseFloat(event.target.value) / 100)}}
      />
    </div>
  )
}

export default TimeSlider
