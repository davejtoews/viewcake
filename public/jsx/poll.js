var Poll = React.createClass({
  getInitialState: function() {
    return {
      answered: false,
      previous: null
    };
  },
  handleChange: function(event) {
    var data = {
      'pollId': this.props._id,
      'answer': event.target.value,
      'previous': this.state.previous
    }

    socket.emit("pollAnswered", data);
    this.setState({answered: true, previous: event.target.value});
  },
  render: function() {
    var pollId = this.props._id;
    var thisPoll = this;
    return (
      <div className='poll' id={pollId}>
        <h4>{this.props.question}</h4>
        {
          this.props.answers.map(function(answer) {
            var answerId = "poll-input-" + pollId + answer.replace(/ /g,'');
            return ( 
              <div className='poll-answer' key={answer}>
                <input type='radio' name='poll' id={answerId} value={answer} onClick={thisPoll.handleChange} />
                <label htmlFor={answerId}>{answer}</label>
              </div>
            );
          })
        }
      </div>
    );
  }
});


function renderPollChart(element, slices) {
  ReactDOM.render(
    <PieChart slices={slices} />,
    element
  );  
}