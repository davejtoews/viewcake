'use strict';

var Poll = React.createClass({
  displayName: 'Poll',

  getInitialState: function getInitialState() {
    return {
      answered: false,
      previous: null
    };
  },
  handleChange: function handleChange(event) {
    var data = {
      'pollId': this.props._id,
      'answer': event.target.value,
      'previous': this.state.previous
    };

    socket.emit("pollAnswered", data);
    this.setState({ answered: true, previous: event.target.value });
  },
  render: function render() {
    var pollId = this.props._id;
    var thisPoll = this;
    return React.createElement(
      'div',
      { className: 'poll', id: pollId },
      React.createElement(
        'h4',
        null,
        this.props.question
      ),
      this.props.answers.map(function (answer) {
        var answerId = "poll-input-" + pollId + answer.replace(/ /g, '');
        return React.createElement(
          'div',
          { className: 'poll-answer', key: answer },
          React.createElement('input', { type: 'radio', name: 'poll', id: answerId, value: answer, onClick: thisPoll.handleChange }),
          React.createElement(
            'label',
            { htmlFor: answerId },
            answer
          )
        );
      })
    );
  }
});

var PollKey = React.createClass({
  displayName: 'PollKey',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'poll-key' },
      this.props.slices.map(function (slice) {
        return React.createElement(
          'div',
          { className: 'poll-key-entry', key: slice.key },
          React.createElement(
            'h4',
            null,
            slice.key
          ),
          React.createElement(
            'svg',
            { width: '200', height: '100' },
            React.createElement('rect', { width: '300', height: '100', style: { fill: slice.color } })
          )
        );
      })
    );
  }
});

function renderPollChart(element, slices) {
  ReactDOM.render(React.createElement(
    'div',
    { className: 'chart-wrapper' },
    React.createElement(PieChart, { slices: slices }),
    React.createElement(PollKey, { slices: slices })
  ), element);
}