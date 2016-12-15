import React, { Component } from 'react';

import { msToISOString } from './Common';

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
              {new Date(time.date).toLocaleDateString()} - {time.displayName} - <strong>{msToISOString(time.time)}</strong></li>
          ))}
        </ul>
      </fieldset>
    )
  }
}

export default BestTimes;
