"use strict";

var SubSlideGroup = React.createClass({
  displayName: "SubSlideGroup",

  render: function render() {
    console.log("sub");
    var slideNodes = this.props.subSlides.map(function (slide) {
      return React.createElement(Slide, { key: slide, subSlideId: slide });
    });
    return React.createElement(
      "section",
      null,
      slideNodes
    );
  }
});

var Slide = React.createClass({
  displayName: "Slide",

  getInitialState: function getInitialState() {
    return { data: [] };
  },
  componentDidMount: function componentDidMount() {
    if (this.props.subSlideId) {
      console.log(this.props.subSlideId);
      socket.emit('api/subSlides::get', this.props.subSlideId, {}, {}, function (error, data) {
        console.error(error);
        console.log(data);
      });
    }
  },
  rawMarkup: function rawMarkup() {
    var rawMarkup = this.props.content;
    return { __html: rawMarkup };
  },
  render: function render() {
    if (!this.props.subSlides || !this.props.subSlides.length) {
      return React.createElement("section", { "data-transition": this.props.transition, "data-background": this.props.background, "data-subslideid": this.props.subSlideId, dangerouslySetInnerHTML: this.rawMarkup() });
    } else {
      return React.createElement(SubSlideGroup, { subSlides: this.props.subSlides });
    }
  }
});

var Presentation = React.createClass({
  displayName: "Presentation",

  componentDidMount: function componentDidMount() {
    initReveal();
    initSocket();
  },
  render: function render() {
    var slideNodes = this.props.slides.map(function (slide) {
      console.log(slide);
      return React.createElement(Slide, { content: slide.content, background: slide.background, transition: slide.transition, subSlides: slide.subSlides, key: slide._id, _id: slide._id });
    });
    return React.createElement(
      "div",
      { className: "slides" },
      slideNodes
    );
  }
});

var presentationId;

function loadPresentation() {
  var presentationElement = document.getElementById('reveal');
  presentationId = presentationElement.getAttribute('data-presentation-id');
  fetch('http://localhost:3030/api/presentations/' + presentationId + '?&$populate=slides', {
    method: 'get'
  }).then(function (response) {
    return response.json().then(function (json) {
      ReactDOM.render(React.createElement(Presentation, { slides: json.slides }), presentationElement);
    });
  }).catch(function (err) {
    console.log(err);
  });
}
loadPresentation();