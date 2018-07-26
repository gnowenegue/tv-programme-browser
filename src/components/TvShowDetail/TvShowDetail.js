import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Season, Preloader } from '..';

import { loadTvShowDetail } from '../../actions';

import './styles.scss';

class TvShowDetail extends PureComponent {
  static propTypes = {
    tvshowDetail: PropTypes.object.isRequired,
    loadTvShowDetail: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    const {
      loadTvShowDetail,
      match: {
        params: {
          id,
        },
      },
    } = this.props;

    loadTvShowDetail({ id });
  }

  render() {
    const {
      tvshowDetail: {
        isLoading,
        hasError,
        information: {
          id,
          name,
          genres,
          overview,
          backdrop_path: backdropPath,
          number_of_seasons: numOfSeasons,
          number_of_episodes: numOfEpisodes,
          homepage,
        },
        credits: {
          cast: casts,
        },
        videos,
      },
    } = this.props;

    const trailer = videos.filter(video => video.type === 'Trailer' && video.site === 'YouTube')
      .map(video => video.key)[0];

    if (isLoading || hasError) {
      return (
        <Preloader hasError={hasError} />
      );
    }

    return (
      <div className="tvShowDetail">

        <div className="bg w-100">
          <img
            src={`https://image.tmdb.org/t/p/w1280/${backdropPath}`}
            alt={name}
          />
        </div>

        <h1 className="text-center mt-4">
          {name}
        </h1>

        <small className="text-center d-block mb-4">
          {numOfSeasons}
          &nbsp;Seasons,&nbsp;
          {numOfEpisodes}
          &nbsp;Episodes
        </small>

        <p className="overview">
          {overview}
        </p>

        <div className="row">
          <p className="col-12 col-sm-2 mb-1 casts">
            Casts:
          </p>
          <p className="col-12 col-sm-10 mb-3 mb-sm-1 casts">
            {
              casts.reduce((acc, cur) => acc.concat(`${cur.name}, `), '').slice(0, -2)
            }
          </p>
        </div>

        <div className="row">
          <p className="col-12 col-sm-2 mb-1 mb-3-sm genres">
            Genres:
          </p>
          <p className="col-12 col-sm-10 mb-3 mb-sm-3 genres">
            {
              genres.reduce((acc, cur) => acc.concat(`${cur.name}, `), '').slice(0, -2)
            }
          </p>
        </div>

        {
          trailer
            && (
              <div className="trailer">
                Click&nbsp;
                {/* eslint-disable-next-line react/jsx-no-target-blank */}
                <a href={`https://www.youtube.com/watch?v=${trailer}`} target="_blank">
                  here
                </a>
                &nbsp;for trailer.
              </div>
            )
        }

        {
          homepage
            && (
              <div className="website">
                Click&nbsp;
                {/* eslint-disable-next-line react/jsx-no-target-blank */}
                <a href={homepage} target="_blank">
                  here
                </a>
                &nbsp;for official website.
              </div>
            )
        }

        <h3 className="mt-5">
          Episodes
        </h3>

        <div className="seasonContainer">
          <Season id={id} totalSeasons={numOfSeasons} />
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  tvshowDetail: state.tvshowDetail,
});

const mapDispatchToProps = dispatch => ({
  loadTvShowDetail: options => dispatch(loadTvShowDetail(options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TvShowDetail);
