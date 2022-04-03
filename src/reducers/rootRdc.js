import { combineReducers } from 'redux'
import activityRdc from './activityRdc'
import authRdc from './authRdc'
import commonRdc from './commonRdc'

const rootRdc = combineReducers({
    auth: authRdc,
    activity: activityRdc,
    common: commonRdc,
})

export default rootRdc