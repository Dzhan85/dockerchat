import React from "react";
import io from "socket.io-client";
import Inputs from './Inputs';
import Table from './Table';
import Users from './Users';


export default class App extends React.Component {
  //constructor

  constructor() {
    super();
    this.state = {
      socket: io.connect(),
      messages: [],
      connectedClients: [],
      firstMessage: false
    };

    this.state.socket.on('receive-message', (data) => {
      this.addMessage(data)
    })

    this.state.socket.on('update-clients', (data) => {
      //console.log(data);
      this.setState({connectedClients: data})
    })
  }

  //function
  addMessage(data) {
    let newMessages = this.state.messages;
    newMessages.push(data)
    this.setState({messages: newMessages})
  }

  componentDidMount() {
    this.state.socket.on('request-history', data => {
      this.setState({messages: data})
    })
  }

  submitMessage(data) {
      //console.log(data);
      if (this.state.firstMessage == false) {
        this.setState({firstMessage: true})
        this.state.socket.emit('first-message', data.email)
      }
      this.addMessage(data)
      this.state.socket.emit('send-message', data)
  }

  //render
  render() {
    return (
      <div class="container">
        <h1> Local Web chat! </h1>
        <div class="outerTable">
          <Table messages={this.state.messages} />
        </div>
        <Inputs submitMessage={this.submitMessage.bind(this)}/>
        <Users clients={this.state.connectedClients} />
      </div>
    );
  }
}
