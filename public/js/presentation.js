'use strict';

var SubSlideGroup = React.createClass({
  displayName: 'SubSlideGroup',

  render: function render() {
    var slideNodes = this.props.subSlides.map(function (slide) {
      return React.createElement(Slide, { content: slide.content, background: slide.background, transition: slide.transition, subSlides: slide.subSlides, key: slide._id, _id: slide._id });
    });
    return React.createElement(
      'section',
      null,
      slideNodes
    );
  }
});

var Slide = React.createClass({
  displayName: 'Slide',

  getInitialState: function getInitialState() {
    return { data: [] };
  },
  rawMarkup: function rawMarkup() {
    var rawMarkup = this.props.content;
    return { __html: rawMarkup };
  },
  render: function render() {
    if (this.props.poll) {
      return React.createElement(
        'section',
        { 'data-transition': this.props.transition, 'data-background': this.props.background },
        React.createElement(Poll, { question: this.props.poll.question, answers: this.props.poll.answers, key: this.props.poll._id, _id: this.props.poll._id })
      );
    } else if (!this.props.subSlides || !this.props.subSlides.length) {
      return React.createElement('section', { 'data-transition': this.props.transition, 'data-background': this.props.background, dangerouslySetInnerHTML: this.rawMarkup() });
    } else {
      return React.createElement(SubSlideGroup, { subSlides: this.props.subSlides });
    }
  }
});

var Presentation = React.createClass({
  displayName: 'Presentation',

  componentDidMount: function componentDidMount() {
    setTimeout(function () {
      initReveal();
    }, 500);
    initSocket();
  },
  render: function render() {
    var slideNodes = this.props.data.map(function (slide) {
      return React.createElement(Slide, { content: slide.content, background: slide.background, transition: slide.transition, subSlides: slide.subSlides, poll: slide.poll, key: slide._id, _id: slide._id });
    });
    return React.createElement(
      'div',
      { className: 'slides' },
      slideNodes
    );
  }
});

var presentationId;
var presentationElement = document.getElementById('reveal');

function loadPresentation() {

  presentationId = presentationElement.getAttribute('data-presentation-id');
  socket.emit('api/presentations::get', presentationId, {}, function (error, data) {
    var presentationSlides = data.slides;

    var populatedSlides = [];

    presentationSlides.forEach(function (presentationSlide) {
      socket.emit('api/slides::get', presentationSlide, { $populate: ['subSlides', 'poll'] }, function (error, data) {
        populatedSlides.push(data);
        if (presentationSlides.length == populatedSlides.length) {
          renderPresentation(populatedSlides);
        }
      });
    });
  });
}

function renderPresentation(data) {

  ReactDOM.render(React.createElement(Presentation, { data: data }), presentationElement);
}

loadPresentation();