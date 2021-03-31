import React from 'react';
import Breakpoint from './breakpoint';

function Mobile() {
  return (
    <Breakpoint name="phone">
      {children}
    </Breakpoint>
  );
}

export default Mobile;
