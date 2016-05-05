'use strict';

var DonateButton = React.createClass({
  displayName: 'DonateButton',

  handleClick: function handleClick(event) {
    ga('send', 'event', 'Interaction', 'Donate');
    window.open("https://donate.redcross.ca/ea-action/action?ea.client.id=1951&ea.campaign.id=39240");
  },
  render: function render() {
    return React.createElement(
      'button',
      { className: 'DonateButton', onClick: this.handleClick },
      'Donate for Fort MacMurray'
    );
  }
});

ReactDOM.render(React.createElement(DonateButton, null), document.getElementById('donate'));