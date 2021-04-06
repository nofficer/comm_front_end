import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import reduxThunk from 'redux-thunk'
import './semantic/dist/semantic.css'

import App from './Components/App'
import reducers from './Reducers'

import firebase from "firebase/app";
import "firebase/auth";
import {firebaseConfigItem} from './apis/db'





const firebaseConfig = firebaseConfigItem

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
)

ReactDOM.render(
  <Provider store={store}>
  <App />
  </Provider>,
  document.querySelector('#root')
)

export default store
