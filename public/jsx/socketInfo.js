socket.on('socketcount', function (data) {
  ReactDOM.render(
    <p>{data} squares</p>,
    document.getElementById('socketInfo')
  );
});

