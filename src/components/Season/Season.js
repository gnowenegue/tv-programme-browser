import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadSeason } from '../../actions';
import { Preloader } from '..';

import './styles.scss';

class Season extends PureComponent {
  static propTypes = {
    season: PropTypes.object.isRequired,
    loadSeason: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    totalSeasons: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);

    const {
      loadSeason,
      id,
    } = this.props;

    loadSeason({ id, seasonId: 1 });
  }

  goToSeason = (e, seasonId) => {
    e.preventDefault();

    const {
      loadSeason,
      id,
    } = this.props;

    loadSeason({ id, seasonId });
  }

  render() {
    const {
      season: {
        isLoading,
        hasError,
        information: {
          overview,
          episodes,
          season_number: seasonNumber,
        },
      },
      totalSeasons,
    } = this.props;

    if (isLoading || hasError) {
      return (
        <Preloader noBg hasError={hasError} />
      );
    }

    return (
      <div className="season mb-5">

        <div className="mt-4 row">
          <h5 className="col-sm-2">
            Seasons:&nbsp;
          </h5>
          <h5 className="col-sm">
            {
              [...Array(totalSeasons).keys()]
                .map(season => season + 1)
                .map((season, i, seasons) => (
                  <div key={season} className="d-inline-block">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a
                      href="#"
                      className={`${seasonNumber === season ? 'active' : ''}`}
                      onClick={e => this.goToSeason(e, season)}
                    >
                      {season}
                    </a>
                    {i !== seasons.length - 1 && (
                    <span>
                      , &nbsp;
                    </span>)}
                  </div>
                ))
              }
          </h5>
        </div>

        <p>
          {overview}
        </p>

        <div className="episodes">
          {
            episodes.map((episode, i, episodes) => (
              <div className="row" key={episode.episode_number}>
                <p className="col-1 col-sm-2 my-2">
                  {episode.episode_number}
                </p>
                <p className="col col-sm-7 my-2">
                  {episode.name}
                </p>
                <p className="col-12 col-sm-3 my-sm-2 text-sm-right">
                  {episode.air_date}
                </p>
                { i !== episodes.length - 1 && <hr className="col-12 my-1" /> }
              </div>
            ))
          }
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  season: state.season,
});

const mapDispatchToProps = dispatch => ({
  loadSeason: options => dispatch(loadSeason(options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Season);
