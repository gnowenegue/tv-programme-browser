import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Filter = props => {
  const {
    onSort,
    sortOption,
  } = props;

  return (
    <div className="filter row my-3">
      <div className="col-sm text-center">
        <label htmlFor="sort" className="mr-3">
          Sort by:
        </label>
        <select
          value={sortOption}
          name="sort"
          id="sort"
          onChange={e => onSort(e)}
        >
          <option value="popularity.desc">
            Popularity descending
          </option>
          <option value="popularity.asc">
            Popularity ascending
          </option>
          <option value="vote_average.desc">
            Rating descending
          </option>
          <option value="vote_average.asc">
            Rating ascending
          </option>
          <option value="first_air_date.desc">
            Date released descending
          </option>
          <option value="first_air_date.asc">
          Date released ascending
          </option>
        </select>
      </div>
    </div>
  );
};

Filter.propTypes = {
  onSort: PropTypes.func.isRequired,
  sortOption: PropTypes.string.isRequired,
};

export default Filter;
