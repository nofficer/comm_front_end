import axios from 'axios'



export default axios.create({
  baseURL: 'https://easycomp-305815.uc.r.appspot.com',
  headers: {
    ilac:'bk123'
  }
})

// 'http://127.0.0.1:8080'
//'https://bend-dzte5e25qq-uc.a.run.app'

//'https://easycomp-305815.uc.r.appspot.com'
