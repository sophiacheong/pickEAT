import React from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';

const breakpoints = {
  desktop: '(min-width: 1025px)',
  phone: '(max-width: 767px)',
};

function Breakpoint({ name, children }) {
  const breakpoint = breakpoints[name] || breakpoints.desktop;

  return (
    <MediaQuery query={breakpoint}>
      {children}
    </MediaQuery>
  );
}

Breakpoint.propTypes = {
  name: PropTypes.string,
  children: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.any,
    ]),
  ),
};

Breakpoint.defaultProps = {
  name: null,
  children: null,
};

export default Breakpoint;
