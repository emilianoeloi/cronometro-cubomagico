import React, { Component } from 'react';

import { msToISOString } from './Common';

class MyTimes extends Component {
  render() {
    if (!this.props.myTimes) {
      return null;
    }
    let i = 1;
    return (
      <table className="pure-table">
        <caption>
          Meus Tempos
        </caption>
        <thead>
            <tr>
                <th>#</th>
                <th>Data</th>
                <th>Tempo</th>
            </tr>
        </thead>

        <tbody>
          {this.props.myTimes.map(myTime => (
            <tr key={myTime.key} className={i%2 === 0 ? 'pure-table-odd' : ''}>
                <td>{i++}</td>
                <td>{new Date(myTime.date).toLocaleDateString()}</td>
                <td>{msToISOString(myTime.time)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default MyTimes;
