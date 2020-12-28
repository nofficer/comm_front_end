import React from 'react'
import { connect } from 'react-redux'
import { uploadFile,onChangeFile} from '../actions'
import UploadForm from './UploadForm'
import Loader from '../Loader'
import Login from './Accounts/Login'




class Import extends React.Component {
  componentDidMount(){

  }

  onSubmit = (formValues) => {

  }

  render(){
    if(this.props.account['role'] == 'admin'){
        if(this.props.loading == 'loading'){
          return (<Loader filler='Importing File...'/>)
        }
        else {
          return (
            <div className='ui text container containermargin' >
            <div className='ui grid'>
            <div class='sixteen wide column'></div>
            <div class='sixteen wide column'></div>
            <div class='sixteen wide column'></div>
            <div class='sixteen wide column'></div>
            <div class='sixteen wide column'></div>
            <div class='sixteen wide column'></div>
            <div class='sixteen wide column'></div>
            <div class='sixteen wide column'></div>
            </div>
              <UploadForm onSubmit={this.onSubmit}/>
            </div>
          )
        }

    }

    else if(typeof(this.props.account['user_id']) == "number"){
      return "You do not have sufficient permissions to access this page"
    }
    else{
      return <Login/>
    }

  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account.account,
    loading: state.file.loading
  }
}

export default connect(mapStateToProps, {uploadFile,onChangeFile})(Import)
