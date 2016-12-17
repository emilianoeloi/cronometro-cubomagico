import React, { Component } from 'react';

import { msToISOString } from './Common';

class BestTimes extends Component {

  render() {
    let i = 1;
    if (!this.props.times) {
      return null;
    }
    return (
      <table className="pure-table">
        <caption>
          <h2>Melhores Tempos</h2>
        </caption>
        <thead>
            <tr>
                <th>#</th>
                <th>Data</th>
                <th>Cubista</th>
                <th>Tempo</th>
            </tr>
        </thead>

        <tbody>
          {this.props.times.map(time => (
            <tr key={time.key} className={i%2 === 0 ? 'pure-table-odd' : ''}>
                <td>{i++}</td>
                <td>{new Date(time.date).toLocaleDateString()}</td>
                <td>{time.displayName}</td>
                <td>{msToISOString(time.time)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default BestTimes;
