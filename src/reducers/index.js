import {combineReducers} from 'redux';

import General from './generalReducer';

const appReducer = combineReducers({
  general: General,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
