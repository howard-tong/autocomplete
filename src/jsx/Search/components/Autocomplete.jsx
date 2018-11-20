import React from 'react';
import PropTypes from 'prop-types';

import { suggestionShape } from '../utils/types';

const propTypes = {
  feedbackMessage: PropTypes.string,
  searchTerm: PropTypes.string.isRequired,
  suggestions: PropTypes.arrayOf(suggestionShape),
  inputRef: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.func,
  ]),
  onChange: PropTypes.func.isRequired,
};

const defaultProps = {
  feedbackMessage: '',
  suggestions: [],
  inputRef: () => {},
};

const Autocomplete = ({
  feedbackMessage,
  searchTerm,
  suggestions,
  inputRef,
  onChange,
}) => {
  const renderSuggestions = () => (
    suggestions.map((suggestion, index) => (
      <div key={index.toString()} className="autocomplete-suggestion-row">
        <span className="autocomplete-primary-text">
          { suggestion.primaryText }
        </span>
        {
          suggestion.secondaryText
            && (
              <span className="autocomplete-secondary-text">
                { suggestion.secondaryText }
              </span>
            )
        }
      </div>
    ))
  );
  return (
    <div id="autocomplete">
      <input
        className="autocomplete-input"
        type="text"
        ref={inputRef}
        value={searchTerm}
        onChange={onChange}
      />
      <div className="autocomplete-suggestions-section">
        {
          suggestions.length !== 0
            ? (
              <div className="autocomplete-suggestions">
                { renderSuggestions() }
              </div>
            ) : (
              <div className="autocomplete-message">{ feedbackMessage }</div>
            )
        }
      </div>
    </div>
  );
};

Autocomplete.propTypes = propTypes;
Autocomplete.defaultProps = defaultProps;

export default Autocomplete;
