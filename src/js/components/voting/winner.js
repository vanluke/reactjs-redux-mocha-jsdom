import React from 'react';

const winner = props => {
  return <div className="winner">Winner is {props.winner}!</div>;
};

winner.propTypes = {
  winner: React.PropTypes.string.isRequired
};

export default winner;
