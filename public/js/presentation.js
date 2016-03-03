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
    initReveal();
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
  fetch('/api/presentations/' + presentationId + '?&$populate=slides', {
    method: 'get'
  }).then(function (response) {
    return response.json().then(function (json) {
      ReactDOM.render(React.createElement(Presentation, { data: json.slides }), presentationElement);
    });
  }).catch(function (err) {
    console.log(err);
  });
}
loadPresentation();