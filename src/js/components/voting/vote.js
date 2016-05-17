import React from 'react';

const isDisabled = (hasVoted = false) => {
  return !!hasVoted;
};

const hasVotedFor = (hasVoted, entry) => {
  return hasVoted === entry;
};

const vote = ({ entry, vote, hasVoted }) => {
  return <button key={entry}
      onClick={vote.bind(null, entry)}
      disabled={isDisabled(hasVoted)}>
      <h1>{entry}</h1>
      {hasVotedFor(hasVoted, entry)
          ? <div className="label">Voted</div>
          : undefined }
    </button>;
};

vote.propTypes = {
  entry: React.PropTypes.string.isRequired,
  vote: React.PropTypes.func.isRequired,
  hasVoted: React.PropTypes.string
};

vote.defaultProps = {
  entry: undefined,
  vote: ()=>{},
  hasVoted: undefined
};

export default vote;
