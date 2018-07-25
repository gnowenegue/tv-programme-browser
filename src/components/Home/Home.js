import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Filter, Thumbnails, Pagination } from '..';

import { loadTvShows } from '../../actions';

import './styles.scss';

class Home extends PureComponent {
  static propTypes = {
    tvshows: PropTypes.object.isRequired,
    loadTvShows: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      sortBy: 'popularity.desc',
    };

    const {
      loadTvShows,
    } = this.props;

    loadTvShows();
  }

  onSort = e => {
    const {
      loadTvShows,
    } = this.props;

    const sortValue = e.target.value;
    this.setState({
      sortBy: sortValue,
    });

    loadTvShows({ sort_by: sortValue });
  }

  goToPage = (e, page) => {
    e.preventDefault();

    const {
      loadTvShows,
    } = this.props;

    const {
      sortBy,
    } = this.state;

    loadTvShows({ page, sort_by: sortBy });
  }

  render() {
    const {
      tvshows: {
        isLoading,
        hasError,
        shows: tvshows,
        currentPage,
        totalPages,
      },
    } = this.props;

    const {
      sortBy,
    } = this.state;

    if (isLoading) {
      return (
        <p className="loading text-center position-absolute">
          Loading...
        </p>
      );
    }

    if (hasError) {
      return (
        <p className="error text-center position-absolute">
          Error
        </p>
      );
    }

    return (
      <div>

        <h1 className="text-center my-5">
          TV Programme Browser
        </h1>

        <Filter
          onSort={this.onSort}
          sortOption={sortBy}
        />
        <Thumbnails
          tvshows={tvshows}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={this.goToPage}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tvshows: state.tvshows,
});

const mapDispatchToProps = dispatch => ({
  loadTvShows: options => dispatch(loadTvShows(options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
