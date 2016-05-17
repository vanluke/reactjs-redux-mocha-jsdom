import {List, Map} from 'immutable';
import getWinners from './getWinners';

export default function next ({ state }) {
  const entries = state.get('entries')
    .concat(getWinners(state.get('vote')));
  if (entries.size === 1) {
    return state.remove('vote')
      .remove('entries')
      .set('winner', entries.first());
  }

  return state.merge({
    vote: Map({pair: entries.take(2)}),
    entries: entries.skip(2)
  });
}
