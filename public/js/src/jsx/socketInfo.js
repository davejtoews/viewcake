socket.on('socketcount', function (data) {
  ReactDOM.render(
    <p>{data} squares online <br /> join in at pixels.viewcake.com</p>,
    document.getElementById('socketInfo')
  );
});

