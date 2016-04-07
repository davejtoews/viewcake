socket.on('socketcount', function (data) {
  ReactDOM.render(
	    <p>squares online<br />
	    <span className="square-count">{data} </span><br />
	    join in at pixels.viewcake.com</p>,
    document.getElementById('socketInfo')
  );
});

