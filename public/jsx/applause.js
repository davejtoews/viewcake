var ApplauseButton = React.createClass({
  handleClick: function(event) {
    socket.emit("applause");
  },
  render: function() {
    return (
      <button className="applause" onClick={this.handleClick}>
      	<img src="/public/img/applause.svg" alt="Applause" />
      </button>
    );
  }
});

var BooButton = React.createClass({
  handleClick: function(event) {
    socket.emit("boo");
  },
  render: function() {
    return (
      <button className="boo" onClick={this.handleClick}>
      	<img src="/public/img/boo.svg" alt="Boo" />
      </button>
    );
  }
});

ReactDOM.render(
	<div>
		<ApplauseButton />
		<BooButton />
	</div>,
	document.getElementById('react')
);