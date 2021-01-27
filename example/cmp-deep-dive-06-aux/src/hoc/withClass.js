import React from 'react';

const withClass = (WraperComponent, className) => {
  return props => (
    <div className={className}>
      <WraperComponent />
    </div>
  );
};

export default withClass;