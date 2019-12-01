import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { MenuButton } from '../components/menubutton';

/**
 * React Component
 */
class Home extends React.Component {
  /**
   * initComponents
   * @returns {void}
   */
  constructor() {
    super();
    this.onNewGameClick = this.onNewGameClick.bind(this);
    this.onAboutClick = this.onAboutClick.bind(this);
  }

  /**
   * @returns {void}
   */
  onNewGameClick() {
    this.props.history.push('/new');
  }

  /**
   * @returns {void}
   */
  onAboutClick() {
    this.props.history.push('/about');
  }

  /**
   * render
   * @returns {ReactComponent} Home Page
   */
  render() {
    const { game } = this.props;
    return (
      <div className="align-center">
        <span className="game-title">{game}</span>
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
      </div>
    );
  }
}

export default Home;

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  game: PropTypes.string.isRequired,
};
