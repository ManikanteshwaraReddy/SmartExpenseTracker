import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const Chart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        data: [200, 450, -100, -50, -300],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Purple line
      },
    ],
  };

  return (
    <LineChart
      data={data}
      width={Dimensions.get('window').width - 40}
      height={220}
      chartConfig={{
        backgroundColor: '#ffffff',
        backgroundGradientFrom: '#f5f5f5',
        backgroundGradientTo: '#ffffff',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black text
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black labels
        style: {
          borderRadius: 16,
        },
      }}
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
    />
  );
};

export default Chart;
