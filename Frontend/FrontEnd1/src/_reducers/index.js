import { combineReducers } from 'redux';

import { authentication } from './auth.reducer';
import { vendor } from './vendor.reducer';
import { leave } from './leave.reducer';
import { project } from './project.reducer';

const rootReducer = combineReducers({
  authentication,
  vendor,
  leave,
  project,
});

export default rootReducer;
