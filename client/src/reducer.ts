import { combineReducers } from 'redux'

import overlayReducer from './overlay/reducer'
import dashboardReducer from './dashboard/reducer'
import commonReducer from './common/reducer'

export default combineReducers({
  overlay: overlayReducer,
  dashboard: dashboardReducer,
  common: commonReducer
})
