import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './styles.scss';
import placeHolder from '../../../assets/img/hooq_logo.png';

const Thumbnails = props => {
  const {
    tvshows,
  } = props;

  return (
    <div className="thumbnails row justify-content-start">
      {
        tvshows.map(tvshow => (
          <Link to={`/tv/${tvshow.id}`} key={tvshow.id} className="thumbnail col-12 col-sm-4 col-md-3 col-xl-2 text-center mb-5">
            <div>
              {
                tvshow.poster_path
                  ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w185/${tvshow.poster_path}`}
                      alt={tvshow.name}
                      className="shadow rounded img-thumbnail p-0"
                    />
                  )
                  : (
                    <img
                      src={placeHolder}
                      alt={tvshow.name}
                      className="shadow rounded img-thumbnail p-0 placeholder"
                    />
                  )
                }
              <p style={{ maxWidth: '185px' }} className="m-auto text-truncate">
                {tvshow.name}
              </p>
            </div>
          </Link>
        ))
      }
    </div>
  );
};

Thumbnails.propTypes = {
  tvshows: PropTypes.array.isRequired,
};

export default Thumbnails;
