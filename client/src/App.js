import React, { Component } from 'react';
import './App.css';

import FormContainer from './containers/FormContainer'
import ResultContainer from './containers/ResultContainer'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      duplicates: null,
      notDuplicates: null,
      error: null
    };
    this.submitForm = this.submitForm.bind(this)
  }

  submitForm(event) {
    // Here we get the CSV from the form and post it to the back end
    event.preventDefault()
    const userFile = document.getElementById("csv_upload").files[0]
    const formData = new FormData();
    formData.append("uploadCsv", userFile)

    fetch('/upload', {
        method: "POST",
        body: formData
      })
      .then(response => {
        if (response.ok) {
          return response
        } else {
          const error = 'Something went wrong'
          throw error;
        }
      })
      .then(response => response.json())
      .then(response => {
        if (response.duplicates) {
          console.log(response)
          this.setState({
            duplicates: response.duplicates,
            notDuplicates: response.notDuplicates,
            error: null
          })
        } else {
          this.setState({
            duplicates: null,
            notDuplicates: null,
            error: response
          })
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({
          duplicates: null,
          notDuplicates: null,
          error: error
        })
      })
  }

  render() {
    let error = ""
    if (this.state.error) { error = this.state.error }
    // We display an error if something went wrong, or the results in two separate containers if it worked rightgit

    return (
      <div className="mainDiv">
        <FormContainer
          formsubmit={this.submitForm}
        />
        <h2>{error}</h2>
        <ResultContainer 
          key="1"
          name="Duplicate Records"
          data={this.state.duplicates}
        />
        <ResultContainer
          key="2"
          name="Non-Duplicate Records"
          data={this.state.notDuplicates}
        />
      </div>
    )
  }
}

export default App;
