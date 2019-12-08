import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchNewGame, postVictory } from '../services/api';
import SudokuBoard from '../components/sudokuboard';
import Timer from '../components/timer';

/**
 * React Component
 * @param {string} time time
 * @returns {void} null
 */
class NewGame extends React.Component {
  /**
   * Constructor
   * @param {Object} props props passed
   * @returns {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      hr: '00',
      min: '00',
      sec: '00',
    };
  }


  /**
   * @returns {void}
   */
  componentDidMount() {
    fetchNewGame((res) => {
      this.setState({
        data: res.data,
        stopTimer: false,
      });
      this.displayGame();
      setInterval(this.tick, 1000);
    });
  }

  tick = () => {
    const { sec, min, hr } = this.state;
    let secInt = parseInt(sec, 10);
    let minInt = parseInt(min, 10);
    let hrInt = parseInt(hr, 10);

    secInt += 1;
    if (secInt > 59) {
      secInt = 0;
      minInt += 1;
    }

    if (minInt > 59) {
      minInt = 0;
      hrInt += 1;
    }
    let secStr = `${secInt}`;
    let minStr = `${minInt}`;
    let hrStr = `${hrInt}`;

    if (secInt < 10) {
      secStr = `0${secInt}`;
      this.setState({
        sec: secStr,
      });
    }
    if (minInt < 10) {
      minStr = `0${minInt}`;
      this.setState({
        sec: secStr,
      });
    }
    if (hrInt < 10) {
      hrStr = `0${hrInt}`;
    }
    this.setState({
      sec: secStr,
      min: minStr,
      hr: hrStr,
    });
  }

  onVictoryPost = () => {
    // this.setState({ time });
    const { history } = this.props;
    this.setState({
      isLoading: true,
      stopTimer: true,
    });
    const { sec, min, hr } = this.state;
    const time = `${hr}:${min}:${sec}`;
    const elapsedSeconds = (parseInt(hr, 10) * 60 * 60)
      + (parseInt(min, 10) * 60) + (parseInt(sec, 10));

    const params = {
      time,
      elapsedSeconds,
    };
    postVictory({ params }, (res) => {
      // eslint-disable-next-line
      const id = res._id;
      history.push(`/victory/${id}`, {
        state: { id },
      });
    });
  }

  /**
   * Displays the sudoku
   * @param {Object} data data of sudoku
   * @returns {void}
   */
  displayGame() {
    // console.log(this.state.data);
    this.setState({ isLoading: false });
  }

  /**
   * render
   * @returns {ReactComponent} Home Page
   */
  render() {
    const {
      isLoading, data, hr, min, sec, stopTimer,
    } = this.state;
    return isLoading ? (
      <div className="align-center margin-200">
        <CircularProgress />
      </div>
    ) : (
      <div className="align-center">
        <SudokuBoard data={data} onVictory={this.onVictoryPost} />
        <Timer
          hr={hr}
          min={min}
          sec={sec}
          stopTimer={stopTimer}
        />
      </div>
    );
  }
}

export default NewGame;

NewGame.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  store: PropTypes.shape({}).isRequired,
};
