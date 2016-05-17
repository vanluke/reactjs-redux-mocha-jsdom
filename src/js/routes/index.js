import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../reducer';
import {VoteComponentContainer} from '../components/voting';
import App from '../components/app';
import {ResultContainer} from '../components/results';
import {socket} from './configure-socketio';
import {setState} from '../actionCreators';
import remoteActionMiddleware from '../reduxMiddleware';

socket.on('state', state => {
    return store.dispatch(setState(state));
});

const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore);

const store = createStoreWithMiddleware(reducer);

const routes = <Router history={hashHistory}>
  <Route path='/' component={App}>
    <IndexRoute component={VoteComponentContainer}/>
    <Route path='/results' component={ResultContainer} />
  </Route>
</Router>;

ReactDOM.render(<Provider store={store}>{routes}</Provider>, document.getElementById('container'));
// ReactDOM.render(<Voting pair={pair} winner="Trainspotting"/>, document.getElementById('container'));
