import React from 'react';

export default function (StatelessComponent, props) {
  const wrapToClass = React.createClass({
    render: function () {
      return <StatelessComponent {...props} />;
    }
  });
  return React.createElement(wrapToClass);
}
