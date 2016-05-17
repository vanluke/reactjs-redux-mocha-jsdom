import {List, Map} from 'immutable';

export default function vote ({ state, voted }) {
  return state.updateIn(['tally', voted], 0, tally => tally + 1);
}
