import { combineReducers } from 'redux';
import searchReducer from './jsx/Search/redux/search.reducer';

export default combineReducers({
  search: searchReducer,
});
