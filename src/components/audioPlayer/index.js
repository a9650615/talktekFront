import React, { Component } from 'react'
import Slider from 'rc-slider'
import IconButton from 'material-ui/IconButton'
import PlayArrow from 'material-ui-icons/PlayArrow'
import Pause from 'material-ui-icons/Pause'

class audioPlayer extends Component {
  audio = null
  timer = null

  state = {
    duration: null,
    play: false,
    drag: false,
    seekTime: 0
  }

  _updateInfo() {
    const { currentTime, duration} = this.audio
    // console.log(currentTime, duration)
    if (this.audio.readyState > 3) {
      // console.log(this.state.drag)
      this.setState({
        duration,
        play: !this.audio.paused,
        seekTime: this.state.drag? this.state.seekTime: currentTime
      })
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.src) {
      this._changeAudio(nextProps.src)
    }  
  }

  componentDidMount() {
    if (window) {
      require('./playerStyle.scss')
      this.audio = document.createElement('audio')
      this.timer = setInterval(this._updateInfo.bind(this), 700)
      this._changeAudio(this.props.src)
    }
  }

  componentWillUnmount() {
    this.audio.remove()
    clearInterval(this.timer)
  }

  _changeAudio(url) {
    if (url) {
      this.audio.src = url
      this.audio.load()
      // this.audio.play()
    }
  }

  _togglePlay = () => {
    this.audio.paused? 
      this.audio.play():
      this.audio.pause()
    this._updateInfo()
  }

  _changeBar = (value) => {
    this.setState({
      seekTime: value
    })
  }

  _seekAudio = (value) => {
    this.audio.currentTime = value
    this.setState({
      drag: false
    })
  }

  _startDrag = () => {
    this.setState({
      drag: true
    })
  }
  
  formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    minutes = (minutes >= 10) ? minutes : "0" + minutes;
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    return minutes + ":" + seconds;
  }

  render() {
    const {seekTime} = this.state
    return (
      <div className="audioPlayer">
        <IconButton 
          color="accent" 
          className="controlButton"
          onClick={this._togglePlay}
        >
          {
            this.state.play?
            <Pause style={{width: 40, height: 40}}/> :
            <PlayArrow style={{width: 40, height: 40}}/>
          }
        </IconButton>
        <Slider 
          className="slideBar" 
          min={0}
          max={this.state.duration}
          step={1}
          value={seekTime===-1?null: seekTime}
          onBeforeChange={this._startDrag}
          onChange={this._changeBar}
          onAfterChange={this._seekAudio}
          />
        <div className="timer">
          {this.formatTime(this.state.seekTime)}/{this.formatTime(this.state.duration)}
        </div>
        {/* <noscript>
          <audio src={this.props.src} controls />
        </noscript> */}
      </div>
    )
  }
}

export default audioPlayer
