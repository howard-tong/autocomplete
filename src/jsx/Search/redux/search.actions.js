export const UPDATE_CITY_SUGGESTIONS = 'search/UPDATE_CITY_SUGGESTIONS';
export const UPDATE_BOOK_SUGGESTIONS = 'search/UPDATE_BOOK_SUGGESTIONS';

export const updateCitySuggestions = citySuggestions => ({
  type: UPDATE_CITY_SUGGESTIONS,
  payload: citySuggestions,
});

export const updateBookSuggestions = bookSuggestions => ({
  type: UPDATE_BOOK_SUGGESTIONS,
  payload: bookSuggestions,
});
