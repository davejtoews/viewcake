var DonateButton = React.createClass({

  handleClick: function(event) {
    ga('send', 'event', 'Interaction', 'Donate');
    window.open("https://donate.redcross.ca/ea-action/action?ea.client.id=1951&ea.campaign.id=39240");
  },
  render: function() {
    return (
      <button className="DonateButton" onClick={this.handleClick}>
        Donate for Fort MacMurray
      </button>
    );
  }
});

ReactDOM.render(
  <DonateButton />,
  document.getElementById('donate')
);