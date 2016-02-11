'use strict';

var LikeButton = React.createClass({
  displayName: 'LikeButton',

  getInitialState: function getInitialState() {
    return { liked: false };
  },
  handleClick: function handleClick(event) {
    this.setState({ liked: !this.state.liked });
  },
  render: function render() {
    var svg = this.state.liked ? 'public/img/liked.svg' : 'public/img/not-liked.svg';
    return React.createElement(
      'button',
      { className: 'LikeButton', onClick: this.handleClick },
      React.createElement('img', { src: svg, alt: 'like' })
    );
  }
});

ReactDOM.render(React.createElement(LikeButton, null), document.getElementById('react'));