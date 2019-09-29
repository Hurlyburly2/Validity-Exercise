import React, { Component } from 'react';
import './App.css';

import FormContainer from './containers/FormContainer'
import ResultContainer from './containers/ResultContainer'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null
    };
    this.submitForm = this.submitForm.bind(this)
  }

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err))
  }

  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  }

  submitForm(event) {
    event.preventDefault()
    const userFile = document.getElementById("csv_upload").files[0]
    const formData = new FormData();
    formData.append("uploadCsv", userFile)

    console.log(userFile);
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
        this.setState({
          data: response
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    return (
      <div className="Upload">
        <FormContainer
          formsubmit={this.submitForm}
        />
        <ResultContainer 
          data={this.state.data}
        />
      </div>
    )
  }
}

export default App;
