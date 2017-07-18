import React from 'react';

class Loading extends React.Component {
  render() {
    return(
      <div className="loading">
        <div className="loading-animation">
          Please Wait!<div className="loader" />
        </div>
      </div>
    );
  }
}

export default Loading;