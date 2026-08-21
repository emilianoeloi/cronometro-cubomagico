import React, { Component } from 'react';

class Shuffle extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { } = this.props;
    
    return (
      <div className="pure-g">
        <div className="pure-u-1">
          <p id="status"></p>
          <div id="randomstate" className="l-box">
            <button className="pure-button button-shuffle">Gerar embaralhamento aleatório</button>
            <div className="l-box">
              <span className="result"></span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Shuffle;
