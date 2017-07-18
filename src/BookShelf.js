import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
import { SHELVES_DISPLAY_NAME } from './constants';

class BookShelf extends PureComponent {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelf: PropTypes.string.isRequired,
    moveBookToShelf: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ SHELVES_DISPLAY_NAME[this.props.shelf] }</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.filter(book => book.shelf === this.props.shelf).map(book => (
               <li key={ book.id }>
                <Book book={ book } onMove={ this.props.moveBookToShelf } />
              </li>)
            )}
          </ol>
      </div>
     </div>
    );
  }
}

export default BookShelf;