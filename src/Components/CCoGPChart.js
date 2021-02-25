import React from 'react'

import {Line,Chart} from 'react-chartjs-2';


Chart.scaleService.updateScaleDefaults('linear', {
    ticks: {
        min: 0
    }
});


class CCoGPChart extends React.Component {

componentDidMount() {

}

  render() {

    return (
      <div  >


        <Line
          data={{
        labels: this.props.labels,
        datasets: [
        {
        label: this.props.label,
        fill:true,
        backgroundColor: this.props.colors[0],



        borderColor:this.props.colors[0],
        data: this.props.ccogp
        }
        ]
        }}

          options={{
            title:{
              display:true,
              text:this.props.title,
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
                       return '%' + value;
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

export default CCoGPChart
