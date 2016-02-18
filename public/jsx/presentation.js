var Slide = React.createClass({
  componentDidMount: function() {
    initReveal();
    initSocket();
  },
  rawMarkup: function() {
    var rawMarkup = this.props.content;
    return { __html: rawMarkup };
  },
  render: function() {
    return (
      <section dangerouslySetInnerHTML={this.rawMarkup()} />

    );
  }
});

var Presentation = React.createClass({
  render: function() {
    var slideNodes = this.props.data.map(function(slide) {
      console.log(slide);
      return (
        <Slide content={slide.content} key={slide._id}/>
      );
    });
    return (
      <div className="slides">
        {slideNodes}
      </div>
    );
  }
});

function loadPresentation() {
  fetch('http://localhost:3030/slides', {
    method: 'get'
  }).then(function(response) {
    return response.json().then(function(json){
      ReactDOM.render(
        <Presentation data={json.data}/>,
        document.getElementById('reveal')
      );
    });
  }).catch(function(err) {
    console.log(err);
  });
}
loadPresentation();