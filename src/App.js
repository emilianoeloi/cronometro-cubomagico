import React, { Component } from 'react';
import firebase from 'firebase';
import firebaseui from 'firebaseui';

import logo from './logo.svg';
import './App.css';
import { config } from './Config.js';
import { msToISOString } from './Common';
import Stopwatch from './Stopwatch';
import MyTimes from './MyTimes';
import BestTimes from './BestTimes';

class App extends Component {
  constructor(props) {
    super(props);
    this.saveStopwatchTime = this.saveStopwatchTime.bind(this);
  }

  componentDidMount() {
    this.setState({
      myTimes: [],
      times: []
    });
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

  userKey() {
    return this.state.email
      .split('@').join('_')
      .split('.').join('_');
  }

  saveStopwatchTime(time) {
    const email = this.state.email;
    const displayName = this.state.displayName;
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
    const stopwatchProps = {
      saveStopwatchTime: this.saveStopwatchTime,
    }
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Cronômetro de Cubo Mágico</h2>
          <Stopwatch {...stopwatchProps} />
        </div>
        <p> Inicie e pare o cronômetro teclando os dois <strong>Controls</strong> ou os dois <strong>Commands</strong></p>

        <p className="App-intro">
          Armazene e melhore seu tempo!
        </p>
        <div id="firebaseui-auth-container"></div>
        <div id="sign-in-status"></div>
        <div id="sign-in"></div>
        <div id="account-details"></div>

        <div className="tables">
            <MyTimes myTimes={this.state && this.state.myTimes ? this.state.myTimes : null} />
            <BestTimes times={this.state && this.state.times ? this.state.times : null} />
        </div>

        <h2>Links</h2>
        <ul>
          <li>
            <a href="https://www.youtube.com/user/rafaelcinoto">Canal do Youtube: Cinoto</a>
          </li>
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
