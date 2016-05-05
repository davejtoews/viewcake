'use strict';

var ResetForm = React.createClass({
	displayName: 'ResetForm',

	getInitialState: function getInitialState() {
		return { value: '' };
	},
	handleChange: function handleChange(event) {
		this.setState({ value: event.target.value });
	},
	handleClick: function handleClick(event) {
		event.preventDefault();
		var presentation = this.state.value;
		socket.emit('api/configs::find', { name: "default_presentation" }, function (error, data) {
			console.log(data);
			if (data.data[0]._id) {
				var configId = data.data[0]._id;
				socket.emit('api/presentations::find', { name: presentation }, function (error, data) {
					console.log(data);
					if (data.data[0]._id) {
						var presentationId = data.data[0]._id;
						socket.emit('api/configs::patch', configId, { value: presentationId }, function (error, data) {
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
	render: function render() {
		return React.createElement(
			'form',
			null,
			React.createElement('input', { type: 'text', value: this.state.value, onChange: this.handleChange }),
			React.createElement(
				'button',
				{ onClick: this.handleClick },
				'Reset'
			)
		);
	}
});

ReactDOM.render(React.createElement(ResetForm, null), document.getElementById('resetControls'));