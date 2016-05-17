import React from 'react';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  findRenderedDOMComponentWithClass,
  Simulate
} from 'react-addons-test-utils';
import wrap from 'react-mocha-stateless-test-helper';
import {List, Map} from 'immutable';
import {Results} from '../src/js/components/results';
import ReactDOM from 'react-dom';
import {expect} from 'chai';

describe('results', () => {
  it('renders entries with vote counts or zero', () => {
    const pair = List.of('Trainspotting', '28 Days Later');
    const tally = Map({'Trainspotting': 5});
    const props = {
      pair, tally
    };
    const component = renderIntoDocument(wrap(Results, props));
    const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
    const [train, days] = entries.map(e => e.textContent);

    expect(entries.length).to.equal(2);
    expect(train).to.contain('Trainspotting');
    expect(train).to.contain('5');
    expect(days).to.contain('28 Days Later');
    expect(days).to.contain('0');
  });

  it('invokes the next callback when next button is clicked', () => {
    let nextInvoked = false;
    const next = () => nextInvoked = true;
    const props = {
      pair: List.of('Trainspotting', '28 Days Later'),
      tally: Map(),
      next
    };
    const component = renderIntoDocument(wrap(Results, props));
    const nextBtn = scryRenderedDOMComponentsWithClass(component, 'next');
    Simulate.click(nextBtn[0]);

    expect(nextInvoked).to.equal(true);
  });

  it('renders the winner when there is one', () => {
    const props = {
      pair: List.of('Trainspotting', '28 Days Later'),
      tally: Map(),
      winner:'Trainspotting'
    };
    const component = renderIntoDocument(wrap(Results, props));
    const winner =  scryRenderedDOMComponentsWithClass(component, 'winner');

    expect(winner).to.be.ok;
    expect(winner[0].textContent).to.contain('Trainspotting');
  });
});
