import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

export const styles = () => ({
  button: {
    color: 'primary',
  },
});

/**
 * MenuButton
 * @param {Object} props React props
 * @returns {ReactComponent} menu button component
 */
export function MenuButton(props) {
  const { text, onClick } = props;
  return (
    <div className="button-container">
      <Button
        type="submit" variant="contained" className="button"
        onClick={onClick}
      >
        {text}
      </Button>
    </div>
  );
}

MenuButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
