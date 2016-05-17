import makeStore from './movie-store';
import {start} from './server';
import entities from './../entries.json';

export const store = makeStore();
start(store);
store.dispatch({
  type: 'SET_ENTRIES',
  entries: entities
});
store.dispatch({type: 'NEXT'});
