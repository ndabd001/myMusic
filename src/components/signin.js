import React, {Component} from 'react'
import {Auth} from 'aws-amplify'
import { Form, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';

//below we take advantage of the neumorphism technique to create a soothing/welcoming front page/sign in page
//the colors can be changed but it is reccomended to keep form and background closely colored and neutral tones

export class CustomSignIn extends Component {
  constructor(props) {
    super(props)
    this._validAuthStates = ['signIn', 'signedOut', 'signedUp']
    this.signIn = this.signIn.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleFormSubmission = this.handleFormSubmission.bind(this)
    this.state = {}
  }

  handleFormSubmission(evt) {
    evt.preventDefault()
    this.signIn()
  }

  async signIn() {
    const username = this.inputs.username
    const password = this.inputs.password
    try {
      await Auth.signIn(username, password)
      this.props.onStateChange('signedIn', {})
    } catch (err) {
      if (err.code === 'UserNotConfirmedException') {
        this.props.updateUsername(username)
        await Auth.resendSignUp(username)
        this.props.onStateChange('confirmSignUp', {})
      } else if (err.code === 'NotAuthorizedException') {
        // The error happens when the incorrect password is provided
        this.setState({error: 'Login failed.'})
      } else if (err.code === 'UserNotFoundException') {
        // The error happens when the supplied username/email does not exist in the Cognito user pool
        this.setState({error: 'Login failed.'})
      } else {
        this.setState({error: 'An error has occurred.'})
        console.error(err)
      }
    }
  }

  handleInputChange(evt) {
    this.inputs = this.inputs || {}
    const {name, value, type, checked} = evt.target
    const check_type = ['radio', 'checkbox'].includes(type)
    this.inputs[name] = check_type ? checked : value
    this.inputs['checkedValue'] = check_type ? value : null
    this.setState({error: ''})
  }

  render() {
    return (
        <div >
          {this._validAuthStates.includes(this.props.authState) && (
            <Form className="signin" onSubmit={this.handleFormSubmission}>

                <Form.Group >
                    <Form.Label htmlFor="username">
                    Username
                    </Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter username"
                        onChange={this.handleInputChange} 
                        id="username"
                        key="username"
                        name="username"
                    />
                </Form.Group>

                <Form.Group >
                    <Form.Label>
                    Password
                    </Form.Label>
                    <Form.Control
                    id="password"
                    key="password"
                    name="password"
                    onChange={this.handleInputChange}
                    type="password"
                    placeholder="********"
                    />
                </Form.Group>
                
                <Button
                    variant="primary"
                    type="submit"
                    onClick={this.handleFormSubmission}
                >
                    Login
                </Button>
        </Form>
          )}
        </div>
    )
  }
}