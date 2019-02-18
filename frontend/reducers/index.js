import { combineReducers } from 'redux';

import authentication from './authentication';
import login from './login';

const rootReducer = combineReducers({
  authentication,
  login
});

export default rootReducer;
