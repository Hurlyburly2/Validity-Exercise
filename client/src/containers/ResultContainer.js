import React, { Component } from 'react'

class ResultContainer extends Component {
  render() {
    return (
      <div>
       { this.props.data }
      </div>
    )
  }
}

export default ResultContainer;