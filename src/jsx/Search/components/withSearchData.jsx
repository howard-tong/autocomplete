import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  searchDataShape,
  suggestionShape,
} from '../utils/types';

const propTypes = {
  data: PropTypes.arrayOf(searchDataShape).isRequired,
  suggestions: PropTypes.arrayOf(suggestionShape),
  autoFocus: PropTypes.bool,
  formatData: PropTypes.func.isRequired,
  updateSuggestions: PropTypes.func.isRequired,
};

const defaultProps = {
  autoFocus: false,
  suggestions: [],
};

const withSearchData = (WrappedComponent) => {
  class WithSearchData extends Component {
    constructor(props) {
      super(props);
      this.state = {
        searchTerm: '',
        searchData: {
          primaryText: '',
          secondaryText: '',
        },
        isFocused: true,
        isFieldDirty: false,
      };

      const { autoFocus } = props;
      if (autoFocus) {
        this.inputRef = React.createRef();
      }
    }

    componentDidMount() {
      const { autoFocus, formatData, data } = this.props;
      if (autoFocus) {
        this.inputRef.current.focus();
      }
      const searchData = formatData(data);
      this.setState({ searchData });
    }

    getFeedbackMessage = (suggestions) => {
      const { isFieldDirty, searchTerm } = this.state;
      let message = '';
      if (isFieldDirty) {
        if (searchTerm.length < 3) {
          message = 'Enter at least 3 characters';
        } else if (suggestions.length === 0) {
          message = 'No matches found';
        }
      }
      return message;
    };

    getSuggestions = (searchTerm, searchData) => (
      searchData.filter((data) => {
        const primaryTextLower = data.primaryText.toLowerCase();
        return primaryTextLower.startsWith(searchTerm.toLowerCase());
      })
    )

    handleInputChange = (event) => {
      const { updateSuggestions } = this.props;
      const { searchData } = this.state;
      let { isFieldDirty } = this.state;
      let suggestions = [];
      const searchTerm = event.target.value;

      if (searchTerm.length > 2) {
        isFieldDirty = true;
        suggestions = this.getSuggestions(searchTerm, searchData);
      } else if (searchTerm === '') {
        isFieldDirty = false;
      }
      updateSuggestions(suggestions);
      this.setState({ searchTerm, isFieldDirty });
    }

    handleSuggestionClick = (searchTerm) => {
      const { updateSuggestions } = this.props;
      const { searchData } = this.state;
      const suggestions = this.getSuggestions(searchTerm, searchData);
      updateSuggestions(suggestions);
      this.setState({ searchTerm });
    }

    handleInputFocus = (isFocused) => {
      this.setState({ isFocused });
    }

    render() {
      const { searchTerm, isFocused } = this.state;
      const { suggestions } = this.props;
      const message = this.getFeedbackMessage(suggestions);
      return (
        <WrappedComponent
          isFocused={isFocused}
          searchTerm={searchTerm}
          suggestions={suggestions}
          feedbackMessage={message}
          inputRef={this.inputRef}
          onBlur={() => this.handleInputFocus(false)}
          onFocus={() => this.handleInputFocus(true)}
          onChange={this.handleInputChange}
          onSuggestionClick={this.handleSuggestionClick}
        />
      );
    }
  }

  WithSearchData.propTypes = propTypes;
  WithSearchData.defaultProps = defaultProps;

  return WithSearchData;
};

export default withSearchData;
