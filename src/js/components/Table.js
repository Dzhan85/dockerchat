import React from 'react';

export default class Table extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  componentDidUpdate(prevProps, prevState) {
    let elem = document.querySelector('.outerTable')
    elem.scrollTop = elem.scrollHeight; 
  }


  render() {

    let messages = this.props.messages.map((data, index) => {
      
      //date format
      function addZero(i) {
          if (i < 10) {
              i = "0" + i;
          }
          return i;
      }
      let _time = data.createdAt;
      let timeObject = new Date(_time);
      let effectiveTime = addZero(timeObject.getHours()) + ":" + addZero(timeObject.getMinutes())

      return (
      <tr key={index}>
        <td class="col-md-2">{effectiveTime}</td>
        <td class="col-md-4">{data.email}</td>
        <td class="col-md-6">{data.message}</td>
      </tr>
      )
    })

    return (
      <table class="table">
        <thead>
          <tr>
            <th class="col-md-2">Time </th>
            <th class="col-md-4">Name </th>
            <th class="col-md-6">Message </th>
          </tr>
        </thead>
        <tbody>
          {messages}
        </tbody>
      </table>
    )
  }
}
