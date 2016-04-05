var Poll = React.createClass({
  getInitialState: function() {
    return {
      answered: false,
      previous: null,
      chart: false,
      slices: {}
    };
  },
  componentDidMount: function() {
    if(this.props.showChart) {
      socket.on("pollAnswered", handlePollAnswer.bind(null, socket, this));      
    }
  },
  setChart: function(slices) {
    this.setState({
      chart: true,
      slices: slices
    });
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
    if(!this.state.chart) {
      return (
        <div className='Poll' id={pollId} key={pollId}>
          <h3>{this.props.question}</h3>
          <div className="poll-answers">
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
        </div>
      );
    } else {
      return (
        <div className='Poll' id={pollId} key={pollId}>
          <h4>{this.props.question}</h4>
          <div className="chart-wrapper">
            <PieChart slices={this.state.slices} />
            <PollKey slices={this.state.slices} />
          </div>          
        </div>        
      );
    }
  }
});

var chartData = {};

function handlePollAnswer(socket, poll, data) {

  var pollId = poll.props._id;
  if(data.pollId == pollId) {
    var answer = data.answer;
    var previous = data.previous;

    if(!chartData[pollId]) {
        chartData[pollId] = {};
    } 
    if(!chartData[pollId][answer]) {
        chartData[pollId][answer] = 0;
    }
    chartData[pollId][answer]++;

    if(previous) {
        if(!chartData[pollId][previous]) {
            chartData[pollId][previous] = 0;
        }
        chartData[pollId][previous]--;
    }

    var chartPalette = palette('tol', Object.keys(chartData[pollId]).length);
    var slices = Object.keys(chartData[pollId]).map(function(sliceName, i){
        return { key: sliceName, value: chartData[pollId][sliceName], color: "#" + chartPalette[i] }
    });

    poll.setChart(slices);

    var revealData = getRevealPosition();
    Reveal.slide(revealData.indexh, revealData.indexv, revealData.indexf);
    
  }
}

var PollKey = React.createClass({
  render: function() {
    return (
      <div className="poll-key">
        {
          this.props.slices.map(function(slice){
            return (
              <div className="poll-key-entry" key={slice.key} >
                <h4>{slice.key}: {slice.value} </h4>
                <svg width="2em" height="1em">
                  <rect width="2em" height="1em" style={{fill:slice.color}} />
                </svg>
              </div>
            );
          })
        }
      </div>
    );
  }
});
