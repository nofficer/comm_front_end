import React from 'react'
import { connect } from 'react-redux'
import {Bar,Pie,Doughnut,Chart,HorizontalBar} from 'react-chartjs-2';


Chart.scaleService.updateScaleDefaults('linear', {
    ticks: {
        min: 0
    }
});


class BarChart extends React.Component {

componentDidMount() {

}

  render() {
    var feed = this.props.feed
    return (
      <div>


        <Bar
          data={feed}
          height={350}
          options={{
            title:{
              display:true,
              text:this.props.title,
              fontSize:20,
              fontColor: '#000000', // Default is #000000
              fontStyle: 'bold',
              fontFamily: 'Roboto',
              position:'bottom'
            },
            legend:{
              display:false,
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

export default BarChart
