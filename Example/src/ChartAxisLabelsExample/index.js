import React, {useState} from 'react';
import {Dimensions, View, TouchableOpacity, Text} from 'react-native';
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartXAxisLabel,
  ChartYAxisLabel,
  monotoneCubicInterpolation,
} from '@rainbow-me/animated-charts';

export const {width: SIZE} = Dimensions.get('window');

export const data = [
  {x: 1453075200, y: 1.47},
  {x: 1453161600, y: 1.37},
  {x: 1453248000, y: 1.53},
  {x: 1453334400, y: 1.54},
  {x: 1453420800, y: 1.52},
  {x: 1453507200, y: 2.03},
  {x: 1453593600, y: 2.1},
  {x: 1453680000, y: 2.5},
  {x: 1453766400, y: 2.3},
  {x: 1453852800, y: 2.42},
  {x: 1453939200, y: 2.55},
  {x: 1454025600, y: 2.41},
  {x: 1454112000, y: 2.43},
  {x: 1454198400, y: 2.2},
];

export const data2 = [
  {x: 1453075200, y: 2.47},
  {x: 1453261600, y: 0.37},
  {x: 1453348000, y: 1.53},
  {x: 1454334400, y: 1.04},
  {x: 1454420800, y: 1.12},
  {x: 1454507200, y: 3.03},
  {x: 1454593600, y: 2.1},
  {x: 1454780000, y: 2.5},
  {x: 1458866400, y: 2.3},
  {x: 1458892800, y: 2.92},
  {x: 1458999200, y: 2.05},
  {x: 1459995600, y: 3.41},
  {x: 1569992000, y: 4.43},
  {x: 1674131553, y: 3.2},
];

const points = monotoneCubicInterpolation({data, range: 40});
const points2 = monotoneCubicInterpolation({data: data2, range: 40});

/*
Example of how to use and customize the ChartAxisLabels
*/
const ChartAxisLabelsExample = () => {
  const [useSecondaryData, setUseSecondaryData] = useState(false);

  const selectedData = useSecondaryData ? points2 : points;

  return (
    <View
      style={{
        backgroundColor: 'black',
      }}>
      <ChartPathProvider
        data={{
          points: selectedData,
          smoothingStrategy: 'bezier',
        }}>
        <ChartPath height={SIZE / 2} stroke="yellow" width={SIZE} />
        <ChartDot
          style={{
            backgroundColor: 'blue',
          }}
        />
        <ChartYAxisLabel
          data={selectedData}
          numberOfLabels={5}
          formatter={percentageFormatter}
          labelStyle={{color: 'red'}}
        />
        <ChartXAxisLabel
          data={selectedData}
          numberOfLabels={5}
          formatter={formatDate}
          labelStyle={{color: 'red'}}
        />
      </ChartPathProvider>
      <TouchableOpacity
        style={{backgroundColor: 'red', position: 'absolute', bottom: -100}}
        onPress={() => setUseSecondaryData(!useSecondaryData)}>
        <Text>Press me to switch selected data</Text>
      </TouchableOpacity>
    </View>
  );
};

const percentageFormatter = value => {
  return value + ' %';
};
export const formatDate = value => {
  'worklet';
  if (value === '') {
    return '';
  }

  const months = [
    'jan',
    'feb',
    'mar',
    'apr',
    'maj',
    'jun',
    'jul',
    'aug',
    'sep',
    'okt',
    'nov',
    'dec',
  ];

  const date = new Date(Number(value));
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const y = date.getFullYear();
  const n = date.getMonth();
  const d = date.getDate();
  const h = date.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2});
  const m = date
    .getMinutes()
    .toLocaleString('en-US', {minimumIntegerDigits: 2});

  if (y === currentYear && n === currentMonth) {
    return `${months[n]} ${d} ${h.length < 2 ? `0${h}` : h}:${
      m.length < 2 ? `0${m}` : m
    }`;
  }

  return `${d} ${months[n]}`;
};
export default ChartAxisLabelsExample;
