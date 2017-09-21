import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class BooksGrid extends PureComponent {
  static propTypes = {
    books: PropTypes.array.isRequired,
    isSelectMode: PropTypes.bool,
    onMove: PropTypes.func.isRequired,
    selectedBooks: PropTypes.array,
    onBookSelectUnselect: PropTypes.func,
    findBookOnShelf: PropTypes.func,
  };

  render() {
    return (
      <ol className="books-grid">
        {this.props.books.map(book => (
          <li key={book.id}>
            <Book
              book={book}
              shelf={
                this.props.findBookOnShelf && this.props.findBookOnShelf(book)
              }
              onMove={this.props.onMove}
              isSelectMode={this.props.isSelectMode}
              selectedBooks={this.props.selectedBooks}
              onBookSelectUnselect={this.props.onBookSelectUnselect}
            />
          </li>
        ))}
      </ol>
    );
  }
}

export default BooksGrid;
