import React from 'react';
import * as BooksAPI from '../BooksAPI';
import { Route, Switch } from 'react-router-dom';
import BooksList from './BooksList';
import BooksSearch from './BooksSearch';
import BooksSelector from './BooksSelector';
import Loading from '../Loading';
import '../App.css';
import PageNotFoundImage from '../images/404.jpg';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      shelves: {},
      isLoading: false,
      selectedBooks: [],
      isSelectMode: false,
    };
  }

  componentDidMount() {
    this.getAllShelfBooks();
  }

  getAllShelfBooks = () => {
    this.setState({ isLoading: true });
    BooksAPI.getAll()
      .then(books => {
        this.setState({
          books,
          shelves: this.groupBooksByShelf(books),
          isLoading: false,
        });
      })
      .catch(err => {
        console.error(
          `Something went wrong with get all books endpoint. ${err}`,
        );
        this.setState({ isLoading: false });
      });
  };

  groupBooksByShelf = books => {
    let groupedBooks = {};
    books.forEach(
      book =>
        groupedBooks[book.shelf]
          ? groupedBooks[book.shelf].push(book.id)
          : (groupedBooks[book.shelf] = [book.id]),
    );
    return groupedBooks;
  };

  onSelectModeToggle = () => {
    this.setState(prevState => ({
      isSelectMode: !prevState.isSelectMode,
      selectedBooks: [],
    }));
  };

  switchOffSelectMode = () => {
    this.setState({
      isSelectMode: false,
      selectedBooks: [],
    });
  };

  onBookSelectUnselect = bookId => {
    const selectedPreviously = this.state.selectedBooks.indexOf(bookId);
    if (selectedPreviously < 0) {
      this.setState(prevState => ({
        selectedBooks: [...prevState.selectedBooks, bookId],
      }));
    } else {
      this.setState(prevState => ({
        selectedBooks: [
          ...prevState.selectedBooks.slice(0, selectedPreviously),
          ...prevState.selectedBooks.slice(selectedPreviously + 1),
        ],
      }));
    }
  };

  moveBookToShelf = (selectedBook, shelf) => {
    this.setState({ isLoading: true });
    BooksAPI.update(selectedBook, shelf)
      .then(data =>
        this.setState(
          { shelves: data },
          this.setState(state => {
            const books = state.books;
            const index = books.findIndex(book => book.id === selectedBook.id);
            if (index > -1) {
              return {
                books: [
                  ...books.slice(0, index),
                  Object.assign({}, books[index], { shelf: shelf }),
                  ...books.slice(index + 1),
                ],
                isLoading: false,
              };
            } else {
              return {
                books: [
                  ...books,
                  Object.assign({}, selectedBook, { shelf: shelf }),
                ],
                isLoading: false,
              };
            }
          }),
        ),
      )
      .catch(err => {
        console.error(
          `Something went wrong with update books endpoint. ${err}`,
        );
        this.setState({ isLoading: false });
      });
  };

  onBulkMoveBooks = shelf => {
    // Update the backend for all moved books and then request for all books on updated shelf
    this.setState({ isLoading: true });
    const moveAllBooksAction = Promise.all(
      this.state.selectedBooks.map(id => BooksAPI.update({ id }, shelf)),
    );
    const completionAction = () =>
      this.setState(
        { selectedBooks: [], isSelectMode: false },
        this.getAllShelfBooks(),
      );
    // Perform same action even in case of any promise rejection instead of notifying user of failure
    moveAllBooksAction
      .then(() => completionAction())
      .catch(() => completionAction());
  };

  render() {
    const { books, shelves, isLoading } = this.state;
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <div className="app">
              {isLoading && <Loading />}
              <BooksList
                books={books}
                isSelectMode={this.state.isSelectMode}
                selectedBooks={this.state.selectedBooks}
                onBookSelectUnselect={this.onBookSelectUnselect}
                switchOffSelectMode={this.switchOffSelectMode}
                moveBookToShelf={this.moveBookToShelf}
              />
              <BooksSelector
                isSelectMode={this.state.isSelectMode}
                selectedBooks={this.state.selectedBooks}
                onBulkMoveBooks={this.onBulkMoveBooks}
                onSelectModeToggle={this.onSelectModeToggle}
              />
            </div>
          )}
        />
        <Route
          exact
          path="/search"
          render={() => (
            <div className="app">
              {isLoading && <Loading />}
              <BooksSearch
                shelves={shelves}
                moveBookToShelf={this.moveBookToShelf}
              />
            </div>
          )}
        />
        <Route
          render={() => (
            <div className="app dark">
              <img
                className="page-not-found-404"
                src={PageNotFoundImage}
                alt="404 - Page Not Found!"
              />
            </div>
          )}
        />
      </Switch>
    );
  }
}

export default BooksApp;
