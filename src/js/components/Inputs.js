import React from 'react';

export default class Inputs extends React.Component {

  constructor() {
    super();
    this.state = { };
  }

  handleKeyPress = event => {
    if (event.key == 'Enter') {
      this.submitMessage();
    }
  }

  componentDidMount() {
    const input = document.querySelector('#email');
    input.focus();
    input.select();
  }

  submitMessage = _ => {
      const _message =  document.querySelector('#message');
      const _email = document.querySelector('#email').value;
      const _msg = _message.value;
      let data = {
        message: _msg,
        email: _email != "" ? _email : "Newbi",
        createdAt: new Date()
      }
      this.props.submitMessage(data);
      _message.value = "";
 }

  render() {

    return (

      <div class="row">
        <div class="col-xs-3 col-md-2">
          <div class="form-group">
            <input type="email" class="form-control" placeholder="me@example.com" id="email" />
          </div>
        </div>
        <div class="col-xs-9 col-md-8">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Your Message!" id="message" onKeyPress={this.handleKeyPress}/>
          </div>
        </div>
        <div class="col-md-2 hidden-sm hidden-xs">
          <button class="btn btn-primary " onClick={this.submitMessage}> Envoyer! </button>
        </div>
      </div>

    )
  }
}
