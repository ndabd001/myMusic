import React from 'react';
import './App.css';
import awsconfig from './aws-exports'
import AuthWrapper from './AuthWrapper/authwrapper'
import { Authenticator } from 'aws-amplify-react'

//the authenticator component is much more maleable styling wise and was decided as the better choice when compared with withAuthentication (too much out of the box non-changeable styles)

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Authenticator hideDefault={true} amplifyConfig={awsconfig}>
          <AuthWrapper />
        </Authenticator>
      </header>
    </div>
  );
}

export default App;