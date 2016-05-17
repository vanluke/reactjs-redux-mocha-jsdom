import {expect} from 'chai';
import {List, Map} from 'immutable';

import {setEntries, next, vote} from '../server/core';

describe('core logic', () => {
  describe('setEntries', () => {
    it ('adds the entries to the state', () => {
      const state = Map();
      const entries = List.of('Trainspotting', '28 Days Later', 'Batman');
      const nextState = setEntries({state, entries});

      expect(nextState).to.equal(Map({entries: List.of('Trainspotting', '28 Days Later', 'Batman')}));
    });

    it ('converts to immutable', () => {
      const state = Map();
      const entries = ['Trainspotting', '28 Days Later', 'Batman'];
      const nextState = setEntries({state, entries});

      expect(nextState).to.equal(Map({entries: List.of('Trainspotting', '28 Days Later', 'Batman')}));
    });
  });

  describe ('next', () => {
    it('takes the next two entries under vote', () => {
      const state = Map({
        entries: List.of('Trainspotting', '28 Days Later', 'Batman')
      });
      const nextState = next({ state });

      expect(nextState).to.equal(Map({vote: Map({
        pair: List.of('Trainspotting', '28 Days Later')
      }), entries: List.of('Batman')}));
    });
  });

  describe ('vote', () => {
    it('creates a tally for the voted entry', () => {
      const state = Map({
        pair: List.of('Trainspotting', '28 Days Later')
      });
      const voted = 'Trainspotting';
      const nextState = vote({ state, voted });

      expect(nextState).to.equal(Map({
        pair: List.of('Trainspotting', '28 Days Later'),
        tally: Map({
          'Trainspotting': 1
        })
      }));

      it('adds to existing tally for the voted entry', () => {
        const state = Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 3,
            '28 Days Later': 2
          })
        });

        const nextState = vote(state, 'Trainspotting');

        expect(nextState).to.equal(Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 4,
            '28 Days Later': 2
          })
        }));
      });

      it('puts winner of current vote back to entries', () => {
        const state = Map({
          vote: Map({
            pair: List.of('Trainspotting', '28 Days Later'),
            tally: Map({
              'Trainspotting': 3,
              '28 Days Later': 3
            })
          }),
          entries: List.of('Sunshine', 'Millions', '127 Hours')
        });
        const nextState = next({state});

        expect(nextState).to.equal(Map({
          vote: Map({
            pair: List.of('Sunshine', 'Millions')
          }),
          entries: List.of('127 Hours', 'Trainspotting', '28 Days Later')
        }));
      });

      it('marks winner when just one entry left', () => {
        const state = Map({
          vote: Map({
            pair: List.of('Trainspotting', '28 Days Later'),
            tally: Map({
              'Trainspotting': 55,
              '28 Days Later': 4
            })}),
            entries: List()
          });
          const nextState = next({state});

          expect(nextState).to.equal(Map({
            winner: 'Trainspotting'
          }));
        });
      });
    });
  });
