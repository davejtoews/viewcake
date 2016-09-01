'use strict';

var JobForm = React.createClass({
	displayName: 'JobForm',

	getInitialState: function getInitialState() {
		return {
			opportunity_type: '',
			company_project: '',
			contact_name: '',
			contact_email: '',
			url: '',
			last_submitted_id: '',
			presentation: ''
		};
	},
	generateContent: function generateContent() {
		var output = '';
		output += '<h3>' + this.state.opportunity_type + '</h3>';
		output += '<p>' + this.state.company_project + '</p>';
		output += '<p>' + this.state.contact_name + '</p>';
		output += '<p><a href="mailto:' + this.state.contact_email + '">' + this.state.contact_email + '</a></p>';
		output += '<p><a href="' + this.state.url + '">' + this.state.url + '</a></p>';
		return output;
	},
	handleChange: function handleChange(event) {
		var stateObj = {};
		stateObj[event.target.name] = event.target.value;
		this.setState(stateObj);
	},
	handleClick: function handleClick(event) {
		event.preventDefault();
		var content = this.generateContent();
		var thisForm = this;
		socket.emit('api/slides::create', { content: content }, function (error, data) {
			if (!error) {
				thisForm.setState({
					opportunity_type: '',
					company_project: '',
					contact_name: '',
					contact_email: '',
					url: ''
				});
				thisForm.setState({ 'last_submitted_id': data._id });
			}
		});
	},
	handleAddToPres: function handleAddToPres(event) {
		event.preventDefault();
		last_submitted_id = this.state.last_submitted_id;
		socket.emit('api/presentations::find', { name: this.state.presentation }, function (error, data) {
			if (data.data.length == 1) {
				var slidesArray = data.data[0].slides;
				var presId = data.data[0]._id;
				slidesArray.push(last_submitted_id);
				socket.emit('api/presentations::patch', presId, { slides: slidesArray }, function (error, data) {
					if (!error) {
						thisForm.setState({
							last_submitted_id: ''
						});
					}
				});
			} else {
				console.log("Too many results");
			}
		});
	},
	handleReset: function handleReset() {
		socket.emit("forceReloadPres");
	},
	render: function render() {

		return React.createElement(
			'div',
			{ className: 'forms-wrapper' },
			React.createElement(
				'form',
				{ className: 'JobForm' },
				React.createElement(
					'label',
					{ htmlFor: 'opportunity_type' },
					'Opportunity Type: '
				),
				React.createElement('input', { type: 'text', name: 'opportunity_type', id: 'opportunity_type', value: this.state.opportunity_type, onChange: this.handleChange }),
				' ',
				React.createElement('br', null),
				React.createElement(
					'label',
					{ htmlFor: 'company_project' },
					'Company/Project: '
				),
				React.createElement('input', { type: 'text', name: 'company_project', id: 'company_project', value: this.state.company_project, onChange: this.handleChange }),
				' ',
				React.createElement('br', null),
				React.createElement(
					'label',
					{ htmlFor: 'contact_name' },
					'Contact Name: '
				),
				React.createElement('input', { type: 'text', name: 'contact_name', id: 'contact_name', value: this.state.contact_name, onChange: this.handleChange }),
				' ',
				React.createElement('br', null),
				React.createElement(
					'label',
					{ htmlFor: 'contact_email' },
					'Contact Email: '
				),
				React.createElement('input', { type: 'text', name: 'contact_email', id: 'contact_email', value: this.state.contact_email, onChange: this.handleChange }),
				' ',
				React.createElement('br', null),
				React.createElement(
					'label',
					{ htmlFor: 'url' },
					'Url: '
				),
				React.createElement('input', { type: 'text', name: 'url', id: 'url', value: this.state.url, onChange: this.handleChange }),
				' ',
				React.createElement('br', null),
				React.createElement('input', { type: 'submit', onClick: this.handleClick })
			),
			React.createElement(
				'form',
				{ className: 'JobForm' },
				React.createElement(
					'label',
					{ htmlFor: 'last_submitted_id' },
					'Last Submitted'
				),
				React.createElement('input', { type: 'text', name: 'last_submitted_id', id: 'last_submitted_id', value: this.state.last_submitted_id, onChange: this.handleChange }),
				React.createElement(
					'label',
					{ htmlFor: 'presentation' },
					'Presentation'
				),
				React.createElement('input', { type: 'text', name: 'presentation', id: 'presentation', value: this.state.presentation, onChange: this.handleChange }),
				React.createElement('input', { type: 'submit', onClick: this.handleAddToPres }),
				React.createElement(
					'button',
					{ className: 'reset-button', onClick: this.handleReset },
					'Reset'
				)
			)
		);
	}
});

ReactDOM.render(React.createElement(JobForm, null), document.getElementById('reveal'));