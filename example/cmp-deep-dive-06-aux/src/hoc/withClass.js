import React from 'react';

const withClass = (WraperComponent, className) => {
  return props => (
    <div className={className}>
      <WraperComponent {...props}/>
    </div>
  );
};

export default withClass;