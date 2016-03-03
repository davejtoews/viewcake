var RecordButton = React.createClass({
  getInitialState: function() {
    return {
      startTime: 0,
      slidechangeTimes: [],
      timedPresentationId: 0
    };
  },
  addSlidechangeTime: function(data) {
    if(this.state.slidechangeTimes){
      this.setState({ slidechangeTimes: RecordButtonRendered.state.slidechangeTimes.concat([data]) });
    } else {
      this.setState({slidechangeTimes: [data]});
    }
  },
  handleClick: function(event) {
    if (!this.state.startTime) {
      this.setState({startTime: Date.now()});
      socket.emit('api/timedPresentations::create', {
        'presentation': presentationId
      }, {}, function(error, data) {
        if(error) {console.error(error);}
        RecordButtonRendered.setState({timedPresentationId: data._id});
      });

    } else {
      this.setState({startTime: 0});
    }
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
  if (RecordButtonRendered.state.startTime) {
    socket.emit('api/slidechangeTimes::create', {
      'timestamp': Date.now() - RecordButtonRendered.state.startTime,
      'indexv': data.indexv,
      'indexh': data.indexh,
      'indexf': data.indexf
    }, {}, function(error, data) {
      if(error) {console.error(error);}
      RecordButtonRendered.addSlidechangeTime(data._id);
      socket.emit('api/timedPresentations::update', RecordButtonRendered.state.timedPresentationId, {
        'slidechangeTimes': RecordButtonRendered.state.slidechangeTimes
      
      }, {}, function(error, data) {
        if(error) {console.error(error);}
        console.log(data);
      });
    });
  }

});  