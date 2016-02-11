"use strict";

var ApplauseButton = React.createClass({
  displayName: "ApplauseButton",

  handleClick: function handleClick(event) {
    socket.emit("applause");
  },
  render: function render() {
    return React.createElement(
      "button",
      { className: "applause", onClick: this.handleClick },
      React.createElement("img", { src: "/public/img/applause.svg", alt: "Applause" })
    );
  }
});

var BooButton = React.createClass({
  displayName: "BooButton",

  handleClick: function handleClick(event) {
    socket.emit("boo");
  },
  render: function render() {
    return React.createElement(
      "button",
      { className: "boo", onClick: this.handleClick },
      React.createElement("img", { src: "/public/img/boo.svg", alt: "Boo" })
    );
  }
});

ReactDOM.render(React.createElement(
  "div",
  null,
  React.createElement(ApplauseButton, null),
  React.createElement(BooButton, null)
), document.getElementById('react'));