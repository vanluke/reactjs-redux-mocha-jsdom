import React from 'react';
import ReactDOM from 'react-dom';
import wrap from 'react-mocha-stateless-test-helper';
import {renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate,
  scryRenderedDOMComponentsWithClass} from 'react-addons-test-utils';
import {VoteComponent} from '../src/js/components/voting';
import {expect} from 'chai';
import {List} from 'immutable';

describe('voting', () => {
  it('renders a pair of buttons', () => {
    let votedWith = undefined;
    const vote = entry => votedWith = entry;
    const props = { pair: ['Trainspotting', '28 Days Later'], vote };
    const component = renderIntoDocument(wrap(VoteComponent, props));
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons.length).to.equal(2);
    expect(buttons[0].textContent).to.equal('Trainspotting');
    expect(buttons[1].textContent).to.equal('28 Days Later');
  });

  it ('invokes callback when a button is clicked', () => {
    let votedWith = undefined;
    const vote = entry => votedWith = entry;
    const props = { pair: ['Trainspotting', '28 Days Later'], vote };
    const component = renderIntoDocument(wrap(VoteComponent, props));
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    Simulate.click(buttons[0]);

    expect(votedWith).to.equal('Trainspotting');
  });

  it('disables buttons when user has voted', () => {
    const hasVoted = 'Trainspotting';
    const props = { pair: ['Trainspotting', '28 Days Later'], hasVoted };
    const component = renderIntoDocument(wrap(VoteComponent, props));
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].hasAttribute('disabled')).to.equal(true);
    expect(buttons[1].hasAttribute('disabled')).to.equal(true);
  });

  it('when voted adds label', () => {
    const hasVoted = 'Trainspotting';
    const props = { pair: ['Trainspotting', '28 Days Later'], hasVoted };
    const component = renderIntoDocument(wrap(VoteComponent, props));
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].textContent).to.contain('Voted');
  });

  it('renders just the winner when there is one', () => {
    const winner = 'Trainspotting';
    const props = { pair: ['Trainspotting', '28 Days Later'], winner };
    const component = renderIntoDocument(wrap(VoteComponent, props));
    const winnerElement = scryRenderedDOMComponentsWithClass(component, 'winner');

    expect(winnerElement[0]).to.not.equal(undefined);
    expect(winnerElement[0].textContent).to.contain('Trainspotting');
  });
});
