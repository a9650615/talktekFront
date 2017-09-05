import React, { Component } from 'react'
import ButtonBase from 'material-ui/Button'
import Slider from 'rc-slider'
import IconButton from 'material-ui/IconButton'
import PlayArrow from 'material-ui-icons/PlayArrow'
import Pause from 'material-ui-icons/Pause'

class audioPlayer extends Component {
  audio = null
  timer = null
  playRateList = [0.5, 0.75, 1, 1.5, 2]

  state = {
    duration: null,
    play: false,
    drag: false,
    seekTime: 0,
    rateType: 2
  }

  speedButtonTheme = {
    background: 'rgba(0,0,0,0)',
    margin: '0 10px'
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

  _changeRate = () => {
    let type = this.state.rateType + 1
    if (type > this.playRateList.length - 1)
      type = 0

    this.audio.playbackRate = this.playRateList[type]
    this.setState({
      rateType: type
    })
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

  _renderPlayButton = () => 
    this.state.play?
    <Pause style={{width: 40, height: 40}}/> :
    <PlayArrow style={{width: 40, height: 40}}/>

  render() {
    const {seekTime} = this.state
    return (
      <div className="audioPlayer">
        <IconButton 
          color="accent" 
          className="controlButton"
          onClick={this._togglePlay}
        >
          {this._renderPlayButton()}
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
        <ButtonBase 
          onClick={this._changeRate}
          style={this.speedButtonTheme}
        >
          x {this.playRateList[this.state.rateType]}
        </ButtonBase>
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
