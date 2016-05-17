import React from 'react';
import Winner from './winner';
import Vote from './vote';
import {connect} from 'react-redux';
import {List} from 'immutable';
import * as actionCreators from '../../actionCreators';
const getFlow = (props) => {
    return props.winner
      ? <Winner {...props} />
    : parseEntry(props);
};

const parseEntry = (props) => {
  return props.pair.map(p => {
    return <Vote key={p}  entry={p} hasVoted={props.hasVoted} vote={props.vote} />;
  });
};

const VoteComponent = function (props) {
  const mapEntry = getFlow(props);
  return <div className="voting">
    {mapEntry}
  </div>;
};

VoteComponent.propTypes = {
    pair: React.PropTypes.oneOfType([React.PropTypes.instanceOf(List), React.PropTypes.array]).isRequired,
    vote: React.PropTypes.func.isRequired,
    hasVoted: React.PropTypes.string,
    winner: React.PropTypes.string
};

VoteComponent.defaultProps = {
    pair: List(),
    vote: () => {},
    hasVoted: '',
    winner: ''
};


function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    winner: state.get('winner'),
    hasVoted: state.get('hasVoted')
  };
}

const VoteComponentContainer = connect(mapStateToProps, actionCreators)(VoteComponent);
export { VoteComponent, VoteComponentContainer };
