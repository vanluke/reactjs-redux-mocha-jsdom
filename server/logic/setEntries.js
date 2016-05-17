import {List, Map} from 'immutable';
export default function setEntries ({ state, entries }) {
  return state.set('entries', List(entries));
}
