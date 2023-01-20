import React, { useContext } from "react";
import { TextInput, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";

import ChartContext from "../../helpers/ChartContext";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

function ChartLabelFactory(style) {
  return function ChartLabel({
    format,
    placeholder = "",
    secondaryTextStyle = {},
    secondaryText = "",
    placeHolderSecondaryText = "",
    containerStyle = {},
    ...props
  }) {
    const { [style]: val = 0 } = useContext(ChartContext);
    const formattedValue = useDerivedValue(() => {
      const value = !!val.value
        ? format
          ? format(val.value)
          : val.value
        : placeholder;
      return value;
    }, []);
    const textProps = useAnimatedStyle(() => {
      return {
        text: formattedValue.value,
      };
    }, []);
    const secondaryFormattedValue = useDerivedValue(() => {
      const value = !!val.value ? secondaryText : placeHolderSecondaryText;
      return value;
    }, []);
    const secondaryTextProps = useAnimatedStyle(() => {
      return {
        text: secondaryFormattedValue.value,
      };
    }, []);
    return (
      <View style={containerStyle}>
        <AnimatedTextInput
          {...props}
          animatedProps={textProps}
          defaultValue={placeholder}
          editable={false}
        />
        {!!secondaryText && (
          <AnimatedTextInput
            style={secondaryTextStyle}
            animatedProps={secondaryTextProps}
            defaultValue={placeHolderSecondaryText}
            editable={false}
          />
        )}
      </View>
    );
  };
}

export const ChartYLabel = ChartLabelFactory("originalY");
export const ChartXLabel = ChartLabelFactory("originalX");
