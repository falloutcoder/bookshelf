import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf';
import { SHELVES } from './constants';

class BooksList extends PureComponent {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf books={ this.props.books } shelf={SHELVES.currentlyReading} />
            <BookShelf books={ this.props.books } shelf={SHELVES.wantToRead} />
            <BookShelf books={ this.props.books } shelf={SHELVES.read} />
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    );
  }
}

export default BooksList;