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

var PollKey = React.createClass({
  render: function() {
    return (
      <div className="poll-key">
        {
          this.props.slices.map(function(slice){
            return (
              <div className="poll-key-entry" key={slice.key} >
                <h4>{slice.key}</h4>
                <svg width="200" height="100">
                  <rect width="300" height="100" style={{fill:slice.color}} />
                </svg>
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
    <div className="chart-wrapper">
      <PieChart slices={slices} />
      <PollKey slices={slices} />
    </div>,
    element
  );  
}