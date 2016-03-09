'use strict';

var Slide = React.createClass({
  displayName: 'Slide',

  rawMarkup: function rawMarkup() {
    var rawMarkup = this.props.content;
    return { __html: rawMarkup };
  },
  render: function render() {
    return React.createElement('section', { 'data-transition': this.props.transition, 'data-background': this.props.background, dangerouslySetInnerHTML: this.rawMarkup() });
  }
});

var Presentation = React.createClass({
  displayName: 'Presentation',

  componentDidMount: function componentDidMount() {
    setTimeout(function () {
      initReveal();
    }, 200);
    initSocket();
  },
  render: function render() {
    var slideNodes = this.props.data.map(function (slide) {
      console.log(slide);
      return React.createElement(Slide, { content: slide.content, background: slide.background, transition: slide.transition, key: slide._id });
    });
    return React.createElement(
      'div',
      { className: 'slides' },
      slideNodes
    );
  }
});

var presentationId;

function loadPresentation() {
  var presentationElement = document.getElementById('reveal');
  presentationId = presentationElement.getAttribute('data-presentation-id');
  socket.emit('api/presentations::get', presentationId, { $populate: ['slides'] }, function (error, data) {
    ReactDOM.render(React.createElement(Presentation, { data: data.slides }), presentationElement);
  });
}
loadPresentation();