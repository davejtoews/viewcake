var LikeButton = React.createClass({
  getInitialState: function() {
    return {liked: false};
  },
  handleClick: function(event) {
    this.setState({liked: !this.state.liked});
  },
  render: function() {
    var svg = this.state.liked ? 'public/img/liked.svg' : 'public/img/not-liked.svg';
    return (
      <button className="LikeButton" onClick={this.handleClick}>
        <img src={svg} alt="like" /> 
      </button>
    );
  }
});

ReactDOM.render(
  <LikeButton />,
  document.getElementById('react')
);