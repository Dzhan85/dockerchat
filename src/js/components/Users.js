import React from 'react';
//import io from 'socket.io-client';


export default class Users extends React.Component {
  constructor() {
    super();
    this.state = {};
  }


  render() {

    //console.log(this.props.clients);
    let images = this.props.clients.map((data, index) => {
      //console.log(data);
      return (
        <li key={index}>
          <img src={data.gravatar} className="avatar"  />
        </li>
      )
    })

    return (
      <div>

      <h2>Active Users:</h2>
      <ul className="active-user-list">
        {images}
      </ul>

      </div>
    )
  }
}
