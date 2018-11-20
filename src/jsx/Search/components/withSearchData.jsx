import React, { Component } from 'react';
import PropTypes from 'prop-types';

const dataShape = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
  }),
]);

const propTypes = {
  data: PropTypes.arrayOf(dataShape).isRequired,
  suggestions: PropTypes.arrayOf(dataShape),
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

    handleInputChange = (event) => {
      const { updateSuggestions } = this.props;
      const { searchData } = this.state;
      let { isFieldDirty } = this.state;
      let suggestions = [];
      const searchTerm = event.target.value;

      if (searchTerm.length > 2) {
        isFieldDirty = true;
        suggestions = searchData.filter(data => this.matchSearchTerm(searchTerm, data.primaryText));
      } else if (searchTerm === '') {
        isFieldDirty = false;
      }
      updateSuggestions(suggestions);
      this.setState({ searchTerm, isFieldDirty });
    }

    matchSearchTerm = (searchTerm, primaryText) => {
      const primaryTextLower = primaryText.toLowerCase();
      return primaryTextLower.includes(searchTerm.toLowerCase());
    }

    render() {
      const { searchTerm } = this.state;
      const { suggestions } = this.props;
      const message = this.getFeedbackMessage(suggestions);
      return (
        <WrappedComponent
          searchTerm={searchTerm}
          suggestions={suggestions}
          feedbackMessage={message}
          inputRef={this.inputRef}
          onChange={this.handleInputChange}
        />
      );
    }
  }

  WithSearchData.propTypes = propTypes;
  WithSearchData.defaultProps = defaultProps;

  return WithSearchData;
};

export default withSearchData;
