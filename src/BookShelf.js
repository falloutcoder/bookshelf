import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import BooksGrid from './BooksGrid'

class BookShelf extends PureComponent {
  static propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    isSelectMode: PropTypes.bool.isRequired,
    selectedBooks: PropTypes.array.isRequired,
    moveBookToShelf: PropTypes.func.isRequired,
    onBookSelectUnselect: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className='bookshelf'>
        <h2 className='bookshelf-title'>{ this.props.title }</h2>
        <div className='bookshelf-books'>
          <BooksGrid books={ this.props.books }
                     onMove={ this.props.moveBookToShelf }
                     isSelectMode={ this.props.isSelectMode }
                     selectedBooks={ this.props.selectedBooks }
                     onBookSelectUnselect={ this.props.onBookSelectUnselect }
          />
      </div>
     </div>
    )
  }
}

export default BookShelf