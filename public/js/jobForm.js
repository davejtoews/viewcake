'use strict';

var JobForm = React.createClass({
	displayName: 'JobForm',

	getInitialState: function getInitialState() {
		return {
			opportunity_type: '',
			company_project: '',
			contact_name: '',
			contact_email: '',
			url: ''
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
				thisForm.setState(thisForm.getInitialState());
			}
		});
	},
	render: function render() {
		return React.createElement(
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
		);
	}
});

ReactDOM.render(React.createElement(JobForm, null), document.getElementById('reveal'));