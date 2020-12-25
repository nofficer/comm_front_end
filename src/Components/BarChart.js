import React from 'react'
import { connect } from 'react-redux'
import {Bar,Pie,Doughnut} from 'react-chartjs-2';





class BarChart extends React.Component {

componentDidMount() {

}

  render() {
    var feed = this.props.feed
    return (
      <div>


        <Doughnut
          data={feed}
          options={{
            title:{
              display:true,
              text:this.props.title,
              fontSize:20
            },
            legend:{
              display:false,
              position:'right'
            }
          }}
        />
      </div>
    );
  }
}

export default BarChart
