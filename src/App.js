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
  }

  getShelfBooks() {
    BooksAPI.getAll().then(books => this.setState({ books }));
  }

  componentDidMount() {
    this.getShelfBooks();
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (<BooksList books={this.state.books} />)} />
        <Route exact path='/search' component={ BooksSearch } />
      </div>
    )
  }
}

export default BooksApp;
