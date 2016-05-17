import {List, Map} from 'immutable';
import setState from './merge-states';
import vote from './vote';
import resetVotes from './reset-votes';

export default function(state = Map(), action) {
  switch (action.type) {
  case 'SET_CLIENT_ID':

  case 'SET_CONNECTION_STATE':

  case 'SET_STATE':
    return resetVotes(setState(state, action.state));
  case 'VOTE':
    return vote(state, action.entry);
  }
  return state;
}
