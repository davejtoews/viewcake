var RecordButton = React.createClass({
  getInitialState: function() {
    return {
      startTime: 0,
      slideChanges: []
    };
  },
  handleClick: function(event) {
    if (!this.state.startTime) {
      this.setState({startTime: Date.now()});
    } else {
      this.setState({startTime: 0});
    }
  },
  addSlideChange: function(slideChange) {
    this.setState({slideChanges: this.state.slideChanges.concat([slideChange])});
    console.log(this.state);
  },
  render: function() {
    var text = this.state.startTime ? 'stop' : 'record';
    return (
      <button id="RecordButton" onClick={this.handleClick} data-start-time={this.state.startTime}>
        {text} 
      </button>
    );
  }
});

var RecordButtonRendered = ReactDOM.render(
  <RecordButton />,
  document.getElementById('react')
);

socket.on('slidechanged', function (data) {
  var slideChange = {
    'timestamp': Date.now() - RecordButtonRendered.state.startTime,
    'data': data
  }
  RecordButtonRendered.addSlideChange(slideChange);
});  