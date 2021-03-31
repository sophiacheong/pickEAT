import React from 'react';
import Breakpoint from './breakpoint';

function Desktop() {
  return (
    <Breakpoint name="desktop">
      {children}
    </Breakpoint>
  );
}

export default Desktop;
