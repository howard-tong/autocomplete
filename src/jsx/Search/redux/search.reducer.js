import {
  UPDATE_CITY_SUGGESTIONS,
  UPDATE_BOOK_SUGGESTIONS,
} from './search.actions';

import { cities, books } from '../../../utils/data';

const INITIAL_STATE = {
  cities,
  books,
  citySuggestions: [],
  bookSuggestions: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_CITY_SUGGESTIONS:
      return { ...state, citySuggestions: action.payload };
    case UPDATE_BOOK_SUGGESTIONS:
      return { ...state, bookSuggestions: action.payload };
    default:
      return state;
  }
};
