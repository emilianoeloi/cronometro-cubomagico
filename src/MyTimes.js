import React, { Component } from 'react';

import { msToISOString } from './Common';

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

export default MyTimes;
