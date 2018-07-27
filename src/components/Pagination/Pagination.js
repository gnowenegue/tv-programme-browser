import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

class Pagination extends PureComponent {
  static propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    goToPage: PropTypes.func.isRequired,
  }

  getRange = number => {
    const { totalPages } = this.props;
    const lowerBound = Math.max(1, number - 3);
    const upperBound = Math.min(totalPages, number + 3);
    const difference = upperBound - lowerBound + 1;
    return [...Array(difference).keys()].map(x => x + lowerBound);
  };

  handleNextPageClick = (e, page) => {
    e.preventDefault();
    const { totalPages, goToPage } = this.props;
    if (page <= totalPages) {
      goToPage(e, page);
    }
  }

  handlePreviousPageClick = (e, page) => {
    e.preventDefault();
    const { goToPage } = this.props;
    if (page > 0) {
      goToPage(e, page);
    }
  }

  renderPageButtons = () => {
    const {
      currentPage,
      goToPage,
    } = this.props;
    const range = this.getRange(currentPage);
    return range.map(num => (
      <li className={`page-item ${num === currentPage ? 'active' : ''}`} key={num}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className="page-link" href="#" onClick={e => goToPage(e, num)}>
          {num}
        </a>
      </li>
    ));
  };

  render() {
    const {
      currentPage,
    } = this.props;

    return (
      <nav className="mb-5">
        <ul className="pagination justify-content-center flex-wrap">
          <li className="page-item">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="page-link" href="#" onClick={e => this.handlePreviousPageClick(e, currentPage - 1)}>
              <span>
                &laquo;
              </span>
              <span className="sr-only">
                Previous
              </span>
            </a>
          </li>
          {this.renderPageButtons()}
          <li className="page-item">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="page-link" href="#" onClick={e => this.handleNextPageClick(e, currentPage + 1)}>
              <span>
                &raquo;
              </span>
              <span className="sr-only">
                Next
              </span>
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Pagination;
