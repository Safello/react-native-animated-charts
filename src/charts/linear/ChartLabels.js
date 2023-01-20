import React, { useContext } from "react";
import { TextInput } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";

import ChartContext from "../../helpers/ChartContext";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

function ChartLabelFactory(style) {
  return function ChartLabel({ format, placeholder = "", ...props }) {
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
    return (
      <AnimatedTextInput
        {...props}
        animatedProps={textProps}
        defaultValue={placeholder}
        editable={false}
      />
    );
  };
}

export const ChartYLabel = ChartLabelFactory("originalY");
export const ChartXLabel = ChartLabelFactory("originalX");
