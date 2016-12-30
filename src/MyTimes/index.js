import React, { Component } from 'react';

import { msToISOString } from '../Common';

class MyTimes extends Component {
  constructor(props) {
    super(props);
    this.removeTime = this.removeTime.bind(this);
  }
  removeTime(element) {
    const key = element.target.dataset['key'];
    this.props.removeTime(key);
  }
  render() {
    const {
      bestTime,
      mediumTime,
      wrostTime,
      times,
      removeTime,
    } = this.props;
    if (!times) {
      return null;
    }
    let i = 1;
    return (
      <table className="pure-table">
        <caption className="Table-caption">
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
            <th></th>
          </tr>
        </thead>

        <tbody>
          {times.map(time => (
            <tr key={time.key} className={i%2 === 0 ? 'pure-table-odd' : ''}>
              <td>{i++}</td>
              <td>{new Date(time.date).toLocaleDateString()}</td>
              <td className="time-formated">{msToISOString(time.time)}</td>
              <td>
                <button data-key={time.key} onClick={this.removeTime} className="button-delete pure-button">
                  excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default MyTimes;
