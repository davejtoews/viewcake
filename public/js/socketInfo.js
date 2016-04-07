'use strict';

socket.on('socketcount', function (data) {
  ReactDOM.render(React.createElement(
    'p',
    null,
    data,
    ' squares online ',
    React.createElement('br', null),
    ' join in at pixels.viewcake.com'
  ), document.getElementById('socketInfo'));
});