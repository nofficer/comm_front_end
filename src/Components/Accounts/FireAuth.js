import React from 'react'
import { connect } from 'react-redux'


import firebase from 'firebase';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';


var config = {
  apiKey: "AIzaSyDRnUkMDz97EyIo02NWne-9Pm6YrjK0ALk",
  authDomain: "easycomp-305815.firebaseapp.com",
  projectId: "easycomp-305815",
  storageBucket: "easycomp-305815.appspot.com",
  messagingSenderId: "948165952668",
  appId: "1:948165952668:web:ad37654be3491b07045959",
  measurementId: "G-EGBYJ9MG95"
};


if(!firebase.apps.length){
  firebase.initializeApp(config);
}

else {
   firebase.app(); // if already initialized, use that one
}





const uiConfig = {
  // Popup signin flow rather than redirect flow.
  requireDisplayName: false,
  signInMethod:firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD,
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/report',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ]
};

class FireAuth extends React.Component {
  componentDidMount(){

  }

  render(){
    return (
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
      </div>
    );

  }
}

export default FireAuth
