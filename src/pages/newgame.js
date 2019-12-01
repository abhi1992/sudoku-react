import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchNewGame, postVictory } from '../services/api';
import { SudokuBoard } from '../components/sudokuboard';

/**
 * React Component
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
    fetchNewGame((data) => {
      this.setState({
        data: data.data,
      });
      this.displayGame();
    });
  }

  onVictory = (time) => {
    // this.setState({ time });
    const { history } = this.props;
    this.setState({
      isLoading: true,
    });
    postVictory({ time }, () => {
      history.push('/victory');
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
        <SudokuBoard data={data} onVictory={this.onVictory} />
      </div>
    );
  }
}

export default NewGame;

NewGame.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
