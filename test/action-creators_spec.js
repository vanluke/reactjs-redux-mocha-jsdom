import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import {setState, vote, next} from '../src/js/actionCreators';

describe('action creators', () => {
  describe('set state', () => {
    it('set state return object with type and state', () => {
      const state = fromJS({
        vote: {
          pair: ['Trainspotting', '28 Days Later'],
          tally: {Trainspotting: 1}
        }
      });
      const nextState = setState(state);

      expect(nextState).to.deep.equal({
        type: 'SET_STATE',
        state: fromJS({
          vote: {
            pair: ['Trainspotting', '28 Days Later'],
            tally: {Trainspotting: 1}
          }
        })
      });

      it('VOTE return object with type and entry', () => {
        const state = fromJS({
          vote: {
            pair: ['Trainspotting', '28 Days Later'],
            tally: {Trainspotting: 1}
          },
          entry: '28 Days Later'
        });
        const nextState = vote(state);

        expect(nextState).to.deep.equal({
          type: 'VOTE',
          state: fromJS({
            vote: {
              pair: ['Trainspotting', '28 Days Later'],
              tally: {Trainspotting: 1}
            },
            meta: {remote:true},
            entry: '28 Days Later'
          })
        });
      });
      it('NEXT return object with type and meta properties', () => {
        const nextState = next();

        expect(nextState).to.equal({
          type: 'NEXT',
          meta: {remote:true}
        });
      });
    });
  });
});
