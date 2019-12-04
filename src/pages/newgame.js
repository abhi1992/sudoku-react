import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchNewGame, postVictory } from '../services/api';
import SudokuBoard from '../components/sudokuboard';

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
    };
  }


  /**
   * @returns {void}
   */
  componentDidMount() {
    fetchNewGame((res) => {
      this.setState({
        data: res.data,
      });
      this.displayGame();
    });
  }

  onVictoryPost = (time) => {
    // this.setState({ time });
    const { history } = this.props;
    this.setState({
      isLoading: true,
    });
    postVictory({ time }, (res) => {
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
    const { isLoading, data } = this.state;
    return isLoading ? (
      <div className="align-center margin-200">
        <CircularProgress />
      </div>
    ) : (
      <div className="align-center">
        <SudokuBoard data={data} onVictory={this.onVictoryPost} />
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
