'use strict';

var Slide = React.createClass({
  displayName: 'Slide',

  componentDidMount: function componentDidMount() {
    initReveal();
    initSocket();
  },
  rawMarkup: function rawMarkup() {
    var rawMarkup = this.props.content;
    return { __html: rawMarkup };
  },
  render: function render() {
    return React.createElement('section', { dangerouslySetInnerHTML: this.rawMarkup() });
  }
});

var Presentation = React.createClass({
  displayName: 'Presentation',

  render: function render() {
    var slideNodes = this.props.data.map(function (slide) {
      console.log(slide);
      return React.createElement(Slide, { content: slide.content, key: slide._id });
    });
    return React.createElement(
      'div',
      { className: 'slides' },
      slideNodes
    );
  }
});

function loadPresentation() {
  fetch('http://localhost:3030/slides', {
    method: 'get'
  }).then(function (response) {
    return response.json().then(function (json) {
      ReactDOM.render(React.createElement(Presentation, { data: json.data }), document.getElementById('reveal'));
    });
  }).catch(function (err) {
    console.log(err);
  });
}
loadPresentation();