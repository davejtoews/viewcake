var SubSlideGroup = React.createClass({
  render: function() {
    var slideNodes = this.props.subSlides.map(function(slide) {
      return (
        <Slide content={slide.content} background={slide.background} transition={slide.transition} subSlides={slide.subSlides} key={slide._id} _id={slide._id}/>
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
  rawMarkup: function() {
    var rawMarkup = this.props.content;
    return { __html: rawMarkup };
  },
  render: function() {
    if (this.props.poll) {
      var showChart = false;
      if (viewCakeView == "presenter") {
        showChart = true;
      }
      return (
        <section data-transition={this.props.transition} data-background={this.props.background}>
          <Poll question={this.props.poll.question} answers={this.props.poll.answers} showChart={showChart} key={this.props.poll._id} _id={this.props.poll._id} />
        </section>
      );
    } else if(!this.props.subSlides || !this.props.subSlides.length) {
       return (
        <section data-transition={this.props.transition} data-background={this.props.background} dangerouslySetInnerHTML={this.rawMarkup()} />
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
    setTimeout(function(){
      initReveal();
    }, 500);
    initSocket();
  },
  render: function() {
    var slideNodes = this.props.data.map(function(slide) {
      return (
        <Slide content={slide.content} background={slide.background} transition={slide.transition} subSlides={slide.subSlides} poll={slide.poll} key={slide._id} _id={slide._id}/>
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
var presentationElement = document.getElementById('reveal');

function loadPresentation() {
  
  presentationId = presentationElement.getAttribute('data-presentation-id');
  socket.emit('api/presentations::get', presentationId, {}, function(error, data) {
    var presentationSlides = data.slides;

    var populatedSlides = []

    presentationSlides.forEach(function(presentationSlide){
      socket.emit('api/slides::get', presentationSlide, { $populate: ['subSlides', 'poll'] }, function(error, data) {
        populatedSlides.push(data);
        if (presentationSlides.length == populatedSlides.length) {
          var sortedSlides = presentationSlides.map(function(slideId) {
            var sortedSlide = {};
            populatedSlides.forEach(function (slide) {
              if(slide._id == slideId) {
                sortedSlide = slide;
              }
            });
            return sortedSlide;
          });
          renderPresentation(sortedSlides);
        }
      });
    });

  });
}

function renderPresentation(data) {

  ReactDOM.render(
    <Presentation data={data}/>,
    presentationElement
  );  
}

loadPresentation();









