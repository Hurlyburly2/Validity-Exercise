import React, { Component } from 'react'

import Record from '../components/Record.js'

class ResultContainer extends Component {
  render() {
    let recordComponents;
    let header
    let oddOrEven = "record odd"
    if (this.props.data) {
      let key = 0;
      header = this.props.name
      recordComponents = this.props.data.map((record) => {
        key++;
        if (oddOrEven === "record odd") {
          oddOrEven = "record even"
        } else {
          oddOrEven = "record odd"
        }
        return (
          <Record
            key={key}
            oddOrEven={oddOrEven}
            record={record}
          />
        )
      })
    }

    return (
      <div className = "recordContainer">
        <h2>{header}</h2>
       { recordComponents }
      </div>
    )
  }
}

export default ResultContainer;