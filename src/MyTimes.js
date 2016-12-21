import React, { Component } from 'react';

import { msToISOString } from './Common';

class MyTimes extends Component {
  render() {
    const {
      bestTime,
      mediumTime,
      wrostTime,
      times,
    } = this.props;
    if (!times) {
      return null;
    }
    let i = 1;
    return (
      <table className="pure-table">
        <caption>
          <h2>Meus Tempos</h2>
          <h3>Melhor tempo: {msToISOString(bestTime)}</h3>
          <h3>Tempo médio: {msToISOString(mediumTime)}</h3>
          <h3>Pior tempo: {msToISOString(wrostTime)}</h3>
        </caption>
        <thead>
            <tr>
                <th>#</th>
                <th>Data</th>
                <th>Tempo</th>
            </tr>
        </thead>

        <tbody>
          {times.map(time => (
            <tr key={time.key} className={i%2 === 0 ? 'pure-table-odd' : ''}>
                <td>{i++}</td>
                <td>{new Date(time.date).toLocaleDateString()}</td>
                <td>{msToISOString(time.time)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default MyTimes;
