import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'
import rootRdc from '../reducers/rootRdc'
import thunk from 'redux-thunk'
import { verifyAuth } from '../actions/authActs'

export function state() {
    const store = createStore(rootRdc, composeWithDevTools(applyMiddleware(thunk)))

    store.dispatch(verifyAuth());

    return store;
}