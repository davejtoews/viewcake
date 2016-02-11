'use strict';

socket.on('socketcount', function (data) {
  ReactDOM.render(React.createElement(
    'p',
    null,
    data,
    ' squares'
  ), document.getElementById('socketInfo'));
});