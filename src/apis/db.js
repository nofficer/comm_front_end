import axios from 'axios'
import React from 'react';
import { connect } from 'react-redux';


// function apiCreator(props) {
//   return (
//     axios.create({
//       baseURL: 'http://127.0.0.1:8080',
//       headers: {
//         ilac:'bk123',
//         token_auth: props.account.token
//       }
//     })
//
//   )
// }
//
//
// const mapStateToProps = (state) => {
//   return {
//     account: state.account.account,
//     month: state.month.month
//   }
// }


export default axios.create({
  baseURL: 'https://easycomp-305815.uc.r.appspot.com',
  headers: {
    ilac:'bk123'
  }
})

// 'http://127.0.0.1:8080'
//'https://bend-dzte5e25qq-uc.a.run.app'

//'https://easycomp-305815.uc.r.appspot.com'

// export default connect(mapStateToProps)(apiCreator)

export const firebaseConfigItem = {
    apiKey: "AIzaSyDRnUkMDz97EyIo02NWne-9Pm6YrjK0ALk",
    authDomain: "easycomp-305815.firebaseapp.com",
    projectId: "easycomp-305815",
    storageBucket: "easycomp-305815.appspot.com",
    messagingSenderId: "948165952668",
    appId: "1:948165952668:web:ad37654be3491b07045959",
    measurementId: "G-EGBYJ9MG95"
  };
