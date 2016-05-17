import {next, vote, setEntries, INITIAL_STATE} from '../core';
import setState from './merge-states';

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'NEXT':
      return next({ state });
    case 'VOTE':
      return state.update('vote', voteState => vote({ state:voteState, voted: action.entry }));
    case 'SET_ENTRIES':
      return setEntries({ state:state, entries: action.entries });
    case 'SET_STATE': return setState(state, action.state);
  }
  return state;
}
