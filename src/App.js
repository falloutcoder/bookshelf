import React from 'react';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom'
import BooksList from './BooksList';
import BooksSearch from './BooksSearch';
import './App.css';

class BooksApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      shelves: {}
    }
    this.moveBookToShelf = this.moveBookToShelf.bind(this);
  }

  componentDidMount() {
    this.getAllShelfBooks();
  }

  getAllShelfBooks() {
    BooksAPI.getAll().then(
      books => {
        this.setState({ books });
        this.setState({ shelves: this.groupBooksByShelf(books) });
      }
    ).catch(err => console.log(`Something went wrong with get all books endpoint: ${err}`));
  }

  groupBooksByShelf(books) {
    let groupedBooks = {};
    books.forEach(book => groupedBooks[book.shelf] ?
                            groupedBooks[book.shelf].push(book.id)
                            : groupedBooks[book.shelf] = [book.id]);
    return groupedBooks;
  }

  moveBookToShelf(selectedBook, shelf) {
    BooksAPI.update(selectedBook, shelf).then(
      data => this.setState({ shelves: data },
        this.setState(
          state => {
            const books = state.books;
            const index = books.findIndex(book => book.id === selectedBook.id);
            if (index > -1) {
              return {
                books: [
                  ...books.slice(0, index),
                  Object.assign({}, books[index], { shelf: shelf }),
                  ...books.slice(index + 1)
                ]
              }
            } else {
              return { books: [...books, Object.assign({}, selectedBook, { shelf: shelf })]}
            }
          }
        )
      )
    ).catch(err => console.log(`Something went wrong with update books endpoint: ${err}`));
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BooksList books={ this.state.books } moveBookToShelf={ this.moveBookToShelf } />)}
        />
        <Route exact path='/search' render={() => (
          <BooksSearch shelves={ this.state.shelves } moveBookToShelf={ this.moveBookToShelf } />)}
        />
      </div>
    )
  }
}

export default BooksApp;
