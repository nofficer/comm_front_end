import React from 'react'
import { connect } from 'react-redux'
import {Line,Chart} from 'react-chartjs-2';


Chart.scaleService.updateScaleDefaults('linear', {
    ticks: {
        min: 0
    }
});


class LineChart extends React.Component {

componentDidMount() {

}

  render() {
    var feed = this.props.feed
    return (
      <div>


        <Line
          data={{
    labels: this.props.labels,
    datasets: [
      {
        label: 'Gross Profit',
        fill:true,


        borderColor:'#00FF00',
        backgroundColor: 'rgb(0, 255, 0,0.1)',



        data: this.props.profits
      },
      {
        label: 'Payout',
        fill:true,
        backgroundColor: 'rgb(255, 0, 0,0.1)',



        borderColor:'#FF0000',
        data: this.props.payouts
      }
    ]
  }}
  height={'150vh'}

          options={{
            title:{
              display:true,
              text:this.props.title[0],
              fontSize:20,
              fontColor: '#000000', // Default is #000000
              fontStyle: 'bold',
              fontFamily: 'Roboto',
              position:'top'
            },
            legend:{
              display:true,
              position:'bottom'
            },
            elements: {

  },
  scales: {
           y: {
               ticks: {

                   // Include a dollar sign in the ticks
                   callback: function(value, index, values) {
                       return '$' + value;
                   }
                   }


               }
           }



          }}
        />



      </div>
    );
  }
}

export default LineChart
