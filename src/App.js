import React, { Component } from 'react';
import './App.css';
import Clock from './clock'
import TimeList from './timeList'
import ActionRow from './actionRow'
import MusicRow from './musicRow'
import About from './about'
import ModeRow from './modeRow'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updatedTime: '25', action: "", value: "start", playMusic: false,
      isStopMusic: false, isWorkMode: true, chosenTitle: "work mode"
    }
  }

  changeTime = (newTime) => {
    this.setState((state, props) => {
      return {
        updatedTime: newTime,
        action: "timeChanged"
      }
    });
    this.setState({ value: "pause" });
  }

  activateAction = (value) => {
    if (value === "start") {
      this.setState({ value: "pause", playMusic: false, isStopMusic: true });
    } else if (value === "pause" || value === "reset") {
      this.setState({ value: "start", playMusic: false, isStopMusic: true });
    }
    this.setState({ action: value, playMusic: false });
  }

  finished = () => {
    this.setState({
      playMusic: true,
      action: "reset",
      value: "start",
      isStopMusic: false,
      updatedTime: this.state.isWorkMode ? '05' : '25',
      chosenTitle: this.state.isWorkMode ? 'break mode' : 'work mode',
      isWorkMode: !this.state.isWorkMode
    })
  }

  // stopMusic = () => {
  // }

  modeBtnClicked = (title) => {
    if (title === "work mode") {
      this.setState({ isWorkMode: true, updatedTime: '25', chosenTitle: 'work mode' })
    } else {
      this.setState({ isWorkMode: false, updatedTime: '05', chosenTitle: 'break mode' })
    }
    this.activateAction("reset");
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <ModeRow modeBtnClicked={this.modeBtnClicked} chosenTitle={this.state.chosenTitle} />
          <Clock newTime={this.state.updatedTime} action={this.state.action} finished={this.finished} stopMusicFunc={this.stopMusic} />
          <TimeList changeTime={this.changeTime} isWorkMode={this.state.isWorkMode} />
          <ActionRow activateAction={this.activateAction} value={this.state.value} />
        </div>
        <MusicRow videoChosen={this.videoChosen} playMusic={this.state.playMusic} stopMusic={this.state.isStopMusic} />
        <About />
      </div>
    );
  }
}

export default App;
