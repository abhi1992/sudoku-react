import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { MenuButton } from '../components/menubutton';
import { fetchVictory } from '../services/api';

/**
 * About
 */
class Victory extends React.Component {
  /**
   * initComponents
   * @returns {void}
   */
  constructor() {
    super();
    this.onNewGameClick = this.onNewGameClick.bind(this);
    this.onAboutClick = this.onAboutClick.bind(this);
    this.state = {
      isLoading: true,
    };
  }

  /**
   * componentDidMount
   */
  componentDidMount() {
    fetchVictory((data) => {
      this.setState(
        {
          isLoading: false,
          time: data.time,
        },
      );
    });
  }

  /**
   * @returns {void}
   */
  onNewGameClick() {
    const { history } = this.props;
    history.push('/new');
  }

  /**
   * @returns {void}
   */
  onAboutClick() {
    const { history } = this.props;
    history.push('/about');
  }

  /**
   * @returns {void}
   */
  onBackClick() {
    this.props.history.goBack();
  }

  /**
   * render
   * @returns {Object} React component
   */
  render() {
    const { isLoading, time } = this.state;
    return isLoading ? (
      <div className="align-center margin-200">
        <CircularProgress />
      </div>
    ) : (
      <div className="align-center">
        <div>
          <span className="game-text">Victory!!</span>
          <br />
          <br />
          <span className="game-text">
            Time taken:
          </span>
          &nbsp;
          <span className="game-text">
            {time}
          </span>
          <br />
          <br />
          <Typography component="div" variant="body1">
            <Box color="primary.main">
              <MenuButton text="New Game" onClick={this.onNewGameClick} />
            </Box>
            <Box color="primary.main">
              <MenuButton text="About" onClick={this.onAboutClick} />
            </Box>
          </Typography>
          <br />
        </div>
      </div>
    );
  }
}

Victory.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func,
    push: PropTypes.func,
  }).isRequired,
};

export default Victory;
