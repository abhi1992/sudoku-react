import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    
  }

  /**
   * render
   * @returns {ReactComponent} Home Page
   */
  render() {
    const { isLoading } = this.state;
    return isLoading ? (
      <div className="align-center margin-200">
        <CircularProgress />
      </div>
    ) : (
      <div className="align-center">
        <span>New game</span>
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
