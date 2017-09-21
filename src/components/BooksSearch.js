import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BooksGrid from './BooksGrid';
import { search } from '../BooksAPI';

class BooksSearch extends PureComponent {
  static propTypes = {
    shelves: PropTypes.object.isRequired,
    moveBookToShelf: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      searchResults: [],
      searchId: 0,
      noResultsFound: false,
    };
  }

  onBookSearch = query => {
    const searchBooks = () => {
      const searchId = this.state.searchId;
      search(query)
        .then(response => {
          if (searchId === this.state.searchId) {
            if (response.error) {
              this.setState({ searchResults: [], noResultsFound: true });
            } else {
              this.setState({ searchResults: response, noResultsFound: false });
            }
          }
        })
        .catch(err => {
          this.setState({ searchResults: [], noResultsFound: true });
          console.error(`Something went wrong with search endpoint. ${err}`);
        });
    };
    this.setState(
      prevState => ({ searchQuery: query, searchId: ++prevState.searchId }),
      () =>
        query.length
          ? searchBooks()
          : this.setState({ searchResults: [], noResultsFound: false }),
    );
  };

  findBookOnShelf = book => {
    for (const shelf in this.props.shelves) {
      if (this.props.shelves[shelf].indexOf(book.id) > -1) {
        return shelf;
      }
    }
    return null;
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={this.state.searchQuery}
              onChange={e => this.onBookSearch(e.target.value)}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          {this.state.noResultsFound && (
            <div className="no-books-found">
              No book found for searched title or author
            </div>
          )}
          {this.state.searchResults.length !== 0 && (
            <BooksGrid
              books={this.state.searchResults}
              onMove={this.props.moveBookToShelf}
              findBookOnShelf={b => this.findBookOnShelf(b)}
            />
          )}
        </div>
      </div>
    );
  }
}

export default BooksSearch;
