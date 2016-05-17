import {expect} from 'chai';
import {List, Map} from 'immutable';

describe('immutability', () => {
  describe('counter', () => {
    const increment = (currentState) => {
      return currentState + 1;
    };
    it ('is immutable', () => {
      let state = 42;
      let nextState = increment(state);

      expect(nextState).to.equal(43);
      expect(state).to.equal(42);
    });
  });

  describe('a list', () => {
    const addMovie = (currentState, movie) => {
      return currentState.push(movie);
    };
    it('is immutable', () => {
      const state = List.of('Trainspotting', '28 Days Later', 'Batman');
      const nextState = addMovie(state, 'James Bond');

      expect(nextState).to.equal(List.of('Trainspotting', '28 Days Later', 'Batman', 'James Bond'));
      expect(state).to.equal(List.of('Trainspotting', '28 Days Later', 'Batman'));
    });
  });

  describe('a tree', () => {
    const addMovie = (currentState, movie) => {
      return currentState.set('movies', currentState.get('movies').push(movie));
    };
    it('is immutable', () => {
      const state = Map({
        movies: List.of('Trainspotting', '28 Days Later', 'Batman')
      });
      const nextState = addMovie(state, 'James Bond');

      expect(nextState)
      .to
      .equal(Map({movies: List.of('Trainspotting', '28 Days Later', 'Batman', 'James Bond')}));

      expect(state)
      .to
      .equal(Map({movies: List.of('Trainspotting', '28 Days Later', 'Batman')}));
    });
  });

});
