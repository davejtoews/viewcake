var Slide = React.createClass({
  rawMarkup: function() {
    var rawMarkup = this.props.content;
    return { __html: rawMarkup };
  },
  render: function() {
    return (
      <section data-transition={this.props.transition} data-background={this.props.background} dangerouslySetInnerHTML={this.rawMarkup()} />

    );
  }
});

var Presentation = React.createClass({
  componentDidMount: function() {
    initReveal();
    initSocket();
  },
  render: function() {
    var slideNodes = this.props.data.map(function(slide) {
      console.log(slide);
      return (
        <Slide content={slide.content} background={slide.background} transition={slide.transition} key={slide._id}/>
      );
    });
    return (
      <div className="slides">
        {slideNodes}
      </div>
    );
  }
});

var presentationId;

function loadPresentation() {
  var presentationElement = document.getElementById('reveal');
  presentationId = presentationElement.getAttribute('data-presentation-id');
  fetch('http://localhost:3030/api/presentations/'+presentationId+'?&$populate=slides', {
    method: 'get'
  }).then(function(response) {
    return response.json().then(function(json){
      ReactDOM.render(
        <Presentation data={json.slides}/>,
        presentationElement
      );
    });
  }).catch(function(err) {
    console.log(err);
  });
}
loadPresentation();