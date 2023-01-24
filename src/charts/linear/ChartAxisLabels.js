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
  paddingApplier = 0,
}) => {
  let { minValue, maxValue } = getMaxAndMinValues(data, "y");
  if (chartHeight && chartExtraHeight) {
    maxValue += (maxValue * chartExtraHeight) / chartHeight;
  }
  // Apply paddingApplier to align label value with Y-value
  minValue = minValue + (maxValue - minValue) * paddingApplier;
  maxValue = maxValue - (maxValue - minValue) * paddingApplier;
  let yAxisLabels = getAxisLabels(minValue, maxValue, numberOfLabels).reverse();
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
  paddingApplier = 0.07,
}) => {
  let { minValue, maxValue } = getMaxAndMinValues(data, "x");
  // Apply paddingApplier to align label value with X-value
  minValue = minValue + (maxValue - minValue) * paddingApplier;
  maxValue = maxValue - (maxValue - minValue) * paddingApplier;

  let xAxisLabels = getAxisLabels(minValue, maxValue, numberOfLabels);
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

const getAxisLabels = (minValue, maxValue, numberOfEntries) => {
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
  justifyContent: "space-around",
};

const XAxisLabelContainerStyle = {
  position: "absolute",
  right: 0,
  bottom: 0,
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  marginBottom: -26,
};

const LabelTextStyle = {
  color: "#CCCCCC",
  fontSize: 12,
};
