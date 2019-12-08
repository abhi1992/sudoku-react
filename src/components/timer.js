import React from 'react';
import PropTypes from 'prop-types';

/**
 * Timer
 * @param {*} props props
 * @returns {React.Component} Timer Component
 */
export default function Timer(props) {
  const {
    hr, min, sec, stopTimer,
  } = props;
  return (
    <div>
      { !stopTimer
        ? (
          <h1>
            {hr}
            :
            {min}
            :
            {sec}
          </h1>
        ) : (
          <h1>
            00:00:00
          </h1>
        ) }
    </div>
  );
}

Timer.propTypes = {
  hr: PropTypes.string.isRequired,
  min: PropTypes.string.isRequired,
  sec: PropTypes.string.isRequired,
  stopTimer: PropTypes.bool.isRequired,
};
