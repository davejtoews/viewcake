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

function renderPollChart(element, slices) {
  ReactDOM.render(React.createElement(PieChart, { slices: slices }), element);
}