import React, { Component } from 'react';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import moment from 'moment';

import logo from './logo.svg';
import './App.css';
import { config } from './Config.js';

function msToISOString(ms) {
  var sec_num = parseInt(ms, 10); // don't forget the second param
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return hours+':'+minutes+'.'+seconds;
}

class MyTimes extends Component {
  render() {
    if (!this.props.myTimes) {
      return null;
    }
    return (
      <fieldset>
        <legend>Meus Tempos</legend>
        <ul>
          {this.props.myTimes.map(myTime => (
            <li key={myTime.key}>{new Date(myTime.date).toLocaleDateString()} - {msToISOString(myTime.time)}</li>
          ))}
        </ul>
      </fieldset>
    )
  }
}

class BestTimes extends Component {
  render() {
    if (!this.props.times) {
      return null;
    }
    return (
      <fieldset>
        <legend>Melhores Tempos</legend>
        <ul>
          {this.props.times.map(time => (
            <li key={time.key}>
              {new Date(time.date).toLocaleDateString()} - 
              {time.displayName} -
              <strong>{msToISOString(time.time)}</strong></li>
          ))}
        </ul>
      </fieldset>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.startStopwatch = this.startStopwatch.bind(this);
    this.stopStopwatch = this.stopStopwatch.bind(this);
    this.saveStopwatchTime = this.saveStopwatchTime.bind(this);
    this.state = {secondsElapsed: 0};
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
          this.stopStopwatch();
          this.twoKeys.stop = false;
        } else {
          this.startStopwatch();
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
          this.stopStopwatch();
          this.twoKeys.stop = false;
        } else {
          this.startStopwatch();
          this.twoKeys.stop = true;
        }
        this.twoKeys.first = false;
        this.twoKeys.second = false;
      }
    }
  }
  componentDidMount() {
    this.stopwatchControl = {
      started: false,
    }
    this.twoKeys = {
      first: false,
      second: false,
      stop: false,
    };
    document.onkeydown = (evt) =>  {
      if (!evt) evt = event;
      this.checkPCKeys(evt);
      this.checkMacKeys(evt);
    };
    firebase.initializeApp(config);

    const uiConfig = {
      signInSuccessUrl: 'https://cronometro-cubomagico.firebaseapp.com/',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ],
      tosUrl: 'https://cronometro-cubomagico.firebaseapp.com/'
    };
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', uiConfig);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        this.setState({
          email,
          displayName,
        });
        this.loadMyTimes();
        this.loadTimes();
      } else {
        // User is signed out.
        document.getElementById('sign-in-status').textContent = 'Signed out';
        document.getElementById('sign-in').textContent = 'Sign in';
        document.getElementById('account-details').textContent = 'null';
      }
    });
  }

  tick() {
    this.setState((prevState) => ({
      secondsElapsed: prevState.secondsElapsed + 1
    }));
  }

  resetStopwatch() {
    this.setState({ secondsElapsed: 0});
  }

  startStopwatch() {
    console.info(this.stopwatchControl.started);
    if (this.stopwatchControl.started) return;
    this.resetStopwatch();
    this.interval = setInterval(() => this.tick(), 1000);
    this.stopwatchControl.started = true;
  }

  stopStopwatch() {
    clearInterval(this.interval);
    this.stopwatchControl.started = false
  }

  userKey() {
    return this.state.email
      .split('@').join('_')
      .split('.').join('_');
  }

  saveStopwatchTime() {
    const email = this.state.email;
    const displayName = this.state.displayName;
    const time = this.state.secondsElapsed;
    const date = new Date();

    const newMyTimeKey = firebase.database().ref(`users/${this.userKey()}`).child('times').push().key;
    let myUpdate = {}
    myUpdate['/times/' + newMyTimeKey] = {
      time,
      date,
    };
    firebase.database().ref(`users/${this.userKey()}`).update(myUpdate);

    let updates = {};
    const newTimeKey = firebase.database().ref().child('times').push().key;
    updates['/times/' + newTimeKey] = {
      displayName,
      time,
      date,
    };
    firebase.database().ref().update(updates);
  }

  loadMyTimes() {
    const ref = firebase.database().ref(`users/${this.userKey()}`).child('times');
    ref.on('value', (value) => {
      let arr = [];
      const obj = value.val();
      for (const key in obj) {
        let newObj = obj[key];
        newObj.key = key;
        arr.push(newObj);
      }
      this.orderTimes(arr);
      this.setState({
        myTimes: arr,
      });
    });
  }

  loadTimes() {
    const ref = firebase.database().ref().child('times');
    ref.on('value', (value) => {
      let arr = [];
      const obj = value.val();
      for (const key in obj) {
        let newObj = obj[key];
        newObj.key = key;
        arr.push(newObj);
      }
      this.orderTimes(arr);
      const dedupArr = this.dedupTimes(arr);
      this.setState({
        times: dedupArr,
      });
    });
  }

  dedupTimes(times) {
    const displayNames = times.map(time => time.displayName);
    const users = [...new Set(displayNames)];
    return times.filter((time) => {
      for (const index in users) {
        let user = users[index];
        const exists = user === time.displayName;
        if (exists) {
          users[index] = null;
          return true;
        }
      }
      return false;
    });
  }

  // Order Times using Insert Sorting. https://pt.wikipedia.org/wiki/Insertion_sort
  orderTimes(times) {
    let i, j, elect, A = times, length = times.length;
    for (let i = 1; i < length; i++) {
      elect = A[i];
      j = i - 1;
      while (j >= 0 && elect.time < A[j].time) {
        A[j + 1] = A[j];
        j = j - 1;
      }
      A[j + 1] = elect;
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Cronômetro de Cubo Mágico</h2>
        </div>
        <p className="App-intro">
          Armazene e melhore seu tempo!
        </p>
        <div id="firebaseui-auth-container"></div>
        <div id="sign-in-status"></div>
        <div id="sign-in"></div>
        <div id="account-details"></div>
        <p> Inicie e pare o cronômetro teclando os dois <strong>Controls</strong> ou os dois <strong>Commands</strong></p>
        <div id='stopwatch-display'>{msToISOString(this.state.secondsElapsed)}</div>
        <button id="stopwatch-start" onClick={this.startStopwatch}>Iniciar</button>
        <button id="stopwatch-stop" onClick={this.stopStopwatch}>Parar</button>
        <button id="stopwatch-saveTime" onClick={this.saveStopwatchTime}>Salvar Tempo</button>

        <MyTimes myTimes={this.state.myTimes} />
        <BestTimes times={this.state.times} />

        <h2>Links</h2>
        <ul>
          <li>
            <a href="http://www.ws.binghamton.edu/fridrich/cube.html">Fridrich</a>
          </li>
          <li>
            <a href="https://github.com/emilianoeloi/cronometro-cubomagico">Projeto no Github</a>
          </li>
        </ul>

      </div>
    );
  }
}

export default App;
