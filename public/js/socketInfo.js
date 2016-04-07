'use strict';

socket.on('socketcount', function (data) {
  ReactDOM.render(React.createElement(
    'p',
    null,
    'squares online',
    React.createElement('br', null),
    React.createElement(
      'span',
      { className: 'square-count' },
      data,
      ' '
    ),
    React.createElement('br', null),
    'pixels.viewcake.com'
  ), document.getElementById('socketInfo'));
});