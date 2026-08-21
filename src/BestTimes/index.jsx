import React, { Component } from 'react';

import { msToISOString } from '../Common';
import trophy from './trophy.svg';

class BestTimes extends Component {

  render() {
    let i = 1;
    if (!this.props.times || this.props.times.length === 0) {
      return (
        <table className="pure-table">
          <caption className="Table-caption">
            <h2>Melhores Tempos</h2>
          </caption><thead><tr><th>#</th><th>Data</th><th>Cubista</th><th>Tempo</th></tr></thead><tbody><tr class=""><td>1</td><td>12/15/2016</td><td>Darlene Medeiros</td><td class="time-formated">01' 05.00"</td></tr><tr class="pure-table-odd"><td>2</td><td>12/16/2016</td><td>Aline Villaça</td><td class="time-formated">01' 06.00"</td></tr><tr class=""><td>3</td><td>12/28/2016</td><td>Emiliano Eloi S. Barbosa (Eloi)</td><td class="time-formated">01' 06.00"</td></tr><tr class="pure-table-odd"><td>4</td><td>12/16/2016</td><td>Igor Canêdo</td><td class="time-formated">01' 09.00"</td></tr><tr class=""><td>5</td><td>12/30/2016</td><td>PAULO ROBERTO ROSA NASCIMENTO</td><td class="time-formated">01' 46.63"</td></tr><tr class="pure-table-odd"><td>6</td><td>12/31/2016</td><td>Rhyana Patrícia</td><td class="time-formated">02' 44.38"</td></tr><tr class=""><td>7</td><td>12/30/2016</td><td>Jujuda 2007</td><td class="time-formated">03' 38.40"</td></tr></tbody></table>
      );
    }
    return (
      <table className="pure-table">
        <caption className="Table-caption">
          <img src={trophy} className="BestTimes-trophy" alt="trophy" />
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
                <td className="time-formated">{msToISOString(time.time)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default BestTimes;
