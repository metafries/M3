import { createStore, applyMiddleware } from 'redux'
import rootRdc from '../reducers/rootRdc'
import { devToolsEnhancer } from '@redux-devtools/extension';

export function storage() {
    return createStore(rootRdc, devToolsEnhancer())
}