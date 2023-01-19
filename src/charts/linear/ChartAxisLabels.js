import React from "react";
import { TextInput, View } from "react-native";

export const ChartYAxisLabel = ({
  containerStyle = {},
  labelStyle = {},
  formatter,
  data,
  numberOfLabels,
}) => {
  let yAxisLabels = getAxisLabels(data, numberOfLabels, "y").reverse();
  if (formatter) {
    yAxisLabels = yAxisLabels.map((labelValue) => formatter(labelValue));
  }

  return (
    <View style={{ ...YAxisLabelContainerStyle, ...containerStyle }}>
      {yAxisLabels.map((label, i) => (
        <TextInput
          key={`y-axis-label-${i}`}
          style={{ ...LabelTextStyle, ...labelStyle }}
        >
          {label}
        </TextInput>
      ))}
    </View>
  );
};

export const ChartXAxisLabel = ({
  containerStyle = {},
  labelStyle = {},
  formatter,
  data,
  numberOfLabels,
}) => {
  let xAxisLabels = getAxisLabels(data, numberOfLabels, "x").reverse();
  if (formatter) {
    xAxisLabels = xAxisLabels.map((labelValue) => formatter(labelValue));
  }

  return (
    <View style={{ ...XAxisLabelContainerStyle, ...containerStyle }}>
      {xAxisLabels.map((label, i) => (
        <TextInput
          key={`y-axis-label-${i}`}
          style={{ ...LabelTextStyle, ...labelStyle }}
        >
          {label}
        </TextInput>
      ))}
    </View>
  );
};

const getAxisLabels = (data, numberOfEntries, key) => {
  const { maxValue, minValue } = getMaxAndMinValues(data, key);
  const labels = [minValue];
  const diff = maxValue - minValue;
  const addAmount = diff / (numberOfEntries - 1);
  for (let i = 1; i < numberOfEntries; i++) {
    const nextValue = labels[i - 1] + addAmount;
    labels.push(nextValue);
  }
  return labels;
};

const getMaxAndMinValues = (data, key) => {
  let maxValue = data[0][key];
  let minValue = data[0][key];
  for (let i = 1; i < data.length; i++) {
    if (data[i][key] > maxValue) maxValue = data[i][key];
    if (data[i][key] < minValue) minValue = data[i][key];
  }
  return { maxValue, minValue };
};

const YAxisLabelContainerStyle = {
  position: "absolute",
  left: 0,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: 8,
};

const XAxisLabelContainerStyle = {
  position: "absolute",
  right: 0,
  bottom: 0,
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: -26,
  padding: 8,
};

const LabelTextStyle = {
  color: "#CCCCCC",
  fontSize: 12,
};
