import { combineReducers } from 'redux'
import activityRdc from './activityRdc'
import commonRdc from './commonRdc'

const rootRdc = combineReducers({
    activity: activityRdc,
    common: commonRdc,
})

export default rootRdc