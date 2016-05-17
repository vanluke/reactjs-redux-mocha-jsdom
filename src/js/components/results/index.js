import React from 'react';
import {List, Map} from 'immutable';
import {connect} from 'react-redux';
import Winner from './winner';
import * as actionCreators from '../../actionCreators';

const getEntry = (tally, entry) => {
  return tally && tally.has(entry) ? tally.get(entry) : 0;
};

const mapPairs = ({ pair, tally, next }) => {
  return pair.map((entry) => {
    return <div key={entry} className="entry">
      <h1>{entry}</h1>
      <div className="voteCount">
        {getEntry(tally, entry)}
      </div>
      <div className="management">
        <button
          className="next"
          onClick={next}>
          Next
        </button>
      </div>
    </div>;
  });
};

const Results = props => {
  return <div className="results">
    {props.winner ? <Winner {...props} /> : mapPairs(props)}
  </div>;
};

Results.propTypes = {
    pair: React.PropTypes.oneOfType([React.PropTypes.instanceOf(List),React.PropTypes.array]).isRequired,
    tally: React.PropTypes.oneOfType([React.PropTypes.instanceOf(Map), React.PropTypes.array]),
    next: React.PropTypes.func.isRequired
};

Results.defaultProps = {
  pair: List(),
  tally: Map(),
  // next: () => {
  //   console.log('next');
  // }
};

function mapStateToProps (state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    winner: state.get('winner'),
    tally: state.getIn(['vote', 'tally'])
  };
}
const ResultContainer = connect(mapStateToProps, actionCreators)(Results);

export {Results, ResultContainer};
