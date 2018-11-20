import PropTypes from 'prop-types';

export const suggestionShape = PropTypes.shape({
  primaryText: PropTypes.string,
  secondaryText: PropTypes.string,
});

export const bookShape = PropTypes.shape({
  title: PropTypes.string,
  author: PropTypes.string,
});
