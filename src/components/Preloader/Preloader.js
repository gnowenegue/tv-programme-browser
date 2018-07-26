import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Preloader = props => {
  const { noBg, hasError } = props;
  return (
    <div className={`preloader position-absolute w-100 h-100 ${noBg ? 'noBg' : ''}`}>
      <div className="bg position-absolute w-100 h-100" />
      <p className="loading position-absolute text-center">
        {hasError ? 'Error' : 'Loading...'}
      </p>
    </div>
  );
};

Preloader.propTypes = {
  noBg: PropTypes.bool,
  hasError: PropTypes.bool,
};

Preloader.defaultProps = {
  noBg: false,
  hasError: false,
};

export default Preloader;
