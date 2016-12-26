import React, { Component } from 'react';
import { msToISOString } from './Common';

class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
    this.save = this.save.bind(this);
    this.resetTwoKeys = this.resetTwoKeys.bind(this);
    this.state = {secondsElapsed: 0};
    this.focused = true;

  }

  tick() {
    this.setState((prevState) => ({
      secondsElapsed: prevState.secondsElapsed + 1
    }));
  }

  reset() {
    this.setState({ secondsElapsed: 0});
  }

  start() {
    if (this.control.started) return;
    this.reset();
    this.interval = setInterval(() => this.tick(), 1000);
    this.control.started = true;
    document.querySelector('.App-logo').className += ' App-logo-anim';
  }
  save() {
    const {
      saveStopwatchTime,
    } = this.props;
    saveStopwatchTime(this.state.secondsElapsed);
  }

  stop() {
    clearInterval(this.interval);
    this.control.started = false
    document.querySelector('.App-logo').className = document.querySelector('.App-logo').className.replace(' App-logo-anim', '');
  }

  checkPCKeys(evt) {
    if (evt.ctrlKey) {
      if (!this.twoKeys.first) {
        this.twoKeys.first = true;
      } else if (this.twoKeys.first) {
        this.twoKeys.second = true;
      }
      if (this.twoKeys.first && this.twoKeys.second) {
        if (this.twoKeys.stop) {
          this.stop();
          this.twoKeys.stop = false;
        } else {
          this.start();
          this.twoKeys.stop = true;
        }
        this.twoKeys.first = false;
        this.twoKeys.second = false;
      }
    }
  }
  checkMacKeys(evt) {
    const key = evt.key;
    if (key === 'Meta') {
      if (!this.twoKeys.first) {
        this.twoKeys.first = true;
      } else if (this.twoKeys.first) {
        this.twoKeys.second = true;
      }
      if (this.twoKeys.first && this.twoKeys.second) {
        if (this.twoKeys.stop) {
          this.stop();
          this.twoKeys.stop = false;
        } else {
          this.start();
          this.twoKeys.stop = true;
        }
        this.twoKeys.first = false;
        this.twoKeys.second = false;
      }
    }
  }

  resetTwoKeys() {
    this.twoKeys = {
      first: false,
      second: false,
      stop: false,
    };
  }

  componentDidMount() {
    this.control = {
      started: false,
    }
    this.resetTwoKeys();
    document.onkeydown = (evt) =>  {
      if (!evt) evt = event;
      this.checkPCKeys(evt);
      this.checkMacKeys(evt);
    };

    window.onfocus = () => {
      this.focused = true;
    };
    window.onblur = () => {
      this.focused = false;
      console.info('window.onfocus');
      this.resetTwoKeys();
    };
  }

  render() {
    return (
      <div>
        <h2 id='stopwatch-display'>{msToISOString(this.state.secondsElapsed)}</h2>
        <button className="pure-button" id="stopwatch-start" onClick={this.start}>
          Iniciar
        </button> <button className="pure-button" id="stopwatch-stop" onClick={this.stop}>
          Parar
        </button> <button className="pure-button" id="stopwatch-saveTime" onClick={this.save}>
          Salvar Tempo
        </button> <button className="pure-button" id="stopwatch-discardTime" onClick={this.reset}>
          Descartar Tempo
        </button>
      </div>
    );
  }
}

export default Stopwatch;
