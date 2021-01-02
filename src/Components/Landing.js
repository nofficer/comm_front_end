import React from 'react'
import { connect } from 'react-redux'
import { uploadFile,onChangeFile,getPayouts_cy } from '../actions'
import UploadForm from './UploadForm'
import Example from './myhook'
import { Header } from 'semantic-ui-react'
import DoughnutChart from './DoughnutChart'
import history from '../history'

function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
  } catch (e) {
    console.log(e)
  }
};


class Landing extends React.Component {
  componentDidMount(){




  }

  onSubmit = (formValues) => {

  }

  renderPayout(){

    return(<div className='ui huge header'>Total Payout YTD: ${formatMoney(this.props.payout)}</div>)
  }




  render(){
      return (<div className='ui grid'>
      <div className='sixteen wide column'></div>
      <div className='sixteen wide column'></div>
      <div className='sixteen wide column'></div>
      <div className='sixteen wide column'></div>

      <div className='sixteen wide column'>
      <div className='ui center aligned grid'>
        <div  className='ui header bigfont'>EasyComp</div>
        </div></div>

        <div className='sixteen wide column'></div>
        <div className='sixteen wide column'></div>
        <div className='sixteen wide column'></div>
        <div className='sixteen wide column'></div>

        <div className='sixteen wide column'>
          <div className='ui center aligned grid'>
            <div className='sixteen wide column'>
              <i onClick={(e) => e.stopPropagation(history.push({pathname:'/report',state:{detail:this.props.month}}))} class="calculator icon bigicon"></i>
            </div>
            <div className='sixteen wide column'>

            </div>
            <div className='sixteen wide column'>

            </div>
            <div className='sixteen wide column'></div>

            <div className='sixteen wide column'>

            </div>
            <div className='four wide column'>

            </div>


          </div>

          </div>

        </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    month:state.month.month,
    payout: Object.values(state.payouts.payouts)
  }
}

export default connect(mapStateToProps, {uploadFile,onChangeFile,getPayouts_cy})(Landing)
