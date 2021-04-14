import React, { Component } from 'react'
import Home from '../components/home'
import {CustomSignIn} from '../components/signin'

//this authwrapper serves as a routing component to direct client view depending on authentication status
//if signed in direct the client to the home page, if not direct the user to a custom built sign in page

class AuthWrapper extends Component {
    constructor(props) {
      super(props)
      this.state = {
        username: '',
      }
      this.updateUsername = this.updateUsername.bind(this)
    }
  
    updateUsername(newUsername) {
      this.setState({username: newUsername})
    }
  
    render() {
      return (
        <div className="flex-1">
          <CustomSignIn
            authState={this.props.authState}
            updateUsername={this.updateUsername}
            onStateChange={this.props.onStateChange}
          />
          <Home authState={this.props.authState} onStateChange={this.props.onStateChange} />
        </div>
      );
    };
  }
  
  export default AuthWrapper;