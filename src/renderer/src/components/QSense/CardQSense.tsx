import Chart from 'react-apexcharts'

const CardQSense = () => {
  const options = {
    chart: {
      type: 'heatmap' as const // Adding 'as const' ensures TypeScript treats this as a literal type
    },
    plotOptions: {
      heatmap: {
        colorScale: {
          ranges: [
            { from: 1, to: 1, color: '#00E396', name: 'ok' },
            { from: 2, to: 2, color: '#00A0E3', name: 'no water' },
            { from: 3, to: 3, color: '#FF4560', name: 'down' },
            { from: 4, to: 4, color: '#775DD0', name: 'no beans' },
            { from: 5, to: 5, color: '#FEB019', name: 'off' }
          ]
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: [
        '12 AM',
        '1 AM',
        '2 AM',
        '3 AM',
        '4 AM',
        '5 AM',
        '6 AM',
        '7 AM',
        '8 AM',
        '9 AM',
        '10 AM',
        '11 AM',
        '12 PM',
        '1 PM',
        '2 PM',
        '3 PM',
        '4 PM',
        '5 PM',
        '6 PM',
        '7 PM',
        '8 PM',
        '9 PM',
        '10 PM',
        '11 PM'
      ]
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '12px'
        }
      }
    },
    title: {
      text: 'Machine Status on Jan 1, 2021'
    }
  }

  const series = [
    {
      name: 'Machine A',
      data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 5, 1, 1, 1, 1, 1, 1]
    },
    {
      name: 'Machine B',
      data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 5, 1, 1, 5, 5, 1, 1, 1, 1, 1, 1, 1, 5, 1]
    },
    {
      name: 'Machine C',
      data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 1, 1, 5, 5, 1, 1, 1, 1, 1, 1, 1, 5, 1]
    },
    {
      name: 'Machine D',
      data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 1, 1, 5, 5, 1, 1, 1, 1, 1, 1, 1, 5, 1]
    }
  ]

  return (
    <div>
      <Chart options={options} series={series} type="heatmap" height={350} />
    </div>
  )
}

export default CardQSense
