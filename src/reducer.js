import { combineReducers } from 'redux'

import overlayReducer from './overlay/reducer'
import dashboardReducer from './dashboard/reducer'

export default combineReducers({
  overlay: overlayReducer,
  dashboard: dashboardReducer
})
