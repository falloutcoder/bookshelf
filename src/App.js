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
      books: []
    }
    this.moveBookToShelf = this.moveBookToShelf.bind(this);
  }

  getAllShelfBooks() {
    BooksAPI.getAll().then(books => this.setState({ books }));
  }

  moveBookToShelf(selectedBook, shelf) {
    BooksAPI.update(selectedBook, shelf).then(data => this.setState(
      state => {
        let index = state.books.findIndex(book => book.id === selectedBook.id);
        const books = state.books;
        return {
          books: [
            ...books.slice(0, index),
            Object.assign({}, books[index], { shelf: shelf }),
            ...books.slice(index + 1)
          ]
        }})
    );
  }

  componentDidMount() {
    this.getAllShelfBooks();
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BooksList books={ this.state.books } moveBookToShelf={ this.moveBookToShelf } />)} />
        <Route exact path='/search' component={ BooksSearch } />
      </div>
    )
  }
}

export default BooksApp;
