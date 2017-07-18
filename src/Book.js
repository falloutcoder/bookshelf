import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SHELVES, SHELVES_DISPLAY_NAME } from './constants';

class Book extends PureComponent {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onMove: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <img className="book-cover"
               src={ this.props.book.imageLinks.thumbnail }
               alt={ `${this.props.book.title} thumbnail` } />
          <div className="book-shelf-changer">
            <select value={ this.props.book.shelf }
                    onChange={ e => this.props.onMove(this.props.book, e.target.value) }>
              <option value="none" disabled>Move to...</option>
              <option value={ SHELVES.currentlyReading }>{ SHELVES_DISPLAY_NAME[SHELVES.currentlyReading] }</option>
              <option value={ SHELVES.wantToRead }>{ SHELVES_DISPLAY_NAME[SHELVES.wantToRead] }</option>
              <option value={ SHELVES.read }>{ SHELVES_DISPLAY_NAME[SHELVES.read] }</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{ this.props.book.title }</div>
        <div className="book-authors">{ this.props.book.authors.join(', ') }</div>
      </div>
    );
  }
}

export default Book;