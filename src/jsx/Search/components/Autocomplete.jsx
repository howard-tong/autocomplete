import React from 'react';
import PropTypes from 'prop-types';

import { suggestionShape } from '../utils/types';

const propTypes = {
  isFocused: PropTypes.bool.isRequired,
  feedbackMessage: PropTypes.string,
  searchTerm: PropTypes.string.isRequired,
  suggestions: PropTypes.arrayOf(suggestionShape),
  inputRef: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.func,
  ]),
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSuggestionClick: PropTypes.func,
};

const defaultProps = {
  feedbackMessage: '',
  suggestions: [],
  inputRef: () => {},
  onSuggestionClick: () => {},
};

const Autocomplete = ({
  isFocused,
  feedbackMessage,
  searchTerm,
  suggestions,
  inputRef,
  onBlur,
  onFocus,
  onChange,
  onSuggestionClick,
}) => {
  const renderSuggestions = () => (
    suggestions.map((suggestion, index) => (
      <div
        key={index.toString()}
        className="autocomplete-suggestion-row"
        onMouseDown={() => onSuggestionClick(suggestion.primaryText)}
        role="presentation"
      >
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
  const showSuggestions = suggestions.length !== 0 && isFocused;
  return (
    <div id="autocomplete">
      <input
        className="autocomplete-input"
        type="text"
        ref={inputRef}
        value={searchTerm}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      <div className="autocomplete-suggestions-section">
        {
          showSuggestions
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
