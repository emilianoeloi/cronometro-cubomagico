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
          </caption><thead><tr><th>#</th><th>Data</th><th>Cubista</th><th>Tempo</th></tr></thead>
            <tbody><tr class=""><td>1</td><td>18/11/2019</td><td>vivositi gamer - roblox</td><td class="time-formated">00' 00.00"</td></tr><tr class="pure-table-odd"><td>2</td><td>01/03/2020</td><td>Lucas Marques</td><td class="time-formated">00' 00.00"</td></tr><tr class=""><td>3</td><td>19/05/2020</td><td>PAOLO GSJ</td><td class="time-formated">00' 00.00"</td></tr><tr class="pure-table-odd"><td>4</td><td>18/04/2021</td><td>Manuela Mendonça</td><td class="time-formated">00' 00.00"</td></tr><tr class=""><td>5</td><td>21/05/2020</td><td>BUBBLESS_-YT</td><td class="time-formated">00' 00.13"</td></tr><tr class="pure-table-odd"><td>6</td><td>04/05/2020</td><td>Gustavo Dino</td><td class="time-formated">00' 05.25"</td></tr><tr class=""><td>7</td><td>06/04/2020</td><td>LKLOCO</td><td class="time-formated">00' 07.56"</td></tr><tr class="pure-table-odd"><td>8</td><td>30/10/2019</td><td>OwN -iFuSiOn</td><td class="time-formated">00' 22.75"</td></tr><tr class=""><td>9</td><td>12/05/2021</td><td>AGNES MARIA SANTOS santos</td><td class="time-formated">00' 23.00"</td></tr><tr class="pure-table-odd"><td>10</td><td>29/02/2020</td><td>charles bryan</td><td class="time-formated">00' 24.88"</td></tr><tr class=""><td>11</td><td>08/03/2020</td><td>canal do the-théo</td><td class="time-formated">00' 28.94"</td></tr><tr class="pure-table-odd"><td>12</td><td>24/01/2020</td><td>Fabio Borges Borges</td><td class="time-formated">00' 30.44"</td></tr><tr class=""><td>13</td><td>05/01/2017</td><td>Israel Oliveira Silva</td><td class="time-formated">00' 31.13"</td></tr><tr class="pure-table-odd"><td>14</td><td>20/07/2017</td><td>Samuel Celestino Oliveira</td><td class="time-formated">00' 33.50"</td></tr><tr class=""><td>15</td><td>27/03/2021</td><td>Beca Vilar</td><td class="time-formated">00' 38.06"</td></tr><tr class="pure-table-odd"><td>16</td><td>01/03/2020</td><td>rafael francisco</td><td class="time-formated">00' 38.50"</td></tr><tr class=""><td>17</td><td>07/03/2020</td><td>Maria Laura</td><td class="time-formated">00' 39.44"</td></tr><tr class="pure-table-odd"><td>18</td><td>20/09/2020</td><td>João TV</td><td class="time-formated">00' 41.44"</td></tr><tr class=""><td>19</td><td>27/07/2021</td><td>arthwr5</td><td class="time-formated">00' 42.25"</td></tr><tr class="pure-table-odd"><td>20</td><td>04/12/2019</td><td>android loko</td><td class="time-formated">00' 43.44"</td></tr><tr class=""><td>21</td><td>19/11/2019</td><td>Alexsandra Lima</td><td class="time-formated">00' 54.75"</td></tr><tr class="pure-table-odd"><td>22</td><td>12/11/2019</td><td>Pão Simples TV</td><td class="time-formated">00' 59.81"</td></tr><tr class=""><td>23</td><td>14/04/2017</td><td>Erick Eduardo Santos</td><td class="time-formated">01' 02.75"</td></tr><tr class="pure-table-odd"><td>24</td><td>04/08/2020</td><td>Lu Bueno</td><td class="time-formated">01' 03.06"</td></tr><tr class=""><td>25</td><td>15/12/2016</td><td>Darlene Medeiros</td><td class="time-formated">01' 05.00"</td></tr><tr class="pure-table-odd"><td>26</td><td>26/06/2020</td><td>themermaidXP</td><td class="time-formated">01' 05.44"</td></tr><tr class=""><td>27</td><td>16/12/2016</td><td>Aline Villaça</td><td class="time-formated">01' 06.00"</td></tr><tr class="pure-table-odd"><td>28</td><td>28/12/2016</td><td>Emiliano Eloi S. Barbosa (Eloi)</td><td class="time-formated">01' 06.00"</td></tr><tr class=""><td>29</td><td>16/12/2016</td><td>Igor Canêdo</td><td class="time-formated">01' 09.00"</td></tr><tr class="pure-table-odd"><td>30</td><td>12/03/2017</td><td>Vascplays#cuber</td><td class="time-formated">01' 09.50"</td></tr><tr class=""><td>31</td><td>02/07/2021</td><td>Waleska Julianny</td><td class="time-formated">01' 15.63"</td></tr><tr class="pure-table-odd"><td>32</td><td>08/04/2020</td><td>canal desconhecido</td><td class="time-formated">01' 20.44"</td></tr><tr class=""><td>33</td><td>24/10/2017</td><td>Gabi Xavier</td><td class="time-formated">01' 20.81"</td></tr><tr class="pure-table-odd"><td>34</td><td>03/03/2020</td><td>Frosty</td><td class="time-formated">01' 45.81"</td></tr><tr class=""><td>35</td><td>30/12/2016</td><td>PAULO ROBERTO ROSA NASCIMENTO</td><td class="time-formated">01' 46.63"</td></tr><tr class="pure-table-odd"><td>36</td><td>26/08/2017</td><td>Gustavo Pantuza</td><td class="time-formated">01' 51.69"</td></tr><tr class=""><td>37</td><td>02/02/2017</td><td>Kryka Soulstrong</td><td class="time-formated">02' 03.31"</td></tr><tr class="pure-table-odd"><td>38</td><td>31/12/2016</td><td>Rhyana Patrícia</td><td class="time-formated">02' 44.38"</td></tr><tr class=""><td>39</td><td>30/12/2016</td><td>Jujuda 2007</td><td class="time-formated">03' 38.40"</td></tr></tbody>
          </table>
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
