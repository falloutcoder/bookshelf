import React from 'react';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom'
import BooksList from './BooksList';
import BooksSearch from './BooksSearch';
import Loading from './Loading';
import './App.css';

class BooksApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      shelves: {},
      isLoading: false
    }
    this.moveBookToShelf = this.moveBookToShelf.bind(this);
  }

  componentDidMount() {
    this.getAllShelfBooks();
  }

  getAllShelfBooks() {
    this.setState({ isLoading: true });
    BooksAPI.getAll().then(
      books => {
        this.setState({ books, shelves: this.groupBooksByShelf(books), isLoading: false });
      }
    ).catch(
      err => {
        console.error(`Something went wrong with get all books endpoint. ${err}`);
        this.setState({ isLoading: false });
      });
  }

  groupBooksByShelf(books) {
    let groupedBooks = {};
    books.forEach(book => groupedBooks[book.shelf] ?
                            groupedBooks[book.shelf].push(book.id)
                            : groupedBooks[book.shelf] = [book.id]);
    return groupedBooks;
  }

  moveBookToShelf(selectedBook, shelf) {
    this.setState({ isLoading: true });
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
                  ...books.slice(index + 1)],
                isLoading: false
              }
            } else {
              return {
                books: [...books, Object.assign({}, selectedBook, { shelf: shelf })],
                isLoading: false
              }
            }
          }
        )
      )
    ).catch(
      err => {
        console.error(`Something went wrong with update books endpoint. ${err}`);
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { books, shelves, isLoading } = this.state;
    return (
      <div className="app">
        { isLoading && <Loading />}
        <Route exact path='/' render={() => (
          <BooksList books={ books } moveBookToShelf={ this.moveBookToShelf } />)}
        />
        <Route exact path='/search' render={() => (
          <BooksSearch shelves={ shelves } moveBookToShelf={ this.moveBookToShelf } />)}
        />
      </div>
    )
  }
}

export default BooksApp;