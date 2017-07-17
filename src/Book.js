import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class Book extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    authors: PropTypes.array.isRequired,
    thumbnail: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <img className="book-cover" src={this.props.thumbnail} alt="Image Thumbnail"/>
          <div className="book-shelf-changer">
            <select value={this.props.shelf}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">{this.props.authors.join(', ')}</div>
      </div>
    );
  }
}

export default Book;