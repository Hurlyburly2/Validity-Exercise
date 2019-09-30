import React, { Component } from 'react'

class FormContainer extends Component {
  render() {
    return (
      <div>
        <p>Upload your CSV file:</p>
        <form id="upload_form" onSubmit={this.props.formsubmit}>
          <input
            type="file"
            name="csv"
            id="csv_upload"
            accept="TEXT/csv"
            className="uploadCSV"
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default FormContainer;