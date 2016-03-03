var SubSlideGroup = React.createClass({
  render: function() {
    console.log("sub");
    var slideNodes = this.props.subSlides.map(function(slide) {
      return (
        <Slide key={slide} subSlideId={slide}/>
      );
    });
    return (
      <section>
        {slideNodes}
      </section>
    );
  }
});

var Slide = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    if(this.props.subSlideId) {
      console.log(this.props.subSlideId);
      socket.emit('api/subSlides::get', this.props.subSlideId, {}, {}, function(error, data) {
        console.error(error);
        console.log(data);
      });
    }
  },
  rawMarkup: function() {
    var rawMarkup = this.props.content;
    return { __html: rawMarkup };
  },
  render: function() {
    if(!this.props.subSlides || !this.props.subSlides.length) {
       return (
        <section data-transition={this.props.transition} data-background={this.props.background} data-subslideid={this.props.subSlideId} dangerouslySetInnerHTML={this.rawMarkup()} />
      );     
    } else {
      return (
        <SubSlideGroup subSlides={this.props.subSlides} />
      );
    }
  }
});

var Presentation = React.createClass({
  componentDidMount: function() {
    initReveal();
    initSocket();
  },
  render: function() {
    var slideNodes = this.props.slides.map(function(slide) {
      console.log(slide);
      return (
        <Slide content={slide.content} background={slide.background} transition={slide.transition} subSlides={slide.subSlides} key={slide._id} _id={slide._id}/>
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
        <Presentation slides={json.slides}/>,
        presentationElement
      );
    });
  }).catch(function(err) {
    console.log(err);
  });
}
loadPresentation();