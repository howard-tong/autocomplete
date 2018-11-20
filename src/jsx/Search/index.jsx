import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import withSearchData from './components/withSearchData';
import Autocomplete from './components/Autocomplete';
import {
  updateBookSuggestions as updateBookSuggestionsAC,
  updateCitySuggestions as updateCitySuggestionsAC,
} from './redux/search.actions';
import {
  bookShape,
  suggestionShape,
} from './utils/types';

const propTypes = {
  books: PropTypes.arrayOf(bookShape).isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  bookSuggestions: PropTypes.arrayOf(suggestionShape).isRequired,
  citySuggestions: PropTypes.arrayOf(suggestionShape).isRequired,
  updateBookSuggestions: PropTypes.func.isRequired,
  updateCitySuggestions: PropTypes.func.isRequired,
};

const CitySearch = withSearchData(Autocomplete);
const BookSearch = withSearchData(Autocomplete);

const Search = ({
  books,
  cities,
  bookSuggestions,
  citySuggestions,
  updateBookSuggestions,
  updateCitySuggestions,
}) => {
  const formatCityData = cityData => (
    cityData.map(city => ({
      primaryText: city,
    }))
  );

  const formatBookData = bookData => (
    bookData.map(book => ({
      primaryText: book.title,
      secondaryText: book.author,
    }))
  );
  return (
    <div className="search-area">
      <div>
        <span className="search-label">City</span>
        <CitySearch
          data={cities}
          suggestions={citySuggestions}
          autoFocus
          formatData={formatCityData}
          updateSuggestions={updateCitySuggestions}
        />
      </div>
      <div>
        <span className="search-label">Book Title</span>
        <BookSearch
          data={books}
          suggestions={bookSuggestions}
          formatData={formatBookData}
          updateSuggestions={updateBookSuggestions}
        />
      </div>
    </div>
  );
};

Search.propTypes = propTypes;

const mapStateToProps = state => ({
  books: state.search.books,
  cities: state.search.cities,
  bookSuggestions: state.search.bookSuggestions,
  citySuggestions: state.search.citySuggestions,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateBookSuggestions: updateBookSuggestionsAC,
  updateCitySuggestions: updateCitySuggestionsAC,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Search);
