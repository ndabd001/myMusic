import React from 'react';
import './App.css';
import awsconfig from './aws-exports'
import AuthWrapper from './AuthWrapper/authwrapper'
import { Authenticator } from 'aws-amplify-react'


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