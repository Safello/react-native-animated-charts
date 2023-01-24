import React from "react";
import { Text, View } from "react-native";

export const ChartYAxisLabel = ({
  containerStyle = {},
  labelStyle = {},
  formatter,
  data,
  numberOfLabels,
  chartExtraHeight,
  chartHeight,
}) => {
  let yAxisLabels = getAxisLabels(data, numberOfLabels, "y").reverse();
  if (formatter) {
    yAxisLabels = yAxisLabels.map((labelValue) => formatter(labelValue));
  }

  return (
    <View
      pointerEvents={"none"}
      style={{
        ...YAxisLabelContainerStyle,
        ...containerStyle,
        ...(chartExtraHeight && chartHeight
          ? {
              top: -chartExtraHeight,
              height: chartHeight + chartExtraHeight,
            }
          : {}),
      }}
    >
      {yAxisLabels.map((label, i) => (
        <Text
          key={`y-axis-label-${i}`}
          style={{ ...LabelTextStyle, ...labelStyle }}
        >
          {label}
        </Text>
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
  let xAxisLabels = getAxisLabels(data, numberOfLabels, "x");
  if (formatter) {
    xAxisLabels = xAxisLabels.map((labelValue) => formatter(labelValue));
  }

  return (
    <View
      pointerEvents={"none"}
      style={{
        ...XAxisLabelContainerStyle,
        ...containerStyle,
      }}
    >
      {xAxisLabels.map((label, i) => (
        <Text
          key={`y-axis-label-${i}`}
          style={{ ...LabelTextStyle, ...labelStyle }}
        >
          {label}
        </Text>
      ))}
    </View>
  );
};

const getAxisLabels = (data, numberOfEntries, key) => {
  if (!data || data.length === 0) return [];
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
