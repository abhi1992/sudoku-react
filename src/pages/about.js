import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';
import { MenuButton } from '../components/menubutton';

/**
 * About
 */
class About extends React.Component {
  /**
   * initComponents
   * @returns {void}
   */
  constructor() {
    super();
    this.onBackClick = this.onBackClick.bind(this);
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
    const { game, version } = this.props;
    return (
      <Router>
        <div className="align-center">
          <div>
            <span className="game-text">{game}</span>
            <br />
            <span>Version:</span>
            <br />
            <span><strong>{version}</strong></span>
            <br />
            <span>Created By:</span>
            <br />
            <span><strong>Abhishek Banerjee</strong></span>
          </div>
          <MenuButton text="Back" onClick={this.onBackClick} />
        </div>
      </Router>
    );
  }
}

About.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
  game: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired,
};

export default About;
