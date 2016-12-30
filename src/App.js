import React, { Component } from 'react';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import ReactGA from 'react-ga';

import logo from './logo.svg';
import styles from './App.css';
import { config } from './Config.js';
import { msToISOString } from './Common';
import Stopwatch from './Stopwatch';
import MyTimes from './MyTimes';
import BestTimes from './BestTimes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bestTime: 0,
      mediumTime: 0,
      wrostTime: 0,
      myTimes: [],
      times: []
    };
    this.saveStopwatchTime = this.saveStopwatchTime.bind(this);
    this.removeTime = this.removeTime.bind(this);
    this.logged = false;
  }

  componentDidMount() {
    firebase.initializeApp(config);

    const uiConfig = {
      signInSuccessUrl: 'https://croncube.com.br/',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
      ],
      tosUrl: 'https://cronometro-cubomagico.firebaseapp.com/'
    };
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', uiConfig);

    firebase.auth().onAuthStateChanged((user) => {
      let email;
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var uid = user.uid;
        var providerData = user.providerData;
        user.getToken().then(function(accessToken) {
          document.getElementById('sign-in').textContent = ' ';
          document.getElementById('firebaseui-auth-container').textContent = displayName;
        });
        this.setState({
          email,
          displayName,
        });
        this.loadMyTimes();
        this.loadTimes();
        this.logged = true;
      } else {
        email = 'anonymous';
        // User is signed out.
        document.getElementById('sign-in-status').innerHTML = '<h4>Faça login para gravar seus tempos!</h4>';
        document.getElementById('sign-in').textContent = ' ';
        document.getElementById('account-details').textContent = '';
        this.logged = false;
      }
      ReactGA.initialize(config.gaUA, {
        debug: false,
        titleCase: false,
        gaOptions: {
          userId: email
        }
      });
      ReactGA.pageview('/index');
    });
  }

  userKey() {
    return this.state.email
      .split('@').join('_')
      .split('.').join('_');
  }

  removeTime(key) {
    const confirmed = confirm('Deletar?');
    if (!confirmed) return;

    const ref = firebase.database().ref(`users/${this.userKey()}`).child('times').child(key);
    ref.on('value', (value) => {
      const obj = value.val();
      if (obj) {
        const internalKey = obj.timeKey;
        const internalRef = firebase.database().ref().child('times').child(internalKey);
        internalRef.remove();
      }
    });
    ref.remove();
  }

  saveStopwatchTime(time) {
    const email = this.state.email;
    const displayName = this.state.displayName;
    const date = new Date();

    /// Keys
    const newTimeKey = firebase.database().ref().child('times').push().key;
    const newMyTimeKey = firebase.database().ref(`users/${this.userKey()}`).child('times').push().key;

    let myUpdate = {}
    myUpdate['/times/' + newMyTimeKey] = {
      time,
      date,
      timeKey: newTimeKey,
    };
    firebase.database().ref(`users/${this.userKey()}`).update(myUpdate);

    let updates = {};
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
      let timeSum = 0;
      let timeCount = 0;
      for (const key in obj) {
        let newObj = obj[key];
        newObj.key = key;
        timeSum += newObj.time;
        timeCount++;
        arr.push(newObj);
      }
      this.orderTimes(arr);

      const bestTime = arr[0].time;
      const mediumTime = timeSum / timeCount;
      const wrostTime = arr[arr.length - 1].time;

      this.setState({
        myTimes: {
          times: arr,
          bestTime,
          mediumTime,
          wrostTime,
          removeTime: this.removeTime,
        }
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
      logged: this.logged,
    };
    const myTimeProps = {
      bestTime: this.state.myTimes.bestTime,
      mediumTime: this.state.myTimes.mediumTime,
      wrostTime: this.state.myTimes.wrostTime,
      times: this.state.myTimes.times,
      removeTime: this.removeTime,
    };
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Cronômetro de Cubo Mágico Online</h2>
          <Stopwatch {...stopwatchProps} />
          <p> Inicie e pare o cronômetro teclando os dois <strong>Controls</strong> ou os dois <strong>Commands</strong></p>
        </div>

        <div className="pure-g">
          <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-2">
            <div className="l-box">
              <div id="firebaseui-auth-container" className="App-user"></div>
              <div id="sign-in-status"></div>
              <div id="sign-in"></div>
              <div id="account-details"></div>
            </div>
            <MyTimes {...myTimeProps} />
          </div>
          <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-2">
            <BestTimes times={this.state && this.state.times ? this.state.times : null} />
          </div>
        </div>
        <footer className="pure-g">
          <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-2">
            <div className="r-box">
              <h4>Aprenda a montar</h4>
              <a href="https://www.youtube.com/user/rafaelcinoto">
                Canal do Youtube: Cinoto
              </a> | <a href="http://www.ws.binghamton.edu/fridrich/cube.html">
                Fridrich
              </a>
            </div>
          </div>
          <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-2">
            <div className="r-box">
              <h4>Contribua</h4>
              <a href="https://github.com/emilianoeloi/cronometro-cubomagico">Projeto no Github</a>
            </div>
          </div>
          <div className="pure-u-1">
            <div className="r-box">
              <p>2016-2016 - Croncube - www.croncube.com.br - 1.1.3</p>
            </div>
          </div>
        </footer>

      </div>
    );
  }
}

export default App;
