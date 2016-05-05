var ResetForm = React.createClass({
	getInitialState: function() {
		return {value: ''};
	},
	handleChange: function(event) {
		this.setState({value: event.target.value});
	},
	handleClick: function(event) {
		event.preventDefault();
		var presentation = this.state.value;
		socket.emit('api/configs::find', {name: "default_presentation"}, function(error, data) {
			console.log(data);
			if (data.data[0]._id) {
				var configId = data.data[0]._id
				socket.emit('api/presentations::find', {name: presentation}, function(error, data) {
					console.log(data);
					if (data.data[0]._id) {
						var presentationId = data.data[0]._id;
						socket.emit('api/configs::patch', configId,  { value: presentationId }, function(error, data) {
							console.log(data);
							console.log("config:" + configId);
							console.log("presentation:" + presentationId);
							socket.emit("forceReload");
						});
					}
				});  				
			}

		});
	},
	render: function() {
		return (
			<form>
				<input type="text" value={this.state.value} onChange={this.handleChange} />
				<button onClick={this.handleClick} >
				Reset
				</button>
			</form>
		);
	}
});

ReactDOM.render(
	<ResetForm />,
	document.getElementById('resetControls')
);