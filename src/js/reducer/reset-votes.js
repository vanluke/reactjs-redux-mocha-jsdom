export default function resetVote(state) {
  const hasVoted = state.get('hasVoted');
  const currentPair = state.getIn(['vote', 'pair']);
  if (hasVoted && !currentPair.includes(hasVoted)) {
    return state.remove('hasVoted');
  }
  return state;
}
