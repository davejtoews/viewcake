var JobForm = React.createClass({
	getInitialState: function() {
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
	generateContent: function() {
		var output = '';
		output += '<h3>' + this.state.opportunity_type + '</h3>';
		output += '<p>' + this.state.company_project + '</p>';
		output += '<p>' + this.state.contact_name + '</p>';
		output += '<p><a href="mailto:' + this.state.contact_email + '">' + this.state.contact_email + '</a></p>';
		output += '<p><a href="' + this.state.url + '">' + this.state.url + '</a></p>';
		return output;
	},
	handleChange: function(event) {
		var stateObj = {};
		stateObj[event.target.name] = event.target.value;
		this.setState(stateObj);
	},
	handleClick: function(event) {
		event.preventDefault();
		var content = this.generateContent();
		var thisForm = this;
		socket.emit('api/slides::create', {content: content}, function(error, data) {
			if(!error) {
				thisForm.setState({
					opportunity_type: '',
					company_project: '',
					contact_name: '',
					contact_email: '',
					url: '',
					last_submitted_id: ''
				});
				thisForm.setState({'last_submitted_id': data._id});
			}
		});
	},
	handleAddToPres: function(event) {
		event.preventDefault();
		last_submitted_id = this.state.last_submitted_id;
		socket.emit('api/presentations::find', {name: this.state.presentation}, function(error, data) {
			if(data.data.length == 1) {
				var slidesArray = data.data[0].slides;
				var presId = data.data[0]._id;
				slidesArray.push(last_submitted_id);
				socket.emit('api/presentations::patch', presId,  { slides: slidesArray }, function(error, data) {
					console.log(data);
					console.error(error);
				});
			} else {
				console.log("Too many results");
			}
		});
	},
	handleReset: function(){
		socket.emit("forceReloadPres");
	},
	render: function() {

		return (
			<div className="forms-wrapper">
				<form className='JobForm'>
					<label htmlFor='opportunity_type'>Opportunity Type: </label>
					<input type='text' name='opportunity_type' id='opportunity_type' value={this.state.opportunity_type} onChange={this.handleChange} /> <br />
					<label htmlFor='company_project'>Company/Project: </label>
					<input type='text' name='company_project' id='company_project' value={this.state.company_project} onChange={this.handleChange} /> <br />
					<label htmlFor='contact_name'>Contact Name: </label>
					<input type='text' name='contact_name' id='contact_name' value={this.state.contact_name} onChange={this.handleChange} /> <br />
					<label htmlFor='contact_email'>Contact Email: </label>
					<input type='text' name='contact_email' id='contact_email' value={this.state.contact_email} onChange={this.handleChange} /> <br />
					<label htmlFor='url'>Url: </label>
					<input type='text' name='url' id='url' value={this.state.url} onChange={this.handleChange} /> <br />
					<input type='submit' onClick={this.handleClick} />
				</form>
				<form className="JobForm">
					<label htmlFor="last_submitted_id">Last Submitted</label>
					<input type="text" name="last_submitted_id" id="last_submitted_id" value={this.state.last_submitted_id} onChange={this.handleChange}/>
					<label htmlFor="presentation">Presentation</label>
					<input type="text" name="presentation" id="presentation" value={this.state.presentation} onChange={this.handleChange}/>
					<input type='submit' onClick={this.handleAddToPres} />
					<button className="reset-button" onClick={this.handleReset} >
						Reset
					</button>

				</form>			
			</div>


		);
	}
});

ReactDOM.render(
	<JobForm />,
	document.getElementById('reveal')
);