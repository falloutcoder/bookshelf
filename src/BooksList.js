import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf';
import { SHELVES } from './constants';

class BooksList extends PureComponent {
  static propTypes = {
    books: PropTypes.array.isRequired,
    isSelectMode: PropTypes.bool.isRequired,
    moveBookToShelf: PropTypes.func.isRequired,
    selectedBooks: PropTypes.array.isRequired,
    switchOffSelectMode: PropTypes.func.isRequired,
    onBookSelectUnselect: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
          <div className="list-books-logo" />
          <div className="list-books-logo logo2" />
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf books={ this.props.books }
                       shelf={SHELVES.currentlyReading}
                       selectedBooks={ this.props.selectedBooks }
                       isSelectMode={ this.props.isSelectMode }
                       onBookSelectUnselect={ this.props.onBookSelectUnselect }
                       moveBookToShelf={ this.props.moveBookToShelf } />
            <BookShelf books={ this.props.books }
                       shelf={SHELVES.wantToRead}
                       selectedBooks={ this.props.selectedBooks }
                       isSelectMode={ this.props.isSelectMode }
                       onBookSelectUnselect={ this.props.onBookSelectUnselect }
                       moveBookToShelf={ this.props.moveBookToShelf } />
            <BookShelf books={ this.props.books }
                       shelf={SHELVES.read}
                       selectedBooks={ this.props.selectedBooks }
                       isSelectMode={ this.props.isSelectMode }
                       onBookSelectUnselect={ this.props.onBookSelectUnselect }
                       moveBookToShelf={ this.props.moveBookToShelf } />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search" onClick={ this.props.switchOffSelectMode }>Add a book</Link>
        </div>
      </div>
    );
  }
}

export default BooksList;