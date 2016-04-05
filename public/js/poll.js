'use strict';

var Poll = React.createClass({
  displayName: 'Poll',

  getInitialState: function getInitialState() {
    return {
      answered: false,
      previous: null,
      chart: false,
      slices: {}
    };
  },
  componentDidMount: function componentDidMount() {
    if (this.props.showChart) {
      socket.on("pollAnswered", handlePollAnswer.bind(null, socket, this));
    }
  },
  setChart: function setChart(slices) {
    this.setState({
      chart: true,
      slices: slices
    });
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
    if (!this.state.chart) {
      return React.createElement(
        'div',
        { className: 'Poll', id: pollId, key: pollId },
        React.createElement(
          'h3',
          null,
          this.props.question
        ),
        React.createElement(
          'div',
          { className: 'poll-answers' },
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
        )
      );
    } else {
      return React.createElement(
        'div',
        { className: 'Poll', id: pollId, key: pollId },
        React.createElement(
          'h4',
          null,
          this.props.question
        ),
        React.createElement(
          'div',
          { className: 'chart-wrapper' },
          React.createElement(PieChart, { slices: this.state.slices }),
          React.createElement(PollKey, { slices: this.state.slices })
        )
      );
    }
  }
});

var chartData = {};

function handlePollAnswer(socket, poll, data) {

  var pollId = poll.props._id;
  if (data.pollId == pollId) {
    var answer = data.answer;
    var previous = data.previous;

    if (!chartData[pollId]) {
      chartData[pollId] = {};
    }
    if (!chartData[pollId][answer]) {
      chartData[pollId][answer] = 0;
    }
    chartData[pollId][answer]++;

    if (previous) {
      if (!chartData[pollId][previous]) {
        chartData[pollId][previous] = 0;
      }
      chartData[pollId][previous]--;
    }

    var chartPalette = palette('tol', Object.keys(chartData[pollId]).length);
    var slices = Object.keys(chartData[pollId]).map(function (sliceName, i) {
      return { key: sliceName, value: chartData[pollId][sliceName], color: "#" + chartPalette[i] };
    });

    poll.setChart(slices);

    var revealData = getRevealPosition();
    Reveal.slide(revealData.indexh, revealData.indexv, revealData.indexf);
  }
}

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
            slice.key,
            ': ',
            slice.value,
            ' '
          ),
          React.createElement(
            'svg',
            { width: '2em', height: '1em' },
            React.createElement('rect', { width: '2em', height: '1em', style: { fill: slice.color } })
          )
        );
      })
    );
  }
});