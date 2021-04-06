import React from 'react'

import {Bar,Chart} from 'react-chartjs-2';


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
            hover: {
              mode: 'new mode'
            },
            title:{
              display:true,
              text:this.props.title,
              fontSize:20,
              fontColor: '#000000', // Default is #000000
              fontStyle: 'bold',
              fontFamily: 'Arial',
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
