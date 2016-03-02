'use strict';

var RecordButton = React.createClass({
  displayName: 'RecordButton',

  getInitialState: function getInitialState() {
    return {
      startTime: 0,
      slideChanges: []
    };
  },
  handleClick: function handleClick(event) {
    if (!this.state.startTime) {
      this.setState({ startTime: Date.now() });
    } else {
      this.setState({ startTime: 0 });
    }
  },
  addSlideChange: function addSlideChange(slideChange) {
    this.setState({ slideChanges: this.state.slideChanges.concat([slideChange]) });
    console.log(this.state);
  },
  render: function render() {
    var text = this.state.startTime ? 'stop' : 'record';
    return React.createElement(
      'button',
      { id: 'RecordButton', onClick: this.handleClick, 'data-start-time': this.state.startTime },
      text
    );
  }
});

var RecordButtonRendered = ReactDOM.render(React.createElement(RecordButton, null), document.getElementById('react'));

socket.on('slidechanged', function (data) {
  var slideChange = {
    'timestamp': Date.now() - RecordButtonRendered.state.startTime,
    'data': data
  };
  RecordButtonRendered.addSlideChange(slideChange);
});