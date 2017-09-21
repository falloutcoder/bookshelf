import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SHELVES, SHELVES_DISPLAY_NAME } from '../constants';

class BooksSelector extends PureComponent {
  static propTypes = {
    selectedBooks: PropTypes.array.isRequired,
    isSelectMode: PropTypes.bool.isRequired,
    onBulkMoveBooks: PropTypes.func.isRequired,
    onSelectModeToggle: PropTypes.func.isRequired,
  };

  render() {
    const { selectedBooks, isSelectMode, onSelectModeToggle } = this.props;
    const atLeastOneBookSelected = selectedBooks.length !== 0;
    const style = {
      cursor: atLeastOneBookSelected ? 'pointer' : 'not-allowed',
    };

    if (!isSelectMode) {
      return <div className="select-books" onClick={onSelectModeToggle} />;
    } else {
      return (
        <div className="selected-books-action">
          <select
            className="selected-books-move"
            value="default"
            style={style}
            onChange={e => this.props.onBulkMoveBooks(e.target.value)}
            disabled={!atLeastOneBookSelected}
          >
            <option value="default" disabled>
              Move to...
            </option>
            <option value={SHELVES.currentlyReading}>
              {SHELVES_DISPLAY_NAME[SHELVES.currentlyReading]}
            </option>
            <option value={SHELVES.wantToRead}>
              {SHELVES_DISPLAY_NAME[SHELVES.wantToRead]}
            </option>
            <option value={SHELVES.read}>
              {SHELVES_DISPLAY_NAME[SHELVES.read]}
            </option>
            <option value="none">None</option>
          </select>
          <div className="selected-books-cancel" onClick={onSelectModeToggle} />
        </div>
      );
    }
  }
}

export default BooksSelector;
