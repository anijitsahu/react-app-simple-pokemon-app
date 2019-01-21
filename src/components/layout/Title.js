import React from 'react';

// components
import UserGreeting from './UserGreeting'


const Title = (props) => {
  let { userInfo } = props
  return (
    <div className="title">
      <span className="caption">Simple <strong>pokemon application</strong></span>
      <UserGreeting username={userInfo.name} />
    </div>
  );
};


export default Title;