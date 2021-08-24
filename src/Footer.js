import React, { Component } from 'react';

class Footer extends Component {

  render() {
    return (
      <footer className="pure-g">
        <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-2">
          <div className="r-box">
            <h4>
              <a target="_blank" href="https://www.youtube.com/watch?v=IrY5JjSFR8I">Aprenda a montar: </a>
            </h4>
            <a target="_blank" href="https://www.youtube.com/user/rafaelcinoto">
              Canal do Youtube: Cinoto
            </a> | <a target="_blank" href="http://www.ws.binghamton.edu/fridrich/cube.html">
              Fridrich
            </a>
          </div>
        </div>
        <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-2">
          <div className="r-box">
            <h4>
              <a target="_blank" href="https://pt.wikipedia.org/wiki/C%C3%B3digo_aberto">
                Contribua:
              </a>
            </h4>
            <a target="_blank" href="https://github.com/emilianoeloi/cronometro-cubomagico">Projeto no Github</a>
          </div>
        </div>
        <div className="pure-u-1">
          <div className="r-box">
            <p>
              <a href="https://github.com/emilianoeloi/cronometro-cubomagico/blob/master/LICENSE">
                APACHE-2.0
              </a> 2016-2021 Croncube www.croncube.com.br 2.0.0
            </p>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer;
