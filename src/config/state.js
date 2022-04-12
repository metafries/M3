import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'
import rootRdc from '../reducers/rootRdc'
import thunk from 'redux-thunk'

export function state() {
    return createStore(rootRdc, composeWithDevTools(applyMiddleware(thunk)))
}