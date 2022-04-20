import { combineReducers } from 'redux'
import activityRdc from './activityRdc'
import asyncRdc from './asyncRdc'
import authRdc from './authRdc'
import commonRdc from './commonRdc'
import profileRdc from './profileRdc'

const rootRdc = combineReducers({
    profile: profileRdc,
    async: asyncRdc,
    auth: authRdc,
    activity: activityRdc,
    common: commonRdc,
})

export default rootRdc