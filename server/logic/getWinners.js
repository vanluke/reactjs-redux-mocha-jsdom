const getWinners = (vote) => {
  if (!vote) {
    return [];
  }
  const [a,b] = vote.get('pair');
  const aVotes = vote.getIn (['tally', a], 0);
  const bVotes = vote.getIn (['tally', b], 0);
  if (aVotes > bVotes) {
    return [a];
  } else if (aVotes < bVotes) {
    return [b];
  }
  return [a, b];
};

export default getWinners;
