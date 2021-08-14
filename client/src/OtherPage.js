import React from 'react';
import { Link }  from 'react-router-dom';

// eslint-disable-next-line
export default () =>  {
  return (
    <div>
      Just another page!
      <Link to="/">Back to Home!</Link>
    </div>
  );
}
